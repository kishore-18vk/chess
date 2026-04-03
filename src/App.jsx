import React from 'react';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PlayPage from './components/PlayPage';
import PuzzlePage from './components/PuzzlePage';
import LearnPage from './components/LearnPage';
import WatchPage from './components/WatchPage';
import NewsPage from './components/NewsPage';
import LeaderboardPage from './components/LeaderboardPage';
import useAppStore from './store/appStore';

function App() {
    const page = useAppStore(s => s.page);

    const renderPage = () => {
        switch (page) {
            case 'home': return <HomePage />;
            case 'play': return <PlayPage />;
            case 'puzzle': return <PuzzlePage />;
            case 'learn': return <LearnPage />;
            case 'watch': return <WatchPage />;
            case 'news': return <NewsPage />;
            case 'leaderboard': return <LeaderboardPage />;
            default: return <HomePage />;
        }
    };

    return (
        <div className="app">
            <Header />
            <main className="app-main">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}

export default App;
