import { describe, it, expect } from 'vitest';
import { fetchMarketEvents, fetchEventsByType } from '../../services/marketService';

describe('marketService', () => {
  it('fetches all market events', async () => {
    const events = await fetchMarketEvents();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it('returns events sorted by date descending', async () => {
    const events = await fetchMarketEvents();
    for (let i = 0; i < events.length - 1; i++) {
      const dateA = new Date(events[i].date).getTime();
      const dateB = new Date(events[i + 1].date).getTime();
      expect(dateA).toBeGreaterThanOrEqual(dateB);
    }
  });

  it('filters events by type', async () => {
    const events = await fetchEventsByType('geopolitical');
    events.forEach(e => {
      expect(e.eventType).toBe('geopolitical');
    });
  });

  it('returns all events when type is all', async () => {
    const all = await fetchMarketEvents();
    const byAll = await fetchEventsByType('all');
    expect(byAll.length).toBe(all.length);
  });
});
