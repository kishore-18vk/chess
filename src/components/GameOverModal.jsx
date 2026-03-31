/**
 * GameOverModal — Shown when the game ends (checkmate, stalemate, draw)
 */
import React from 'react';
import useChessStore from '../store/chessStore';
import { COLOR } from '../engine/chessEngine';

function GameOverModal() {
    const gameState = useChessStore(s => s.gameState);
    const newGame = useChessStore(s => s.newGame);
    const { gameStatus, winner, drawReason, history } = gameState;

    const getTitle = () => {
        if (gameStatus === 'checkmate') return '♚ Checkmate!';
        if (gameStatus === 'stalemate') return '🤝 Stalemate!';
        if (gameStatus === 'draw') return '🤝 Draw!';
        return 'Game Over';
    };

    const getMessage = () => {
        if (gameStatus === 'checkmate') {
            return `${winner === COLOR.WHITE ? '⬜ White' : '⬛ Black'} wins by checkmate!`;
        }
        if (gameStatus === 'stalemate') return 'No legal moves — the game is a draw.';
        if (gameStatus === 'draw') return `Draw by ${drawReason}.`;
        return '';
    };

    const getEmoji = () => {
        if (gameStatus === 'checkmate') return winner === COLOR.WHITE ? '👑' : '🏆';
        return '🎯';
    };

    return (
        <div className="modal-overlay">
            <div className="gameover-modal" role="dialog" aria-label="Game over">
                <div className="gameover-emoji">{getEmoji()}</div>
                <h2 className="gameover-title">{getTitle()}</h2>
                <p className="gameover-message">{getMessage()}</p>
                <p className="gameover-moves">
                    Total moves: <strong>{history.length}</strong>
                </p>

                <div className="gameover-actions">
                    <button className="btn-primary" onClick={newGame}>
                        ↺ Play Again
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameOverModal;
