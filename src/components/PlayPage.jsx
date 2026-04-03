/**
 * PlayPage — Game selection + Chess board
 */
import React, { useState } from 'react';
import useChessStore from '../store/chessStore';
import ChessBoard from './ChessBoard';
import GamePanel from './GamePanel';
import PromotionDialog from './PromotionDialog';
import GameOverModal from './GameOverModal';

const TIME_CONTROLS = [
    { label: '1+0', name: 'Bullet', icon: '⚡', seconds: 60 },
    { label: '2+1', name: 'Bullet', icon: '⚡', seconds: 120 },
    { label: '3+0', name: 'Blitz', icon: '🔥', seconds: 180 },
    { label: '3+2', name: 'Blitz', icon: '🔥', seconds: 180 },
    { label: '5+0', name: 'Blitz', icon: '🔥', seconds: 300 },
    { label: '10+0', name: 'Rapid', icon: '⏱', seconds: 600 },
    { label: '15+10', name: 'Rapid', icon: '⏱', seconds: 900 },
    { label: '30+0', name: 'Classical', icon: '🏛', seconds: 1800 },
];

function PlayPage() {
    const promotionDialog = useChessStore(s => s.promotionDialog);
    const gameState = useChessStore(s => s.gameState);
    const gameMode = useChessStore(s => s.gameMode);
    const setGameMode = useChessStore(s => s.setGameMode);
    const newGame = useChessStore(s => s.newGame);
    const toggleTimer = useChessStore(s => s.toggleTimer);
    const [showSetup, setShowSetup] = useState(true);
    const [selectedMode, setSelectedMode] = useState('ai');
    const [selectedTime, setSelectedTime] = useState(3);
    const [selectedColor, setSelectedColor] = useState('white');

    const handleStartGame = () => {
        setGameMode(selectedMode);
        const tc = TIME_CONTROLS[selectedTime];
        toggleTimer(true, tc.seconds);
        newGame();
        setShowSetup(false);
    };

    if (showSetup) {
        return (
            <div className="play-setup-page">
                <div className="setup-card">
                    <h2 className="setup-title">⚡ New Game</h2>

                    {/* Mode Selection */}
                    <div className="setup-section">
                        <h3 className="setup-section-title">Game Mode</h3>
                        <div className="mode-buttons">
                            {[
                                { key: 'ai', icon: '🤖', label: 'vs Computer', desc: 'Train against AI' },
                                { key: 'local', icon: '👥', label: 'vs Friend', desc: 'Pass & play' },
                            ].map(m => (
                                <button
                                    key={m.key}
                                    className={`mode-btn ${selectedMode === m.key ? 'mode-btn-active' : ''}`}
                                    onClick={() => setSelectedMode(m.key)}
                                >
                                    <span className="mode-icon">{m.icon}</span>
                                    <span className="mode-label">{m.label}</span>
                                    <span className="mode-desc">{m.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection (AI mode) */}
                    {selectedMode === 'ai' && (
                        <div className="setup-section">
                            <h3 className="setup-section-title">Play As</h3>
                            <div className="color-buttons">
                                {[
                                    { key: 'white', icon: '♔', label: 'White', desc: 'You move first' },
                                    { key: 'random', icon: '🎲', label: 'Random', desc: 'Flip a coin' },
                                    { key: 'black', icon: '♚', label: 'Black', desc: 'AI moves first' },
                                ].map(c => (
                                    <button
                                        key={c.key}
                                        className={`color-btn ${selectedColor === c.key ? 'color-btn-active' : ''}`}
                                        onClick={() => setSelectedColor(c.key)}
                                    >
                                        <span className="color-icon">{c.icon}</span>
                                        <span className="color-label">{c.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Time Control */}
                    <div className="setup-section">
                        <h3 className="setup-section-title">Time Control</h3>
                        <div className="time-grid">
                            {TIME_CONTROLS.map((tc, i) => (
                                <button
                                    key={i}
                                    className={`time-card ${selectedTime === i ? 'time-card-active' : ''}`}
                                    onClick={() => setSelectedTime(i)}
                                >
                                    <span className="tc-icon">{tc.icon}</span>
                                    <span className="tc-label">{tc.label}</span>
                                    <span className="tc-name">{tc.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="start-game-btn" onClick={handleStartGame}>
                        ♟ Play {TIME_CONTROLS[selectedTime].label} {selectedMode === 'ai' ? 'vs AI' : 'vs Friend'}
                    </button>
                </div>

                {/* Online Search Simulation */}
                <div className="online-card">
                    <h3>🌐 Online Matchmaking</h3>
                    <p>Find an opponent at your level</p>
                    <div className="waiting-animation">
                        <div className="waiting-dots">
                            <span /><span /><span />
                        </div>
                        <span>Searching for players...</span>
                    </div>
                    <div className="online-stats">
                        <div className="ostat"><span className="ostat-val">47K</span><span className="ostat-label">Online</span></div>
                        <div className="ostat"><span className="ostat-val">3.2K</span><span className="ostat-label">In Queue</span></div>
                        <div className="ostat"><span className="ostat-val">~8s</span><span className="ostat-label">Wait Time</span></div>
                    </div>
                    <button className="online-play-btn" onClick={handleStartGame}>
                        🌐 Play Online (Simulated)
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="play-page-active">
            <div className="main-layout">
                <div className="board-wrapper">
                    <ChessBoard />
                </div>
                <aside className="panel-wrapper">
                    <GamePanel />
                    <button className="back-to-setup-btn" onClick={() => setShowSetup(true)}>
                        ← Change Settings
                    </button>
                </aside>
            </div>

            {promotionDialog && <PromotionDialog />}
            {['checkmate', 'stalemate', 'draw'].includes(gameState.gameStatus) && <GameOverModal />}
        </div>
    );
}

export default PlayPage;
