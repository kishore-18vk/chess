/**
 * Header Component - Logo + navigation/settings
 */
import React from 'react';
import useChessStore from '../store/chessStore';
import { COLOR } from '../engine/chessEngine';

function Header() {
    const setGameMode = useChessStore(s => s.setGameMode);
    const gameMode = useChessStore(s => s.gameMode);
    const newGame = useChessStore(s => s.newGame);

    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo">
                    <span className="logo-icon">♚</span>
                    <span className="logo-text">Chess<span className="logo-accent">Master</span></span>
                </div>

                <nav className="header-nav">
                    <button
                        className={`nav-btn ${gameMode === 'local' ? 'nav-btn-active' : ''}`}
                        onClick={() => setGameMode('local')}
                    >
                        👥 Two Players
                    </button>
                    <button
                        className={`nav-btn ${gameMode === 'ai' ? 'nav-btn-active' : ''}`}
                        onClick={() => setGameMode('ai')}
                    >
                        🤖 vs AI
                    </button>
                    <button className="nav-btn new-game-btn" onClick={newGame}>
                        ↺ New Game
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
