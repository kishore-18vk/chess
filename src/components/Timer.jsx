/**
 * Timer Component — Displays and manages the chess clock
 */
import React, { useEffect } from 'react';
import useChessStore from '../store/chessStore';
import { COLOR } from '../engine/chessEngine';

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function Timer() {
    const timerEnabled = useChessStore(s => s.timerEnabled);
    const toggleTimer = useChessStore(s => s.toggleTimer);
    const startTimer = useChessStore(s => s.startTimer);
    const stopTimer = useChessStore(s => s.stopTimer);
    const whiteTime = useChessStore(s => s.whiteTime);
    const blackTime = useChessStore(s => s.blackTime);
    const timeControl = useChessStore(s => s.timeControl);
    const gameState = useChessStore(s => s.gameState);

    const { currentTurn, gameStatus } = gameState;
    const isGameOver = ['checkmate', 'stalemate', 'draw'].includes(gameStatus);

    // Start timer when a move is made
    useEffect(() => {
        if (timerEnabled && !isGameOver) {
            startTimer();
        }
        return () => { };
    }, [gameState.history.length, timerEnabled]);

    // Stop when game over
    useEffect(() => {
        if (isGameOver) stopTimer();
    }, [isGameOver]);

    const timeOptions = [
        { label: '1 min', value: 60 },
        { label: '3 min', value: 180 },
        { label: '5 min', value: 300 },
        { label: '10 min', value: 600 },
    ];

    return (
        <div className="timer-section">
            <div className="timer-toggle">
                <label className="toggle-label">
                    <input
                        type="checkbox"
                        checked={timerEnabled}
                        onChange={e => {
                            if (e.target.checked) {
                                toggleTimer(true, timeControl);
                            } else {
                                stopTimer();
                                toggleTimer(false, timeControl);
                            }
                        }}
                    />
                    <span className="toggle-text">⏱ Clock</span>
                </label>
                {timerEnabled && (
                    <div className="time-options">
                        {timeOptions.map(opt => (
                            <button
                                key={opt.value}
                                className={`time-btn ${timeControl === opt.value ? 'time-btn-active' : ''}`}
                                onClick={() => toggleTimer(true, opt.value)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {timerEnabled && (
                <div className="clocks">
                    <div className={`clock ${currentTurn === COLOR.BLACK && !isGameOver ? 'clock-active' : ''} ${blackTime < 30 ? 'clock-low' : ''}`}>
                        <span className="clock-label">⬛ Black</span>
                        <span className="clock-time">{formatTime(blackTime)}</span>
                    </div>
                    <div className={`clock ${currentTurn === COLOR.WHITE && !isGameOver ? 'clock-active' : ''} ${whiteTime < 30 ? 'clock-low' : ''}`}>
                        <span className="clock-label">⬜ White</span>
                        <span className="clock-time">{formatTime(whiteTime)}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Timer;
