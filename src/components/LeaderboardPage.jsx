/**
 * LeaderboardPage — Full global rankings and stats
 */
import React, { useState } from 'react';

const PLAYERS = [
    { rank: 1, name: 'MagnusCarlsen', realName: 'Magnus Carlsen', rating: 2882, country: '🇳🇴', wins: 1204, losses: 123, draws: 321, winRate: '74%', peak: 2882, title: 'GM', trend: '+12' },
    { rank: 2, name: 'Hikaru', realName: 'Hikaru Nakamura', rating: 2851, country: '🇺🇸', wins: 987, losses: 201, draws: 218, winRate: '69%', peak: 2851, title: 'GM', trend: '+8' },
    { rank: 3, name: 'GukeshD', realName: 'D. Gukesh', rating: 2830, country: '🇮🇳', wins: 876, losses: 145, draws: 287, winRate: '71%', peak: 2830, title: 'GM', trend: '+5' },
    { rank: 4, name: 'FabianoCaruana', realName: 'Fabiano Caruana', rating: 2822, country: '🇺🇸', wins: 812, losses: 178, draws: 312, winRate: '67%', peak: 2832, title: 'GM', trend: '-3' },
    { rank: 5, name: 'AnishGiri', realName: 'Anish Giri', rating: 2798, country: '🇳🇱', wins: 754, losses: 189, draws: 398, winRate: '62%', peak: 2798, title: 'GM', trend: '+1' },
    { rank: 6, name: 'LevonAronian', realName: 'Levon Aronian', rating: 2786, country: '🇺🇸', wins: 698, losses: 202, draws: 341, winRate: '61%', peak: 2816, title: 'GM', trend: '-2' },
    { rank: 7, name: 'Praggnanandhaa', realName: 'R. Praggnanandhaa', rating: 2774, country: '🇮🇳', wins: 645, losses: 220, draws: 287, winRate: '58%', peak: 2774, title: 'GM', trend: '+15' },
    { rank: 8, name: 'AlirexaFirouzja', realName: 'Alireza Firouzja', rating: 2761, country: '🇫🇷', wins: 601, losses: 231, draws: 267, winRate: '57%', peak: 2804, title: 'GM', trend: '-8' },
    { rank: 9, name: 'WesleySo', realName: 'Wesley So', rating: 2748, country: '🇺🇸', wins: 578, losses: 245, draws: 312, winRate: '55%', peak: 2822, title: 'GM', trend: '+3' },
    { rank: 10, name: 'IanNepomniachtchi', realName: 'Ian Nepomniachtchi', rating: 2736, country: '🇷🇺', wins: 554, losses: 198, draws: 389, winRate: '56%', peak: 2792, title: 'GM', trend: '-1' },
];

const TIME_CONTROLS = ['Blitz', 'Bullet', 'Rapid', 'Classical'];

const RANK_COLORS = {
    1: { bg: 'linear-gradient(135deg, #FFD700, #FFA500)', text: '#1a1a1a', icon: '👑' },
    2: { bg: 'linear-gradient(135deg, #C0C0C0, #A0A0A0)', text: '#1a1a1a', icon: '🥈' },
    3: { bg: 'linear-gradient(135deg, #CD7F32, #A0522D)', text: '#fff', icon: '🥉' },
};

function LeaderboardPage() {
    const [timeControl, setTimeControl] = useState('Blitz');
    const [sortBy, setSortBy] = useState('rating');

    return (
        <div className="leaderboard-page">
            <div className="lb-page-header">
                <h1 className="lb-page-title">🏆 Global Leaderboard</h1>
                <p className="lb-page-sub">Top rated players worldwide</p>
            </div>

            {/* Controls */}
            <div className="lb-controls">
                <div className="lb-tc-tabs">
                    {TIME_CONTROLS.map(tc => (
                        <button
                            key={tc}
                            className={`lb-tc-btn ${timeControl === tc ? 'lb-tc-active' : ''}`}
                            onClick={() => setTimeControl(tc)}
                        >
                            {tc === 'Blitz' ? '⚡' : tc === 'Bullet' ? '🔥' : tc === 'Rapid' ? '⏱' : '🏛'} {tc}
                        </button>
                    ))}
                </div>
                <div className="lb-sort">
                    <span className="lb-sort-label">Sort by:</span>
                    <select
                        className="lb-sort-select"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="rating">Rating</option>
                        <option value="wins">Total Wins</option>
                        <option value="winrate">Win Rate</option>
                    </select>
                </div>
            </div>

            {/* Top 3 Podium */}
            <div className="podium-section">
                {[PLAYERS[1], PLAYERS[0], PLAYERS[2]].map((player, i) => {
                    const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
                    const rStyle = RANK_COLORS[actualRank];
                    return (
                        <div
                            key={player.rank}
                            className={`podium-card podium-${actualRank === 1 ? 'gold' : actualRank === 2 ? 'silver' : 'bronze'}`}
                            style={{ background: rStyle.bg }}
                        >
                            <div className="podium-medal">{rStyle.icon}</div>
                            <div className="podium-avatar" style={{ color: rStyle.text }}>{player.name[0]}</div>
                            <div className="podium-name" style={{ color: rStyle.text }}>{player.name}</div>
                            <div className="podium-country">{player.country}</div>
                            <div className="podium-rating" style={{ color: rStyle.text, opacity: 0.9 }}>{player.rating}</div>
                            <div className="podium-wins" style={{ color: rStyle.text, opacity: 0.75 }}>{player.wins} wins</div>
                        </div>
                    );
                })}
            </div>

            {/* Full Table */}
            <div className="lb-table-container">
                <table className="lb-table">
                    <thead>
                        <tr>
                            <th className="lb-th">Rank</th>
                            <th className="lb-th">Player</th>
                            <th className="lb-th">Title</th>
                            <th className="lb-th">Rating</th>
                            <th className="lb-th">W</th>
                            <th className="lb-th">L</th>
                            <th className="lb-th">D</th>
                            <th className="lb-th">Win%</th>
                            <th className="lb-th">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PLAYERS.map(player => {
                            const rStyle = RANK_COLORS[player.rank];
                            return (
                                <tr key={player.rank} className={`lb-tr ${player.rank <= 3 ? 'lb-tr-top' : ''}`}>
                                    <td className="lb-td">
                                        {player.rank <= 3 ? (
                                            <span className="rank-medal" style={{ background: rStyle.bg }}>{rStyle.icon}</span>
                                        ) : (
                                            <span className="rank-num">#{player.rank}</span>
                                        )}
                                    </td>
                                    <td className="lb-td lb-td-player">
                                        <div className="lb-player-cell">
                                            <div className="lb-player-avatar">{player.name[0]}</div>
                                            <div className="lb-player-details">
                                                <span className="lb-player-username">{player.name}</span>
                                                <span className="lb-player-realname">{player.country} {player.realName}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="lb-td"><span className="title-badge">{player.title}</span></td>
                                    <td className="lb-td lb-rating">{player.rating}</td>
                                    <td className="lb-td lb-wins">{player.wins}</td>
                                    <td className="lb-td lb-losses">{player.losses}</td>
                                    <td className="lb-td lb-draws">{player.draws}</td>
                                    <td className="lb-td">
                                        <div className="winrate-bar-container">
                                            <div className="winrate-bar" style={{ width: player.winRate }} />
                                            <span>{player.winRate}</span>
                                        </div>
                                    </td>
                                    <td className="lb-td">
                                        <span className={`trend ${player.trend.startsWith('+') ? 'trend-up' : 'trend-down'}`}>
                                            {player.trend.startsWith('+') ? '▲' : '▼'} {player.trend.replace(/[+-]/, '')}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaderboardPage;
