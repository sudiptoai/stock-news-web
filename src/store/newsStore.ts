import { create } from 'zustand';
import type { NewsFilters } from '../types';

interface NewsStore {
  filters: NewsFilters;
  setFilters: (filters: Partial<NewsFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: NewsFilters = {
  category: 'all',
  sentiment: 'all',
  search: '',
};

export const useNewsStore = create<NewsStore>((set) => ({
  filters: defaultFilters,
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
