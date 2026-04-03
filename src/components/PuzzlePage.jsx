/**
 * PuzzlePage — Daily Chess Puzzle with hints, solutions, ratings
 */
import React, { useState } from 'react';
import PieceSVG from './PieceSVG';

const PUZZLES = [
    {
        id: 1,
        title: "Smothered Mate",
        difficulty: "Medium",
        rating: 1450,
        theme: "Tactics",
        board: [
            [null, null, null, null, 'bK', null, null, 'bR'],
            [null, null, null, null, 'bP', 'bP', null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, 'wN', null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, 'wK', null, null, null],
        ],
        solution: ['Nf7+', 'Kf8', 'Nh6+', 'Ke8', 'Qe7#'],
        hint: "Look for a knight check that forces the king into a corner",
        colorToMove: 'w',
        puzzleNumber: 3847291,
    },
    {
        id: 2,
        title: "Back Rank Mate",
        difficulty: "Easy",
        rating: 1120,
        theme: "Checkmate",
        board: [
            ['bR', null, null, null, null, null, null, 'bK'],
            [null, null, null, null, null, 'bP', 'bP', 'bP'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, 'wP', 'wP', 'wP'],
            ['wR', null, null, null, null, null, null, 'wK'],
        ],
        solution: ['Rd8#'],
        hint: "The back rank is weak...",
        colorToMove: 'w',
        puzzleNumber: 1923847,
    },
    {
        id: 3,
        title: "Queen Sacrifice",
        difficulty: "Hard",
        rating: 2100,
        theme: "Sacrifice",
        board: [
            [null, null, null, 'bK', null, 'bR', null, null],
            [null, null, null, 'bP', null, 'bP', 'bP', null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, 'bQ', null, null, null],
            [null, null, 'wQ', null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, 'wP', null, 'wP', 'wP', null],
            [null, null, null, 'wK', null, 'wR', null, null],
        ],
        solution: ['Qxd7+', 'Rxd7', 'Rxd7#'],
        hint: "Sometimes you have to give to receive",
        colorToMove: 'w',
        puzzleNumber: 5672341,
    },
];

const PIECE_DISPLAY = {
    wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
    bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

const DIFFICULTY_COLORS = {
    Easy: '#81b64c',
    Medium: '#f0b429',
    Hard: '#e84c4c',
};

function PuzzleMiniBoard({ board }) {
    return (
        <div className="puzzle-board">
            {board.map((row, ri) => row.map((piece, ci) => {
                const isLight = (ri + ci) % 2 === 0;
                return (
                    <div
                        key={`${ri}-${ci}`}
                        className={`puzzle-sq ${isLight ? 'puzzle-sq-light' : 'puzzle-sq-dark'}`}
                    >
                        {piece && (
                            <span className={`puzzle-piece ${piece[0] === 'w' ? 'white-piece' : 'black-piece'}`}>
                                {PIECE_DISPLAY[piece]}
                            </span>
                        )}
                    </div>
                );
            }))}
        </div>
    );
}

function PuzzlePage() {
    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [solved, setSolved] = useState(false);
    const [streak, setStreak] = useState(7);
    const [rating, setRating] = useState(1487);

    const puzzle = PUZZLES[currentPuzzle];

    const handleSolve = () => {
        setSolved(true);
        setStreak(prev => prev + 1);
        setRating(prev => prev + Math.floor(Math.random() * 20) + 5);
        setShowSolution(true);
    };

    const handleNext = () => {
        const next = (currentPuzzle + 1) % PUZZLES.length;
        setCurrentPuzzle(next);
        setShowHint(false);
        setShowSolution(false);
        setSolved(false);
    };

    return (
        <div className="puzzle-page">
            <div className="puzzle-layout">
                {/* Left: Board */}
                <div className="puzzle-board-side">
                    <div className="puzzle-board-header">
                        <div className="puzzle-badge" style={{ background: `${DIFFICULTY_COLORS[puzzle.difficulty]}22`, color: DIFFICULTY_COLORS[puzzle.difficulty] }}>
                            {puzzle.difficulty}
                        </div>
                        <div className="puzzle-rating-badge">
                            ⭐ {puzzle.rating}
                        </div>
                    </div>

                    <div className="puzzle-board-wrapper">
                        <div className="puzzle-board-frame">
                            <div className="puzzle-rank-labels">
                                {['8', '7', '6', '5', '4', '3', '2', '1'].map(r => <span key={r} className="puzzle-coord">{r}</span>)}
                            </div>
                            <PuzzleMiniBoard board={puzzle.board} />
                        </div>
                        <div className="puzzle-file-labels">
                            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(f => <span key={f} className="puzzle-coord">{f}</span>)}
                        </div>
                    </div>

                    <div className="puzzle-turn-indicator">
                        <div className={`turn-dot ${puzzle.colorToMove === 'w' ? 'turn-white' : 'turn-black'}`} />
                        <span>{puzzle.colorToMove === 'w' ? 'White' : 'Black'} to move</span>
                    </div>
                </div>

                {/* Right: Controls */}
                <div className="puzzle-controls-side">
                    <div className="puzzle-header-card">
                        <div className="puzzle-daily-badge">📅 Daily Puzzle #{puzzle.puzzleNumber.toLocaleString()}</div>
                        <h2 className="puzzle-title">{puzzle.title}</h2>
                        <div className="puzzle-theme">
                            <span className="theme-tag">🎯 {puzzle.theme}</span>
                        </div>
                    </div>

                    {/* Streak & Rating */}
                    <div className="puzzle-stats">
                        <div className="pstat">
                            <div className="pstat-value">🔥 {streak}</div>
                            <div className="pstat-label">Day Streak</div>
                        </div>
                        <div className="pstat-divider" />
                        <div className="pstat">
                            <div className="pstat-value">⭐ {rating}</div>
                            <div className="pstat-label">Puzzle Rating</div>
                        </div>
                        <div className="pstat-divider" />
                        <div className="pstat">
                            <div className="pstat-value">✅ 142</div>
                            <div className="pstat-label">Solved Today</div>
                        </div>
                    </div>

                    {/* Hint */}
                    {showHint && !showSolution && (
                        <div className="puzzle-hint-card">
                            <div className="hint-icon">💡</div>
                            <p>{puzzle.hint}</p>
                        </div>
                    )}

                    {/* Solution */}
                    {showSolution && (
                        <div className="puzzle-solution-card">
                            <h4>✅ Solution:</h4>
                            <div className="solution-moves">
                                {puzzle.solution.map((move, i) => (
                                    <span key={i} className="solution-move">{move}</span>
                                ))}
                            </div>
                            {solved && (
                                <div className="solved-banner">
                                    🎉 Excellent! +{Math.floor(Math.random() * 20) + 5} rating
                                </div>
                            )}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="puzzle-actions">
                        {!showSolution && (
                            <>
                                <button className="puzzle-btn puzzle-btn-primary" onClick={handleSolve}>
                                    ✅ I Found It!
                                </button>
                                <button className="puzzle-btn puzzle-btn-hint" onClick={() => setShowHint(true)}>
                                    💡 Hint
                                </button>
                                <button className="puzzle-btn puzzle-btn-solve" onClick={() => setShowSolution(true)}>
                                    👁 Show Solution
                                </button>
                            </>
                        )}
                        {showSolution && (
                            <button className="puzzle-btn puzzle-btn-primary" onClick={handleNext}>
                                ▶ Next Puzzle
                            </button>
                        )}
                    </div>

                    {/* Puzzle Navigation */}
                    <div className="puzzle-nav">
                        {PUZZLES.map((p, i) => (
                            <button
                                key={p.id}
                                className={`puzzle-nav-btn ${i === currentPuzzle ? 'active' : ''}`}
                                onClick={() => { setCurrentPuzzle(i); setShowHint(false); setShowSolution(false); setSolved(false); }}
                                style={{ '--btn-color': DIFFICULTY_COLORS[p.difficulty] }}
                            >
                                #{i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Puzzle Rush Banner */}
            <div className="puzzle-rush-banner">
                <div className="rush-content">
                    <div className="rush-icon">⚡</div>
                    <div>
                        <h3>Puzzle Rush</h3>
                        <p>Solve as many puzzles as you can in 3 or 5 minutes!</p>
                    </div>
                    <button className="rush-btn">Start Puzzle Rush</button>
                </div>
            </div>
        </div>
    );
}

export default PuzzlePage;
