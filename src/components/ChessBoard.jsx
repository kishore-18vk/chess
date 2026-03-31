/**
 * ChessBoard Component
 * Renders the 8x8 board, pieces, highlights, and handles user interaction
 * Supports both click-to-move and drag-and-drop
 */
import React, { useCallback, useState } from 'react';
import useChessStore from '../store/chessStore';
import ChessSquare from './ChessSquare';
import { COLOR } from '../engine/chessEngine';

function ChessBoard() {
    const gameState = useChessStore(s => s.gameState);
    const selectedSquare = useChessStore(s => s.selectedSquare);
    const legalMoveTargets = useChessStore(s => s.legalMoveTargets);
    const lastMove = useChessStore(s => s.lastMove);
    const selectSquare = useChessStore(s => s.selectSquare);
    const executeMove = useChessStore(s => s.executeMove);
    const isAIThinking = useChessStore(s => s.isAIThinking);

    const [dragFrom, setDragFrom] = useState(null);
    const [dragOverSquare, setDragOverSquare] = useState(null);

    const { board, currentTurn, gameStatus } = gameState;

    // Find king in check
    const findKingInCheck = () => {
        if (gameStatus !== 'check' && gameStatus !== 'checkmate') return null;
        const kingPiece = currentTurn + 'K';
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (board[r][c] === kingPiece) return { row: r, col: c };
            }
        }
        return null;
    };
    const kingInCheck = findKingInCheck();

    const handleSquareClick = useCallback((row, col) => {
        selectSquare(row, col);
    }, [selectSquare]);

    const handleDragStart = useCallback((row, col) => {
        setDragFrom({ row, col });
        selectSquare(row, col);
    }, [selectSquare]);

    const handleDragOver = useCallback((row, col, e) => {
        e.preventDefault();
        setDragOverSquare({ row, col });
    }, []);

    const handleDrop = useCallback((row, col) => {
        if (dragFrom) {
            const isLegal = legalMoveTargets.some(t => t.row === row && t.col === col);
            if (isLegal) {
                executeMove(dragFrom, { row, col });
            } else {
                // Try clicking the destination square to handle deselect / reselect
                selectSquare(row, col);
            }
        }
        setDragFrom(null);
        setDragOverSquare(null);
    }, [dragFrom, legalMoveTargets, executeMove, selectSquare]);

    const handleDragEnd = useCallback(() => {
        setDragFrom(null);
        setDragOverSquare(null);
    }, []);

    // Render coordinates
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    return (
        <div className="board-container">
            {isAIThinking && (
                <div className="ai-thinking-badge">
                    <span className="thinking-dot"></span>
                    AI Thinking...
                </div>
            )}
            <div className="board-frame">
                {/* Rank labels left */}
                <div className="rank-labels">
                    {ranks.map(r => <span key={r} className="coord-label">{r}</span>)}
                </div>

                <div className="board-grid">
                    {board.map((row, rowIdx) =>
                        row.map((piece, colIdx) => {
                            const isSelected = selectedSquare?.row === rowIdx && selectedSquare?.col === colIdx;
                            const isLegalTarget = legalMoveTargets.some(t => t.row === rowIdx && t.col === colIdx);
                            const isLastMoveFrom = lastMove?.from?.row === rowIdx && lastMove?.from?.col === colIdx;
                            const isLastMoveTo = lastMove?.to?.row === rowIdx && lastMove?.to?.col === colIdx;
                            const isKingInCheck = kingInCheck?.row === rowIdx && kingInCheck?.col === colIdx;
                            const isDragTarget = dragOverSquare?.row === rowIdx && dragOverSquare?.col === colIdx;
                            const hasPieceOnTarget = isLegalTarget && !!piece;

                            return (
                                <ChessSquare
                                    key={`${rowIdx}-${colIdx}`}
                                    row={rowIdx}
                                    col={colIdx}
                                    piece={piece}
                                    isLight={(rowIdx + colIdx) % 2 === 0}
                                    isSelected={isSelected}
                                    isLegalTarget={isLegalTarget}
                                    isLastMoveFrom={isLastMoveFrom}
                                    isLastMoveTo={isLastMoveTo}
                                    isKingInCheck={isKingInCheck}
                                    isDragTarget={isDragTarget}
                                    hasPieceOnTarget={hasPieceOnTarget}
                                    onClick={() => handleSquareClick(rowIdx, colIdx)}
                                    onDragStart={() => handleDragStart(rowIdx, colIdx)}
                                    onDragOver={(e) => handleDragOver(rowIdx, colIdx, e)}
                                    onDrop={() => handleDrop(rowIdx, colIdx)}
                                    onDragEnd={handleDragEnd}
                                    currentTurn={currentTurn}
                                />
                            );
                        })
                    )}
                </div>

                {/* Rank labels right */}
                <div className="rank-labels">
                    {ranks.map(r => <span key={r} className="coord-label">{r}</span>)}
                </div>
            </div>

            {/* File labels */}
            <div className="file-labels-row">
                <div className="file-labels-spacer" />
                <div className="file-labels">
                    {files.map(f => <span key={f} className="coord-label">{f}</span>)}
                </div>
                <div className="file-labels-spacer" />
            </div>
        </div>
    );
}

export default ChessBoard;
