/**
 * Global App State Store — manages navigation/page
 */
import { create } from 'zustand';

const useAppStore = create((set) => ({
    page: 'home',  // 'home' | 'play' | 'puzzle' | 'learn' | 'watch' | 'news' | 'leaderboard' | 'analysis' | 'profile'
    setPage: (page) => set({ page }),
}));

export default useAppStore;
