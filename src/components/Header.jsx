/**
 * Header — Chess.com-like navigation bar
 */
import React, { useState } from 'react';
import useChessStore from '../store/chessStore';
import useAppStore from '../store/appStore';

const NAV_ITEMS = [
    { key: 'home', label: '🏠 Home', sub: [] },
    {
        key: 'play', label: '♟ Play',
        sub: [
            { key: 'play', label: '⚡ Play Online', desc: 'vs players worldwide' },
            { key: 'play', label: '🤖 Play Computer', desc: 'vs AI (Easy–Expert)' },
            { key: 'play', label: '👥 Play vs Friend', desc: 'local multiplayer' },
        ],
    },
    {
        key: 'puzzle', label: '🧩 Puzzles',
        sub: [
            { key: 'puzzle', label: '📅 Daily Puzzle', desc: 'One puzzle a day' },
            { key: 'puzzle', label: '⚡ Puzzle Rush', desc: 'Solve in 3/5 minutes' },
            { key: 'puzzle', label: '🎯 Puzzle Battle', desc: 'vs another player' },
        ],
    },
    {
        key: 'learn', label: '📚 Learn',
        sub: [
            { key: 'learn', label: '📖 Courses', desc: 'Structured lessons' },
            { key: 'learn', label: '🎥 Video Library', desc: 'GM video tutorials' },
            { key: 'learn', label: '♟ Openings', desc: 'Opening explorer' },
        ],
    },
    {
        key: 'watch', label: '📺 Watch',
        sub: [
            { key: 'watch', label: '🔴 Live Games', desc: 'Top games live' },
            { key: 'watch', label: '📡 Streamers', desc: 'Top chess streamers' },
            { key: 'watch', label: '🏆 Tournaments', desc: 'Upcoming events' },
        ],
    },
    { key: 'news', label: '📰 News', sub: [] },
    { key: 'leaderboard', label: '🏆 Rankings', sub: [] },
];

function Header() {
    const setPage = useAppStore(s => s.setPage);
    const page = useAppStore(s => s.page);
    const setGameMode = useChessStore(s => s.setGameMode);
    const newGame = useChessStore(s => s.newGame);

    const [openMenu, setOpenMenu] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNav = (key) => {
        setPage(key);
        setOpenMenu(null);
        setMobileOpen(false);
        if (key === 'play') {
            setGameMode('ai');
        }
    };

    return (
        <header className="header">
            <div className="header-inner">
                {/* Logo */}
                <button className="logo" onClick={() => setPage('home')}>
                    <span className="logo-icon">♚</span>
                    <span className="logo-text">Chess<span className="logo-accent">.io</span></span>
                </button>

                {/* Desktop Navigation */}
                <nav className="header-nav desktop-nav">
                    {NAV_ITEMS.map(item => (
                        <div
                            key={item.key}
                            className="nav-item-wrapper"
                            onMouseEnter={() => item.sub.length > 0 && setOpenMenu(item.key)}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <button
                                className={`nav-btn ${page === item.key ? 'nav-btn-active' : ''}`}
                                onClick={() => handleNav(item.key)}
                            >
                                {item.label}
                                {item.sub.length > 0 && <span className="nav-chevron">›</span>}
                            </button>

                            {/* Dropdown */}
                            {item.sub.length > 0 && openMenu === item.key && (
                                <div className="nav-dropdown">
                                    {item.sub.map((sub, i) => (
                                        <button
                                            key={i}
                                            className="nav-dropdown-item"
                                            onClick={() => handleNav(sub.key)}
                                        >
                                            <span className="dropdown-label">{sub.label}</span>
                                            <span className="dropdown-desc">{sub.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="header-actions">
                    <button className="btn-signin" onClick={() => setPage('home')}>Sign In</button>
                    <button className="btn-signup" onClick={() => setPage('home')}>Sign Up Free</button>
                    {/* Mobile menu toggle */}
                    <button className="mobile-menu-btn" onClick={() => setMobileOpen(prev => !prev)}>
                        {mobileOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <nav className="mobile-nav">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.key}
                            className={`mobile-nav-btn ${page === item.key ? 'mobile-nav-active' : ''}`}
                            onClick={() => handleNav(item.key)}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            )}
        </header>
    );
}

export default Header;
