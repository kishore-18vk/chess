/**
 * Footer Component
 */
import React from 'react';
import useAppStore from '../store/appStore';

const FOOTER_LINKS = {
    'Play': ['Play Online', 'Play Computer', 'Chess960', 'Tournaments', 'Coordinates'],
    'Learn': ['Lessons', 'Video Lessons', 'Courses', 'Opening Explorer', 'Endgame Practice'],
    'Watch': ['Live Games', 'Streamers', 'Tournaments', 'Archive', 'News'],
    'Community': ['Friends', 'Clubs', 'Forum', 'Leaderboard', 'Events'],
    'Tools': ['Analysis Board', 'FEN Editor', 'PGN Viewer', 'Game Archive', 'Stats'],
};

function Footer() {
    const setPage = useAppStore(s => s.setPage);

    return (
        <footer className="footer">
            <div className="footer-inner">
                {/* Logo + About */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <span className="footer-logo-icon">♚</span>
                        <span className="footer-logo-text">Chess<span>.io</span></span>
                    </div>
                    <p className="footer-tagline">
                        The world's #1 chess platform. Free forever.
                    </p>
                    <div className="footer-socials">
                        <a className="social-link" href="#" title="Twitter">𝕏</a>
                        <a className="social-link" href="#" title="YouTube">▶</a>
                        <a className="social-link" href="#" title="Twitch">🎮</a>
                        <a className="social-link" href="#" title="Discord">💬</a>
                    </div>
                    <div className="footer-stats">
                        <div className="fstat">
                            <span className="fstat-val">150M+</span>
                            <span className="fstat-label">Members</span>
                        </div>
                        <div className="fstat">
                            <span className="fstat-val">2.4B+</span>
                            <span className="fstat-label">Games Played</span>
                        </div>
                    </div>
                </div>

                {/* Links */}
                {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                    <div key={section} className="footer-col">
                        <h4 className="footer-col-title">{section}</h4>
                        <ul className="footer-links">
                            {links.map(link => (
                                <li key={link}>
                                    <button className="footer-link" onClick={() => setPage(
                                        section === 'Play' ? 'play' :
                                            section === 'Learn' ? 'learn' :
                                                section === 'Watch' ? 'watch' :
                                                    section === 'Community' ? 'leaderboard' : 'home'
                                    )}>
                                        {link}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="footer-bottom">
                <span>© 2026 Chess.io — All rights reserved</span>
                <div className="footer-bottom-links">
                    <a href="#" className="footer-bottom-link">Privacy Policy</a>
                    <a href="#" className="footer-bottom-link">Terms of Service</a>
                    <a href="#" className="footer-bottom-link">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
