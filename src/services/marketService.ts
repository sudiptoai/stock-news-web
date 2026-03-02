import type { MarketEvent } from '../types';
import { mockMarketEvents } from '../data/mockData';

export async function fetchMarketEvents(): Promise<MarketEvent[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [...mockMarketEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function fetchEventsByType(eventType: string): Promise<MarketEvent[]> {
  const events = await fetchMarketEvents();
  if (eventType === 'all') return events;
  return events.filter(e => e.eventType === eventType);
}
