/**
 * PromotionDialog — Modal shown when a pawn reaches the back rank
 * Allows user to choose promotion piece: Queen, Rook, Bishop, or Knight
 */
import React from 'react';
import useChessStore from '../store/chessStore';
import { COLOR } from '../engine/chessEngine';
import PieceSVG from './PieceSVG';

const PROMOTION_PIECES = ['Q', 'R', 'B', 'N'];
const LABELS = { Q: 'Queen', R: 'Rook', B: 'Bishop', N: 'Knight' };

function PromotionDialog() {
    const promotionDialog = useChessStore(s => s.promotionDialog);
    const handlePromotion = useChessStore(s => s.handlePromotion);
    const gameState = useChessStore(s => s.gameState);

    if (!promotionDialog) return null;

    const color = gameState.currentTurn; // The color of the pawn being promoted

    return (
        <div className="modal-overlay">
            <div className="promotion-modal" role="dialog" aria-label="Choose promotion piece">
                <h2 className="modal-title">♟ Pawn Promotion</h2>
                <p className="modal-subtitle">Choose your piece</p>
                <div className="promotion-choices">
                    {PROMOTION_PIECES.map(piece => {
                        const pieceName = color + piece;
                        return (
                            <button
                                key={piece}
                                className="promotion-option"
                                onClick={() => handlePromotion(piece)}
                                title={LABELS[piece]}
                            >
                                <div className="promo-piece-svg">
                                    <PieceSVG piece={pieceName} />
                                </div>
                                <span className="promo-label">{LABELS[piece]}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PromotionDialog;
