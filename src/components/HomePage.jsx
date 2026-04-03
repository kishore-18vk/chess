import React, { useState, useEffect } from 'react';
import useAppStore from '../store/appStore';

const NEWS_ITEMS = [
    {
        id: 1,
        title: 'Magnus Carlsen Wins World Rapid Championship',
        category: 'Tournaments',
        time: '2 hours ago',
        img: '♟',
        desc: 'The Norwegian legend claims another title in stunning fashion...',
        color: '#81b64c',
        views: '42K',
    },
    {
        id: 2,
        title: 'Top 10 Most Brilliant Moves of 2024',
        category: 'Analysis',
        time: '5 hours ago',
        img: '♗',
        desc: 'Chess experts break down the most creative and unexpected moves...',
        color: '#f0b429',
        views: '31K',
    },
    {
        id: 3,
        title: 'Candidates Tournament Finals: Who Will Challenge?',
        category: 'News',
        time: '1 day ago',
        img: '♛',
        desc: 'The race to the World Championship is tighter than ever...',
        color: '#e84c4c',
        views: '18K',
    },
    {
        id: 4,
        title: 'New Opening: The Alpha Variation Explained',
        category: 'Learn',
        time: '2 days ago',
        img: '♞',
        desc: 'GM explains this powerful new weapon in modern chess...',
        color: '#7c6fcd',
        views: '27K',
    },
];

const LEADERBOARD = [
    { rank: 1, name: 'MagnusCarlsen', rating: 2882, country: '🇳🇴', wins: 1204, flag: '👑' },
    { rank: 2, name: 'Hikaru', rating: 2851, country: '🇺🇸', wins: 987, flag: '🥈' },
    { rank: 3, name: 'GukeshD', rating: 2830, country: '🇮🇳', wins: 876, flag: '🥉' },
    { rank: 4, name: 'FabianoCaruana', rating: 2822, country: '🇺🇸', wins: 812, flag: '' },
    { rank: 5, name: 'AnishGiri', rating: 2798, country: '🇳🇱', wins: 754, flag: '' },
    { rank: 6, name: 'LevonAronian', rating: 2786, country: '🇺🇸', wins: 698, flag: '' },
    { rank: 7, name: 'Praggnanandhaa', rating: 2774, country: '🇮🇳', wins: 645, flag: '' },
    { rank: 8, name: 'AlirexaFirouzja', rating: 2761, country: '🇫🇷', wins: 601, flag: '' },
];

const FEATURES = [
    { icon: '⚡', title: 'Bullet Chess', desc: '1 minute games. Lightning fast. No time to think.', color: '#e84c4c', tag: '60s' },
    { icon: '🔥', title: 'Blitz Chess', desc: '3-5 minute games. The most popular time control.', color: '#f0b429', tag: '3-5 min' },
    { icon: '⏱️', title: 'Rapid Chess', desc: '10-30 minute games. Perfect balance of speed and strategy.', color: '#81b64c', tag: '10-30 min' },
    { icon: '🏛️', title: 'Classical', desc: 'Deep thinking chess. Play like the grandmasters.', color: '#7c6fcd', tag: '30+ min' },
];

const LEARN_TOPICS = [
    { icon: '🏰', title: 'Opening Fundamentals', level: 'Beginner', lessons: 12, progress: 0 },
    { icon: '⚔️', title: 'Tactical Patterns', level: 'Intermediate', lessons: 24, progress: 0 },
    { icon: '🔮', title: 'Endgame Mastery', level: 'Advanced', lessons: 18, progress: 0 },
    { icon: '♟️', title: 'Pawn Structure', level: 'Intermediate', lessons: 15, progress: 0 },
    { icon: '🗡️', title: 'Attack & Defence', level: 'Advanced', lessons: 20, progress: 0 },
    { icon: '🧩', title: 'Puzzle Rush Training', level: 'All Levels', lessons: 30, progress: 0 },
];

function StatCard({ value, label, icon, color }) {
    return (
        <div className="stat-card">
            <div className="stat-icon" style={{ background: `${color}22`, color }}>{icon}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

function HomePage() {
    const setPage = useAppStore(s => s.setPage);
    const [onlineCount] = useState(() => Math.floor(Math.random() * 30000) + 120000);
    const [puzzleCount] = useState(() => Math.floor(Math.random() * 50000) + 3000000);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-pattern" />
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">
                            <span className="online-dot" />
                            <span>{onlineCount.toLocaleString()} players online now</span>
                        </div>
                        <h1 className="hero-title">
                            Play Chess <span className="hero-title-accent">Online</span><br />
                            Free & Fast
                        </h1>
                        <p className="hero-subtitle">
                            Join millions of players worldwide. Play against friends, challenge the AI,
                            solve puzzles, and improve your game with lessons.
                        </p>
                        <div className="hero-actions">
                            <button className="btn-hero-primary" onClick={() => setPage('play')}>
                                ♟ Play Now
                            </button>
                            <button className="btn-hero-secondary" onClick={() => setPage('puzzle')}>
                                🧩 Daily Puzzle
                            </button>
                            <button className="btn-hero-outline" onClick={() => setPage('learn')}>
                                📚 Learn Chess
                            </button>
                        </div>
                    </div>
                    <div className="hero-board-preview">
                        <MiniBoard />
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-section">
                <div className="stats-grid">
                    <StatCard value="150M+" label="Registered Members" icon="👥" color="#81b64c" />
                    <StatCard value={`${(onlineCount / 1000).toFixed(0)}K`} label="Online Now" icon="🟢" color="#4ade80" />
                    <StatCard value={`${(puzzleCount / 1000000).toFixed(1)}M`} label="Puzzles Solved Today" icon="🧩" color="#f0b429" />
                    <StatCard value="2.4B+" label="Games Played" icon="♟" color="#7c6fcd" />
                </div>
            </section>

            {/* Game Modes */}
            <section className="home-section">
                <div className="section-header">
                    <h2 className="section-heading">⚡ Choose Your Time Control</h2>
                    <p className="section-subtext">From lightning-fast bullet to deep classical games</p>
                </div>
                <div className="features-grid">
                    {FEATURES.map((f) => (
                        <button
                            key={f.title}
                            className="feature-card"
                            onClick={() => setPage('play')}
                            style={{ '--card-color': f.color }}
                        >
                            <div className="feature-tag" style={{ background: `${f.color}22`, color: f.color }}>{f.tag}</div>
                            <div className="feature-icon" style={{ background: `${f.color}18` }}>{f.icon}</div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>
                            <div className="feature-arrow">→</div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Play Options */}
            <section className="home-section play-modes-section">
                <div className="play-modes-grid">
                    <div className="play-mode-card play-mode-online" onClick={() => setPage('play')}>
                        <div className="play-mode-icon">🌐</div>
                        <h3>Play Online</h3>
                        <p>Challenge players from around the world</p>
                        <span className="play-mode-badge">{Math.floor(onlineCount / 10).toLocaleString()} in queue</span>
                    </div>
                    <div className="play-mode-card play-mode-computer" onClick={() => setPage('play')}>
                        <div className="play-mode-icon">🤖</div>
                        <h3>Play Computer</h3>
                        <p>Train against AI with adjustable difficulty</p>
                        <span className="play-mode-badge">Easy to Expert</span>
                    </div>
                    <div className="play-mode-card play-mode-friend" onClick={() => setPage('play')}>
                        <div className="play-mode-icon">👥</div>
                        <h3>Play vs Friend</h3>
                        <p>Challenge your friend on the same device</p>
                        <span className="play-mode-badge">Local multiplayer</span>
                    </div>
                    <div className="play-mode-card play-mode-puzzle" onClick={() => setPage('puzzle')}>
                        <div className="play-mode-icon">🧩</div>
                        <h3>Daily Puzzle</h3>
                        <p>Sharpen your tactics with daily challenges</p>
                        <span className="play-mode-badge">New daily</span>
                    </div>
                </div>
            </section>

            {/* Learn Section */}
            <section className="home-section">
                <div className="section-header">
                    <h2 className="section-heading">📚 Improve Your Chess</h2>
                    <p className="section-subtext">Structured lessons from beginner to grandmaster level</p>
                    <button className="section-cta" onClick={() => setPage('learn')}>View All Courses →</button>
                </div>
                <div className="learn-grid">
                    {LEARN_TOPICS.map((topic) => (
                        <div key={topic.title} className="learn-card" onClick={() => setPage('learn')}>
                            <div className="learn-icon">{topic.icon}</div>
                            <div className="learn-info">
                                <h4 className="learn-title">{topic.title}</h4>
                                <div className="learn-meta">
                                    <span className="learn-level">{topic.level}</span>
                                    <span className="learn-lessons">{topic.lessons} lessons</span>
                                </div>
                            </div>
                            <div className="learn-arrow">›</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Leaderboard + News Grid */}
            <section className="home-section">
                <div className="two-col-grid">
                    {/* Leaderboard */}
                    <div>
                        <div className="section-header">
                            <h2 className="section-heading">🏆 Global Leaderboard</h2>
                            <button className="section-cta" onClick={() => setPage('leaderboard')}>Full Rankings →</button>
                        </div>
                        <div className="leaderboard-card">
                            {LEADERBOARD.map((player) => (
                                <div key={player.rank} className="lb-row">
                                    <div className="lb-rank">
                                        {player.flag ? <span className="lb-flag">{player.flag}</span> : <span className="lb-num">#{player.rank}</span>}
                                    </div>
                                    <div className="lb-avatar">{player.name[0]}</div>
                                    <div className="lb-info">
                                        <span className="lb-name">{player.name}</span>
                                        <span className="lb-country">{player.country}</span>
                                    </div>
                                    <div className="lb-stats">
                                        <span className="lb-rating">{player.rating}</span>
                                        <span className="lb-wins">{player.wins.toLocaleString()} wins</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* News */}
                    <div>
                        <div className="section-header">
                            <h2 className="section-heading">📰 Chess News</h2>
                            <button className="section-cta" onClick={() => setPage('news')}>All News →</button>
                        </div>
                        <div className="news-list">
                            {NEWS_ITEMS.map((item) => (
                                <div key={item.id} className="news-card" onClick={() => setPage('news')}>
                                    <div className="news-emoji" style={{ background: `${item.color}18` }}>{item.img}</div>
                                    <div className="news-body">
                                        <div className="news-meta">
                                            <span className="news-category" style={{ color: item.color }}>{item.category}</span>
                                            <span className="news-time">{item.time}</span>
                                            <span className="news-views">👁 {item.views}</span>
                                        </div>
                                        <h4 className="news-title">{item.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <div className="cta-content">
                    <h2>Ready to elevate your chess?</h2>
                    <p>Join 150 million players. Free forever.</p>
                    <button className="btn-cta" onClick={() => setPage('play')}>Start Playing Free →</button>
                </div>
                <div className="cta-pieces">♔ ♕ ♖ ♗ ♘ ♙</div>
            </section>
        </div>
    );
}

function MiniBoard() {
    const MINI_BOARD = [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'wP', null, null, null],
        [null, null, null, null, null, null, null, null],
        ['wP', 'wP', 'wP', 'wP', null, 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ];
    const PIECE_MAP = {
        wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
        bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
    };
    return (
        <div className="mini-board">
            {MINI_BOARD.map((row, ri) => row.map((piece, ci) => {
                const isLight = (ri + ci) % 2 === 0;
                return (
                    <div
                        key={`${ri}-${ci}`}
                        className={`mini-sq ${isLight ? 'mini-sq-light' : 'mini-sq-dark'}`}
                    >
                        {piece && (
                            <span className={`mini-piece ${piece[0] === 'w' ? 'mini-piece-white' : 'mini-piece-black'}`}>
                                {PIECE_MAP[piece]}
                            </span>
                        )}
                    </div>
                );
            }))}
        </div>
    );
}

export default HomePage;
