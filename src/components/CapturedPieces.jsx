/**
 * CapturedPieces — Shows pieces captured by a player
 */
import React from 'react';
import PieceSVG from './PieceSVG';
import { pieceColor } from '../engine/chessEngine';

// Piece values for material advantage
const PIECE_VALUES = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 0 };

function CapturedPieces({ pieces, capturedBy }) {
    if (!pieces || pieces.length === 0) return (
        <div className="captured-pieces empty">No captures yet</div>
    );

    const sorted = [...pieces].sort((a, b) => {
        const order = { Q: 0, R: 1, B: 2, N: 3, P: 4 };
        return (order[a[1]] || 5) - (order[b[1]] || 5);
    });

    const materialValue = pieces.reduce((sum, p) => sum + (PIECE_VALUES[p[1]] || 0), 0);

    return (
        <div className="captured-pieces">
            <div className="captured-list">
                {sorted.map((piece, i) => (
                    <span key={i} className="captured-piece-icon">
                        <PieceSVG piece={piece} />
                    </span>
                ))}
            </div>
            {materialValue > 0 && (
                <span className="material-advantage">+{materialValue}</span>
            )}
        </div>
    );
}

export default CapturedPieces;
