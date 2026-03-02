import { describe, it, expect, beforeEach } from 'vitest';
import { useNewsStore } from '../../store/newsStore';

describe('newsStore', () => {
  beforeEach(() => {
    useNewsStore.getState().resetFilters();
  });

  it('has default filters', () => {
    const { filters } = useNewsStore.getState();
    expect(filters.category).toBe('all');
    expect(filters.sentiment).toBe('all');
    expect(filters.search).toBe('');
  });

  it('updates category filter', () => {
    useNewsStore.getState().setFilters({ category: 'stocks' });
    expect(useNewsStore.getState().filters.category).toBe('stocks');
  });

  it('updates sentiment filter', () => {
    useNewsStore.getState().setFilters({ sentiment: 'positive' });
    expect(useNewsStore.getState().filters.sentiment).toBe('positive');
  });

  it('updates search filter', () => {
    useNewsStore.getState().setFilters({ search: 'HDFC' });
    expect(useNewsStore.getState().filters.search).toBe('HDFC');
  });

  it('resets filters to defaults', () => {
    useNewsStore.getState().setFilters({ category: 'stocks', search: 'test' });
    useNewsStore.getState().resetFilters();
    const { filters } = useNewsStore.getState();
    expect(filters.category).toBe('all');
    expect(filters.search).toBe('');
  });

  it('merges partial filter updates', () => {
    useNewsStore.getState().setFilters({ category: 'stocks' });
    useNewsStore.getState().setFilters({ sentiment: 'positive' });
    const { filters } = useNewsStore.getState();
    expect(filters.category).toBe('stocks');
    expect(filters.sentiment).toBe('positive');
  });
});
