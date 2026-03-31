/**
 * ChessSquare — Individual square on the board
 * Renders piece SVG, highlights, and drag-and-drop handling
 */
import React from 'react';
import PieceSVG from './PieceSVG';
import { pieceColor } from '../engine/chessEngine';
import { COLOR } from '../engine/chessEngine';

function ChessSquare({
    row, col, piece, isLight, isSelected, isLegalTarget, isLastMoveFrom,
    isLastMoveTo, isKingInCheck, isDragTarget, hasPieceOnTarget,
    onClick, onDragStart, onDragOver, onDrop, onDragEnd, currentTurn
}) {
    const canDrag = piece && pieceColor(piece) === currentTurn;

    const classNames = [
        'square',
        isLight ? 'square-light' : 'square-dark',
        isSelected ? 'square-selected' : '',
        isLastMoveFrom || isLastMoveTo ? 'square-last-move' : '',
        isKingInCheck ? 'square-check' : '',
        isDragTarget && isLegalTarget ? 'square-drag-target' : '',
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classNames}
            onClick={onClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {/* Legal move indicator */}
            {isLegalTarget && !hasPieceOnTarget && (
                <div className="legal-dot" />
            )}
            {isLegalTarget && hasPieceOnTarget && (
                <div className="legal-capture-ring" />
            )}

            {/* Piece */}
            {piece && (
                <div
                    className={`piece-wrapper ${canDrag ? 'draggable' : ''} ${isSelected ? 'piece-selected' : ''}`}
                    draggable={canDrag}
                    onDragStart={canDrag ? onDragStart : undefined}
                    onDragEnd={onDragEnd}
                >
                    <PieceSVG piece={piece} />
                </div>
            )}
        </div>
    );
}

export default React.memo(ChessSquare);
