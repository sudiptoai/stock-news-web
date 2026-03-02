import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InvestmentGoal, UserProfile } from '../types';

interface UserStore {
  profile: UserProfile | null;
  goals: InvestmentGoal[];
  setProfile: (profile: UserProfile) => void;
  addGoal: (goal: InvestmentGoal) => void;
  removeGoal: (id: string) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      goals: [],
      setProfile: (profile) => set({ profile }),
      addGoal: (goal) =>
        set((state) => ({ goals: [...state.goals, goal] })),
      removeGoal: (id) =>
        set((state) => ({ goals: state.goals.filter(g => g.id !== id) })),
      clearProfile: () => set({ profile: null, goals: [] }),
    }),
    { name: 'user-investment-store' }
  )
);
