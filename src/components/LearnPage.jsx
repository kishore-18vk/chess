/**
 * LearnPage — Courses, lessons, and chess education
 */
import React, { useState } from 'react';

const COURSES = [
    {
        id: 1, icon: '🏰', title: 'Chess Fundamentals',
        desc: 'Learn the rules, basic tactics, and essential strategies for beginners.',
        level: 'Beginner', lessons: 12, duration: '4h 30m', students: '2.4M', rating: 4.9,
        color: '#81b64c', tags: ['Openings', 'Rules', 'Basic Tactics'],
        progress: 0, instructor: 'GM Daniel Naroditsky',
    },
    {
        id: 2, icon: '⚔️', title: 'Tactical Patterns',
        desc: 'Master forks, pins, skewers, discovered attacks, and combinations.',
        level: 'Intermediate', lessons: 24, duration: '8h 20m', students: '1.8M', rating: 4.8,
        color: '#f0b429', tags: ['Forks', 'Pins', 'Skewers', 'Combinations'],
        progress: 0, instructor: 'IM John Bartholomew',
    },
    {
        id: 3, icon: '🔮', title: 'Endgame Mastery',
        desc: 'From King & Pawn endings to complex Rook endgames. Win drawn positions.',
        level: 'Advanced', lessons: 18, duration: '6h 45m', students: '890K', rating: 4.9,
        color: '#7c6fcd', tags: ['K+P Endgames', 'Rook Endings', 'Technique'],
        progress: 0, instructor: 'GM Yasser Seirawan',
    },
    {
        id: 4, icon: '♟️', title: 'Opening Repertoire',
        desc: 'Build a complete opening system for both White and Black.',
        level: 'Intermediate', lessons: 20, duration: '7h 10m', students: '1.2M', rating: 4.7,
        color: '#e84c4c', tags: ['e4', 'd4', 'Sicilian', 'King\'s Indian'],
        progress: 0, instructor: 'GM Magnus Carlsen',
    },
    {
        id: 5, icon: '🧠', title: 'Strategic Chess',
        desc: 'Understand pawn structure, piece placement, and long-term planning.',
        level: 'Advanced', lessons: 16, duration: '5h 50m', students: '654K', rating: 4.8,
        color: '#06b6d4', tags: ['Planning', 'Pawn Structure', 'Piece Activity'],
        progress: 0, instructor: 'GM Hikaru Nakamura',
    },
    {
        id: 6, icon: '⚡', title: 'Speed Chess Secrets',
        desc: 'Tips and techniques for bullet and blitz chess. Think fast, move smart.',
        level: 'All Levels', lessons: 15, duration: '4h 00m', students: '2.1M', rating: 4.7,
        color: '#f97316', tags: ['Time Management', 'Pattern Recognition', 'Psychology'],
        progress: 0, instructor: 'GM Hikaru Nakamura',
    },
];

const VIDEOS = [
    { title: 'Top 10 Chess Openings for Beginners', views: '4.2M', duration: '22:45', thumb: '♔', instructor: 'Daniel Naroditsky' },
    { title: 'How to Play the Sicilian Defense', views: '2.8M', duration: '34:20', thumb: '♛', instructor: 'GM Magnus Carlsen' },
    { title: 'Mastering the King\'s Indian Setup', views: '1.9M', duration: '41:15', thumb: '♞', instructor: 'GM Hikaru Nakamura' },
    { title: 'Essential Endgame Techniques', views: '3.1M', duration: '28:30', thumb: '♔', instructor: 'IM John Bartholomew' },
];

const LEVEL_COLORS = {
    'Beginner': '#81b64c',
    'Intermediate': '#f0b429',
    'Advanced': '#e84c4c',
    'All Levels': '#7c6fcd',
};

function CourseCard({ course }) {
    const [enrolled, setEnrolled] = useState(false);

    return (
        <div className="course-card">
            <div className="course-header" style={{ borderTopColor: course.color }}>
                <div className="course-icon" style={{ background: `${course.color}18` }}>{course.icon}</div>
                <div className="course-level" style={{ color: LEVEL_COLORS[course.level] || '#81b64c' }}>
                    {course.level}
                </div>
            </div>
            <div className="course-body">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.desc}</p>
                <div className="course-instructor">
                    <span className="instructor-avatar">{course.instructor[0]}</span>
                    <span className="instructor-name">{course.instructor}</span>
                </div>
                <div className="course-tags">
                    {course.tags.map(tag => (
                        <span key={tag} className="course-tag">{tag}</span>
                    ))}
                </div>
                <div className="course-meta">
                    <span className="cmeta-item">📚 {course.lessons} lessons</span>
                    <span className="cmeta-item">⏱ {course.duration}</span>
                    <span className="cmeta-item">👥 {course.students}</span>
                    <span className="cmeta-item">⭐ {course.rating}</span>
                </div>
            </div>
            <div className="course-footer">
                <button
                    className={`course-btn ${enrolled ? 'course-btn-enrolled' : ''}`}
                    onClick={() => setEnrolled(true)}
                    style={!enrolled ? { background: course.color } : {}}
                >
                    {enrolled ? '✓ Enrolled — Continue' : '▶ Start Course Free'}
                </button>
            </div>
        </div>
    );
}

function LearnPage() {
    const [activeTab, setActiveTab] = useState('courses');
    const [filter, setFilter] = useState('All');

    const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
    const filtered = filter === 'All' ? COURSES : COURSES.filter(c => c.level === filter || c.level === 'All Levels');

    return (
        <div className="learn-page">
            {/* Header */}
            <div className="learn-page-header">
                <h1 className="learn-page-title">📚 Learn Chess</h1>
                <p className="learn-page-sub">From beginner to grandmaster — structured lessons for every level</p>
            </div>

            {/* Tabs */}
            <div className="learn-tabs">
                {['courses', 'videos', 'openings'].map(tab => (
                    <button
                        key={tab}
                        className={`learn-tab ${activeTab === tab ? 'learn-tab-active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'courses' ? '📖 Courses' : tab === 'videos' ? '🎥 Video Lessons' : '♟ Opening Explorer'}
                    </button>
                ))}
            </div>

            {activeTab === 'courses' && (
                <>
                    {/* Filters */}
                    <div className="course-filters">
                        {filters.map(f => (
                            <button
                                key={f}
                                className={`filter-btn ${filter === f ? 'filter-btn-active' : ''}`}
                                onClick={() => setFilter(f)}
                                style={filter === f ? { background: LEVEL_COLORS[f] || '#81b64c', borderColor: LEVEL_COLORS[f] || '#81b64c' } : {}}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="courses-grid">
                        {filtered.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </>
            )}

            {activeTab === 'videos' && (
                <div className="videos-grid">
                    {VIDEOS.map((video, i) => (
                        <div key={i} className="video-card">
                            <div className="video-thumb">
                                <div className="video-thumb-icon">{video.thumb}</div>
                                <div className="video-play-btn">▶</div>
                                <div className="video-duration">{video.duration}</div>
                            </div>
                            <div className="video-info">
                                <h4 className="video-title">{video.title}</h4>
                                <div className="video-meta">
                                    <span className="video-instructor">{video.instructor}</span>
                                    <span className="video-views">👁 {video.views}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'openings' && (
                <div className="openings-explorer">
                    <div className="opening-categories">
                        {['e4 Openings', 'd4 Openings', 'Flank Openings', 'Irregular'].map(cat => (
                            <div key={cat} className="opening-cat-card">
                                <h3>{cat}</h3>
                                <div className="opening-list">
                                    {cat === 'e4 Openings' && ['Sicilian Defense', 'French Defense', "Ruy López", "Italian Game", "Caro-Kann"].map(o => (
                                        <div key={o} className="opening-item">
                                            <span className="opening-name">{o}</span>
                                            <span className="opening-arrow">›</span>
                                        </div>
                                    ))}
                                    {cat === 'd4 Openings' && ["Queen's Gambit", "King's Indian", "Nimzo-Indian", "Grünfeld", "Slav Defense"].map(o => (
                                        <div key={o} className="opening-item">
                                            <span className="opening-name">{o}</span>
                                            <span className="opening-arrow">›</span>
                                        </div>
                                    ))}
                                    {cat === 'Flank Openings' && ["English Opening", "Réti Opening", "King's Indian Attack", "Bird's Opening"].map(o => (
                                        <div key={o} className="opening-item">
                                            <span className="opening-name">{o}</span>
                                            <span className="opening-arrow">›</span>
                                        </div>
                                    ))}
                                    {cat === 'Irregular' && ["Alekhine's Defense", "Pirc Defense", "Modern Defense", "Scandinavian"].map(o => (
                                        <div key={o} className="opening-item">
                                            <span className="opening-name">{o}</span>
                                            <span className="opening-arrow">›</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default LearnPage;
