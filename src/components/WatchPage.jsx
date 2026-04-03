/**
 * WatchPage — Live games, tournaments, streamers
 */
import React, { useState, useEffect } from 'react';

const LIVE_GAMES = [
    {
        id: 1, white: 'MagnusCarlsen', black: 'Hikaru', wRating: 2882, bRating: 2851,
        timeControl: '⚡ Blitz 3+0', viewers: 84213, wEval: '+0.8',
        event: 'World Blitz Championship', status: 'Move 34 • White to move',
    },
    {
        id: 2, white: 'FabianoCaruana', black: 'GukeshD', wRating: 2822, bRating: 2830,
        timeControl: '⏱ Rapid 15+10', viewers: 41829, wEval: '=',
        event: 'Candidates Tournament', status: 'Move 21 • Black to move',
    },
    {
        id: 3, white: 'Praggnanandhaa', black: 'AlirexaFirouzja', wRating: 2774, bRating: 2761,
        timeControl: '🏃 Bullet 1+0', viewers: 22451, wEval: '-0.4',
        event: 'PRO Chess League', status: 'Move 45 • White to move',
    },
    {
        id: 4, white: 'AnishGiri', black: 'LevonAronian', wRating: 2798, bRating: 2786,
        timeControl: '⏱ Rapid 15+10', viewers: 18920, wEval: '+1.2',
        event: 'Grand Chess Tour', status: 'Move 18 • Black to move',
    },
];

const STREAMERS = [
    { name: 'GothamChess', viewers: '42.1K', game: 'Analyzing Magnus vs Hikaru', avatar: '♟', isLive: true },
    { name: 'agadmator', viewers: '28.7K', game: 'Greatest Games of All Time', avatar: '♛', isLive: true },
    { name: 'Daniel Naroditsky', viewers: '19.3K', game: 'Speed Run to 2700', avatar: '♔', isLive: true },
    { name: 'Eric Rosen', viewers: '14.8K', game: 'Budapest Gambit Fun', avatar: '♞', isLive: false },
    { name: 'Alexandra Botez', viewers: '11.2K', game: 'Viewer Challenges', avatar: '♕', isLive: true },
    { name: 'BotezLive', viewers: '9.4K', game: 'Blitz Battle', avatar: '♗', isLive: false },
];

const TOURNAMENTS = [
    { name: 'World Rapid & Blitz Championship', date: 'Dec 25-31', prize: '$1,000,000', players: 200, status: 'live' },
    { name: 'Grand Chess Tour Finals', date: 'Jan 5-12', prize: '$500,000', players: 10, status: 'upcoming' },
    { name: 'Tata Steel Chess Tournament', date: 'Jan 17 - Feb 2', prize: '$300,000', players: 14, status: 'upcoming' },
    { name: 'Norway Chess Classical', date: 'May 27 - Jun 7', prize: '$400,000', players: 10, status: 'upcoming' },
];

function EvalBar({ eval: evalStr }) {
    const val = parseFloat(evalStr) || 0;
    const whitePercent = Math.min(Math.max(50 + val * 8, 5), 95);
    return (
        <div className="eval-bar">
            <div className="eval-white" style={{ width: `${whitePercent}%` }} />
            <div className="eval-black" style={{ width: `${100 - whitePercent}%` }} />
            <span className="eval-label">{evalStr === '=' ? '0.0' : evalStr}</span>
        </div>
    );
}

function WatchPage() {
    const [activeTab, setActiveTab] = useState('live');
    const [viewerCount, setViewerCount] = useState(84213);

    useEffect(() => {
        const interval = setInterval(() => {
            setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="watch-page">
            <div className="watch-header">
                <h1 className="watch-title">📺 Watch Chess</h1>
                <p className="watch-sub">Live games, tournaments, and top streamers</p>
                <div className="live-pulse">
                    <span className="live-dot" />
                    <span className="live-count">
                        {(LIVE_GAMES.reduce((a, g) => a + g.viewers, 0)).toLocaleString()} watching now
                    </span>
                </div>
            </div>

            <div className="watch-tabs">
                {['live', 'streamers', 'tournaments'].map(tab => (
                    <button
                        key={tab}
                        className={`watch-tab ${activeTab === tab ? 'watch-tab-active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'live' ? '🔴 Live Games' : tab === 'streamers' ? '📡 Streamers' : '🏆 Tournaments'}
                    </button>
                ))}
            </div>

            {activeTab === 'live' && (
                <div className="live-games-grid">
                    {LIVE_GAMES.map(game => (
                        <div key={game.id} className="live-game-card">
                            <div className="live-game-header">
                                <div className="live-badge-sm">🔴 LIVE</div>
                                <div className="live-event">{game.event}</div>
                                <div className="live-viewers">👁 {game.viewers.toLocaleString()}</div>
                            </div>

                            <div className="live-players">
                                <div className="live-player">
                                    <div className="lp-avatar white-side">{game.white[0]}</div>
                                    <div className="lp-info">
                                        <span className="lp-name">{game.white}</span>
                                        <span className="lp-rating">{game.wRating}</span>
                                    </div>
                                    <div className="lp-color white-indicator" />
                                </div>

                                <div className="live-vs">
                                    <span>VS</span>
                                    <div className="live-tc">{game.timeControl}</div>
                                </div>

                                <div className="live-player live-player-black">
                                    <div className="lp-color black-indicator" />
                                    <div className="lp-info lp-info-right">
                                        <span className="lp-name">{game.black}</span>
                                        <span className="lp-rating">{game.bRating}</span>
                                    </div>
                                    <div className="lp-avatar black-side">{game.black[0]}</div>
                                </div>
                            </div>

                            <EvalBar eval={game.wEval} />

                            <div className="live-status">
                                <span>{game.status}</span>
                                <button className="watch-btn">Watch →</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'streamers' && (
                <div className="streamers-grid">
                    {STREAMERS.map((s, i) => (
                        <div key={i} className={`streamer-card ${s.isLive ? 'streamer-live' : 'streamer-offline'}`}>
                            <div className="streamer-avatar">{s.avatar}</div>
                            <div className="streamer-info">
                                <div className="streamer-top">
                                    <span className="streamer-name">{s.name}</span>
                                    {s.isLive
                                        ? <span className="streamer-badge-live">🔴 LIVE</span>
                                        : <span className="streamer-badge-offline">⭕ Offline</span>
                                    }
                                </div>
                                <span className="streamer-game">{s.game}</span>
                                {s.isLive && <span className="streamer-viewers">👁 {s.viewers} watching</span>}
                            </div>
                            <button className={`streamer-btn ${s.isLive ? '' : 'streamer-btn-follow'}`}>
                                {s.isLive ? 'Watch' : 'Follow'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'tournaments' && (
                <div className="tournaments-list">
                    {TOURNAMENTS.map((t, i) => (
                        <div key={i} className={`tournament-card ${t.status === 'live' ? 'tournament-live' : ''}`}>
                            <div className="tournament-status-indicator">
                                {t.status === 'live'
                                    ? <span className="t-live-dot">🔴 LIVE</span>
                                    : <span className="t-upcoming">📅 Upcoming</span>
                                }
                            </div>
                            <div className="tournament-info">
                                <h3 className="tournament-name">{t.name}</h3>
                                <div className="tournament-meta">
                                    <span className="tmeta">📅 {t.date}</span>
                                    <span className="tmeta">👥 {t.players} players</span>
                                    <span className="tmeta prize">💰 {t.prize}</span>
                                </div>
                            </div>
                            <button className={`tournament-btn ${t.status === 'live' ? 'tournament-btn-live' : ''}`}>
                                {t.status === 'live' ? 'Watch Now' : 'View Details'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WatchPage;
