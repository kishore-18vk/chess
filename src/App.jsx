import React from 'react';
import './index.css';
import Header from './components/Header';
import ChessBoard from './components/ChessBoard';
import GamePanel from './components/GamePanel';
import PromotionDialog from './components/PromotionDialog';
import GameOverModal from './components/GameOverModal';
import useChessStore from './store/chessStore';

function App() {
    const promotionDialog = useChessStore(s => s.promotionDialog);
    const gameState = useChessStore(s => s.gameState);

    return (
        <div className="app">
            <Header />
            <main className="main-layout">
                <div className="board-wrapper">
                    <ChessBoard />
                </div>
                <aside className="panel-wrapper">
                    <GamePanel />
                </aside>
            </main>

            {promotionDialog && <PromotionDialog />}
            {['checkmate', 'stalemate', 'draw'].includes(gameState.gameStatus) && <GameOverModal />}
        </div>
    );
}

export default App;
