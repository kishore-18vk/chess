/**
 * NewsPage — Chess news, articles, and blog
 */
import React, { useState } from 'react';

const ALL_NEWS = [
    {
        id: 1,
        category: 'Tournaments',
        categoryColor: '#81b64c',
        title: 'Magnus Carlsen Wins World Rapid Championship for 9th Time',
        excerpt: 'The Norwegian legend demonstrated once again why he\'s considered the greatest chess player of all time, defeating a field of 200 players...',
        date: 'April 3, 2026',
        readTime: '4 min read',
        views: '84.2K',
        comments: 312,
        likes: 2847,
        emoji: '👑',
        featured: true,
    },
    {
        id: 2,
        category: 'Analysis',
        categoryColor: '#f0b429',
        title: 'The Immortal Zugzwang: Analyzing Carlsen\'s Most Beautiful Move',
        excerpt: 'In a stunning display of endgame technique, Magnus found the only winning move in a position that left grandmasters speechless...',
        date: 'April 2, 2026',
        readTime: '8 min read',
        views: '42.1K',
        comments: 187,
        likes: 1923,
        emoji: '♟',
        featured: true,
    },
    {
        id: 3,
        category: 'News',
        categoryColor: '#e84c4c',
        title: 'Candidates Tournament 2026: Race to the World Championship Heats Up',
        excerpt: 'With only 3 rounds remaining, every point matters as eight elite grandmasters battle for the right to challenge the world champion...',
        date: 'April 1, 2026',
        readTime: '6 min read',
        views: '31.8K',
        comments: 241,
        likes: 1456,
        emoji: '🏆',
        featured: false,
    },
    {
        id: 4,
        category: 'Learn',
        categoryColor: '#7c6fcd',
        title: '5 Opening Mistakes That Are Costing You Rating Points',
        excerpt: 'Chess coaches reveal the most common opening errors at every level, from 800 to 2000 rated players, and how to fix them...',
        date: 'March 31, 2026',
        readTime: '5 min read',
        views: '127K',
        comments: 489,
        likes: 5234,
        emoji: '📚',
        featured: false,
    },
    {
        id: 5,
        category: 'Technology',
        categoryColor: '#06b6d4',
        title: 'How AI is Changing Chess: From Stockfish to Neural Networks',
        excerpt: 'Deep dive into how artificial intelligence has revolutionized chess analysis, preparation, and even the way we understand the game...',
        date: 'March 30, 2026',
        readTime: '10 min read',
        views: '58.4K',
        comments: 203,
        likes: 2891,
        emoji: '🤖',
        featured: false,
    },
    {
        id: 6,
        category: 'Strategy',
        categoryColor: '#f97316',
        title: 'The Queen\'s Gambit Declined: A Complete Guide for Black',
        excerpt: 'This comprehensive guide covers all the major variations of the QGD, with model games and key move-by-move explanations...',
        date: 'March 29, 2026',
        readTime: '12 min read',
        views: '71.2K',
        comments: 334,
        likes: 3521,
        emoji: '♛',
        featured: false,
    },
];

const CATEGORIES = ['All', 'Tournaments', 'Analysis', 'News', 'Learn', 'Strategy', 'Technology'];

function NewsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [likedPosts, setLikedPosts] = useState(new Set());

    const filtered = activeCategory === 'All'
        ? ALL_NEWS
        : ALL_NEWS.filter(n => n.category === activeCategory);

    const featured = filtered.filter(n => n.featured);
    const regular = filtered.filter(n => !n.featured);

    const toggleLike = (id) => {
        setLikedPosts(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="news-page">
            <div className="news-page-header">
                <h1 className="news-page-title">📰 Chess News</h1>
                <p className="news-page-sub">Latest updates from the chess world</p>
            </div>

            {/* Category Filter */}
            <div className="news-categories">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`news-cat-btn ${activeCategory === cat ? 'news-cat-active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Featured Articles */}
            {featured.length > 0 && (
                <div className="featured-articles">
                    {featured.map(article => (
                        <div key={article.id} className="featured-article-card">
                            <div className="featured-emoji-bg">{article.emoji}</div>
                            <div className="featured-content">
                                <div className="featured-category" style={{ color: article.categoryColor }}>
                                    🔥 Featured • {article.category}
                                </div>
                                <h2 className="featured-title">{article.title}</h2>
                                <p className="featured-excerpt">{article.excerpt}</p>
                                <div className="article-meta">
                                    <span>{article.date}</span>
                                    <span>📖 {article.readTime}</span>
                                    <span>👁 {article.views}</span>
                                    <span>💬 {article.comments}</span>
                                </div>
                                <div className="featured-actions">
                                    <button className="read-btn">Read Article →</button>
                                    <button
                                        className={`like-btn ${likedPosts.has(article.id) ? 'liked' : ''}`}
                                        onClick={() => toggleLike(article.id)}
                                    >
                                        {likedPosts.has(article.id) ? '❤️' : '🤍'} {article.likes + (likedPosts.has(article.id) ? 1 : 0)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Regular Articles */}
            <div className="regular-articles">
                {regular.map(article => (
                    <div key={article.id} className="article-card">
                        <div className="article-emoji" style={{ background: `${article.categoryColor}18` }}>
                            {article.emoji}
                        </div>
                        <div className="article-body">
                            <div className="article-category" style={{ color: article.categoryColor }}>
                                {article.category}
                            </div>
                            <h3 className="article-title">{article.title}</h3>
                            <p className="article-excerpt">{article.excerpt}</p>
                            <div className="article-footer">
                                <div className="article-meta">
                                    <span>{article.date}</span>
                                    <span>📖 {article.readTime}</span>
                                    <span>👁 {article.views}</span>
                                </div>
                                <div className="article-actions">
                                    <button
                                        className={`like-btn-sm ${likedPosts.has(article.id) ? 'liked' : ''}`}
                                        onClick={() => toggleLike(article.id)}
                                    >
                                        {likedPosts.has(article.id) ? '❤️' : '🤍'} {article.likes + (likedPosts.has(article.id) ? 1 : 0)}
                                    </button>
                                    <button className="comment-btn-sm">💬 {article.comments}</button>
                                    <button className="read-btn-sm">Read More →</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsPage;
