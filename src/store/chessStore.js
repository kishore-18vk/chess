/**
 * Zustand store for Chess Game State
 * Manages all game state, moves, AI, and UI state
 */
import { create } from 'zustand';
import {
    createInitialState, makeMove, undoMove, getLegalMoves,
    COLOR, getBestMove, pieceColor
} from '../engine/chessEngine';

const useChessStore = create((set, get) => ({
    // Game state
    gameState: createInitialState(),
    redoStack: [],

    // UI state
    selectedSquare: null,
    legalMoveTargets: [],
    lastMove: null,
    promotionDialog: null,    // { from, to } when awaiting promotion choice

    // Game settings
    isAIEnabled: false,
    aiColor: COLOR.BLACK,
    aiDifficulty: 3,          // depth: 1=easy, 2=medium, 3=hard
    isAIThinking: false,

    // Mode: 'local' (two players) or 'ai' (vs computer)
    gameMode: 'local',

    // Timer state
    timerEnabled: false,
    timeControl: 600,         // seconds per player (10 min default)
    whiteTime: 600,
    blackTime: 600,
    timerInterval: null,

    // Actions
    selectSquare: (row, col) => {
        const { gameState, selectedSquare, legalMoveTargets, promotionDialog } = get();
        if (promotionDialog) return;

        const { board, currentTurn, gameStatus } = gameState;

        // Game over — no more moves
        if (['checkmate', 'stalemate', 'draw'].includes(gameStatus)) return;

        // AI is thinking
        if (get().isAIThinking) return;

        // If AI mode and not player's turn
        const { isAIEnabled, aiColor } = get();
        if (isAIEnabled && currentTurn === aiColor) return;

        const clickedPiece = board[row][col];
        const clickedColor = pieceColor(clickedPiece);

        // If a square is already selected
        if (selectedSquare) {
            const isLegalTarget = legalMoveTargets.some(t => t.row === row && t.col === col);

            if (isLegalTarget) {
                // Make the move
                get().executeMove(selectedSquare, { row, col });
                return;
            }

            // Clicking own piece — reselect
            if (clickedPiece && clickedColor === currentTurn) {
                const moves = getLegalMoves(board, row, col, gameState.enPassantTarget, gameState.castlingRights, currentTurn);
                set({
                    selectedSquare: { row, col },
                    legalMoveTargets: moves.map(m => m.to),
                });
                return;
            }

            // Deselect
            set({ selectedSquare: null, legalMoveTargets: [] });
            return;
        }

        // No piece selected yet — select own piece
        if (clickedPiece && clickedColor === currentTurn) {
            const moves = getLegalMoves(board, row, col, gameState.enPassantTarget, gameState.castlingRights, currentTurn);
            set({
                selectedSquare: { row, col },
                legalMoveTargets: moves.map(m => m.to),
            });
        }
    },

    executeMove: (from, to, promotionPiece = null) => {
        const { gameState, redoStack } = get();
        const { board, currentTurn } = gameState;

        // Check if promotion is needed
        const piece = board[from.row][from.col];
        const isPawnPromotion = piece && piece[1] === 'P' &&
            ((currentTurn === COLOR.WHITE && to.row === 0) || (currentTurn === COLOR.BLACK && to.row === 7));

        if (isPawnPromotion && !promotionPiece) {
            set({
                promotionDialog: { from, to },
                selectedSquare: null,
                legalMoveTargets: [],
            });
            return;
        }

        const newState = makeMove(gameState, from, to, promotionPiece);
        if (!newState) return;

        set({
            gameState: newState,
            redoStack: [], // clear redo on new move
            selectedSquare: null,
            legalMoveTargets: [],
            lastMove: { from, to },
            promotionDialog: null,
        });

        // Trigger AI move if needed
        if (get().isAIEnabled && newState.currentTurn === get().aiColor &&
            !['checkmate', 'stalemate', 'draw'].includes(newState.gameStatus)) {
            get().triggerAIMove(newState);
        }
    },

    handlePromotion: (piece) => {
        const { promotionDialog } = get();
        if (!promotionDialog) return;
        get().executeMove(promotionDialog.from, promotionDialog.to, piece);
        set({ promotionDialog: null });
    },

    triggerAIMove: (state) => {
        const { aiColor, aiDifficulty } = get();
        set({ isAIThinking: true });

        // Use setTimeout to not block the UI thread
        setTimeout(() => {
            const currentState = state || get().gameState;
            const bestMove = getBestMove(
                currentState.board,
                aiColor,
                currentState.enPassantTarget,
                currentState.castlingRights,
                aiDifficulty
            );

            if (bestMove) {
                get().executeMove(bestMove.from, bestMove.to, 'Q'); // AI auto-promotes to Queen
            }
            set({ isAIThinking: false });
        }, 100); // small delay for UI to render thinking indicator
    },

    undoMove: () => {
        const { gameState, isAIEnabled, aiColor } = get();
        if (gameState.history.length === 0) return;

        let newState = undoMove(gameState);

        // If AI mode, undo one more (AI's move)
        if (isAIEnabled && newState.history.length > 0 && newState.currentTurn === aiColor) {
            newState = undoMove(newState);
        }

        set({
            gameState: newState,
            selectedSquare: null,
            legalMoveTargets: [],
            lastMove: newState.history.length > 0
                ? { from: newState.history[newState.history.length - 1].from, to: newState.history[newState.history.length - 1].to }
                : null,
            promotionDialog: null,
            redoStack: [], // Clear redo on undo for simplicity
        });
    },

    newGame: () => {
        const { timerInterval, timeControl } = get();
        if (timerInterval) clearInterval(timerInterval);
        set({
            gameState: createInitialState(),
            selectedSquare: null,
            legalMoveTargets: [],
            lastMove: null,
            promotionDialog: null,
            redoStack: [],
            isAIThinking: false,
            whiteTime: timeControl,
            blackTime: timeControl,
            timerInterval: null,
        });
    },

    setGameMode: (mode) => {
        set({
            gameMode: mode,
            isAIEnabled: mode === 'ai',
            aiColor: COLOR.BLACK,
        });
        get().newGame();
    },

    setAIDifficulty: (depth) => {
        set({ aiDifficulty: depth });
    },

    toggleTimer: (enabled, seconds) => {
        set({ timerEnabled: enabled, timeControl: seconds, whiteTime: seconds, blackTime: seconds });
    },

    startTimer: () => {
        const { timerInterval, timerEnabled } = get();
        if (!timerEnabled || timerInterval) return;
        const interval = setInterval(() => {
            const { gameState, whiteTime, blackTime } = get();
            const { currentTurn, gameStatus } = gameState;
            if (['checkmate', 'stalemate', 'draw'].includes(gameStatus)) {
                clearInterval(interval);
                set({ timerInterval: null });
                return;
            }
            if (currentTurn === COLOR.WHITE) {
                if (whiteTime <= 0) {
                    clearInterval(interval);
                    set({ timerInterval: null, gameState: { ...gameState, gameStatus: 'checkmate', winner: COLOR.BLACK } });
                } else {
                    set({ whiteTime: whiteTime - 1 });
                }
            } else {
                if (blackTime <= 0) {
                    clearInterval(interval);
                    set({ timerInterval: null, gameState: { ...gameState, gameStatus: 'checkmate', winner: COLOR.WHITE } });
                } else {
                    set({ blackTime: blackTime - 1 });
                }
            }
        }, 1000);
        set({ timerInterval: interval });
    },

    stopTimer: () => {
        const { timerInterval } = get();
        if (timerInterval) {
            clearInterval(timerInterval);
            set({ timerInterval: null });
        }
    },
}));

export default useChessStore;
