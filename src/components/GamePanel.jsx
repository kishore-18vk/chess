/**
 * GamePanel — Right sidebar with:
 * - Player info + captured pieces
 * - Status display
 * - Move history (PGN)
 * - Controls (undo, redo, reset)
 * - AI difficulty selector
 * - Timer
 */
import React, { useEffect, useRef } from 'react';
import useChessStore from '../store/chessStore';
import { COLOR } from '../engine/chessEngine';
import PieceSVG from './PieceSVG';
import Timer from './Timer';
import CapturedPieces from './CapturedPieces';

const STATUS_MESSAGES = {
    playing: (turn) => `${turn === COLOR.WHITE ? '⬜ White' : '⬛ Black'}'s turn`,
    check: (turn) => `⚠️ ${turn === COLOR.WHITE ? '⬜ White' : '⬛ Black'} is in Check!`,
    checkmate: (_, winner) => `♟ Checkmate! ${winner === COLOR.WHITE ? '⬜ White' : '⬛ Black'} wins!`,
    stalemate: () => `🤝 Stalemate — Draw!`,
    draw: (_, __, reason) => `🤝 Draw — ${reason}`,
};

function GamePanel() {
    const gameState = useChessStore(s => s.gameState);
    const undoMove = useChessStore(s => s.undoMove);
    const newGame = useChessStore(s => s.newGame);
    const setAIDifficulty = useChessStore(s => s.setAIDifficulty);
    const aiDifficulty = useChessStore(s => s.aiDifficulty);
    const isAIEnabled = useChessStore(s => s.isAIEnabled);
    const isAIThinking = useChessStore(s => s.isAIThinking);
    const gameMode = useChessStore(s => s.gameMode);
    const timerEnabled = useChessStore(s => s.timerEnabled);
    const toggleTimer = useChessStore(s => s.toggleTimer);
    const startTimer = useChessStore(s => s.startTimer);
    const stopTimer = useChessStore(s => s.stopTimer);

    const { currentTurn, gameStatus, winner, drawReason, history, capturedPieces } = gameState;

    const historyRef = useRef(null);
    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history.length]);

    const statusMsg = STATUS_MESSAGES[gameStatus]?.(currentTurn, winner, drawReason) || '';

    // Group history into pairs (White + Black)
    const movePairs = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            num: Math.floor(i / 2) + 1,
            white: history[i]?.notation || '',
            black: history[i + 1]?.notation || '',
        });
    }

    const difficultyLabels = { 1: 'Easy', 2: 'Medium', 3: 'Hard', 4: 'Expert' };

    return (
        <div className="game-panel">
            {/* Status Banner */}
            <div className={`status-banner ${gameStatus}`}>
                <span>{statusMsg}</span>
                {isAIThinking && <span className="thinking-indicator">🤔 AI thinking...</span>}
            </div>

            {/* Timer */}
            <Timer />

            {/* Black player (top) */}
            <div className="player-card player-black">
                <div className="player-header">
                    <span className="player-icon">♚</span>
                    <span className="player-name">
                        {isAIEnabled ? (gameMode === 'ai' ? '🤖 AI' : '⬛ Black') : '⬛ Black'}
                    </span>
                    {currentTurn === COLOR.BLACK && gameStatus === 'playing' && (
                        <span className="active-dot" />
                    )}
                </div>
                <CapturedPieces pieces={capturedPieces.b} capturedBy={COLOR.WHITE} />
            </div>

            {/* Move History */}
            <div className="move-history-container">
                <h3 className="section-title">📜 Move History</h3>
                <div className="move-history" ref={historyRef}>
                    {movePairs.length === 0 ? (
                        <p className="no-moves">No moves yet. Start playing!</p>
                    ) : (
                        <table className="moves-table">
                            <tbody>
                                {movePairs.map((pair) => (
                                    <tr key={pair.num} className="move-row">
                                        <td className="move-num">{pair.num}.</td>
                                        <td className="move-notation white-notation">{pair.white}</td>
                                        <td className="move-notation black-notation">{pair.black}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* White player (bottom) */}
            <div className="player-card player-white">
                <div className="player-header">
                    <span className="player-icon">♔</span>
                    <span className="player-name">⬜ You (White)</span>
                    {currentTurn === COLOR.WHITE && gameStatus === 'playing' && (
                        <span className="active-dot" />
                    )}
                </div>
                <CapturedPieces pieces={capturedPieces.w} capturedBy={COLOR.BLACK} />
            </div>

            {/* Controls */}
            <div className="controls">
                <button
                    className="control-btn"
                    onClick={undoMove}
                    disabled={history.length === 0 || isAIThinking}
                    title="Undo last move"
                >
                    ← Undo
                </button>
                <button
                    className="control-btn primary"
                    onClick={newGame}
                    title="Start new game"
                >
                    ↺ New Game
                </button>
            </div>

            {/* AI Settings */}
            {isAIEnabled && (
                <div className="ai-settings">
                    <h3 className="section-title">🤖 AI Difficulty</h3>
                    <div className="difficulty-buttons">
                        {[1, 2, 3, 4].map(d => (
                            <button
                                key={d}
                                className={`diff-btn ${aiDifficulty === d ? 'diff-btn-active' : ''}`}
                                onClick={() => setAIDifficulty(d)}
                            >
                                {difficultyLabels[d]}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Game Info */}
            <div className="game-info">
                <h3 className="section-title">♟ Game Info</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Move</span>
                        <span className="info-value">{gameState.fullMoveNumber}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Half-move clock</span>
                        <span className="info-value">{gameState.halfMoveClock}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Mode</span>
                        <span className="info-value">{gameMode === 'ai' ? 'vs AI' : '2 Players'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamePanel;
