import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarketEventCard } from '../../components/market/MarketEventCard';
import type { MarketEvent } from '../../types';

const mockEvent: MarketEvent = {
  id: '1',
  title: 'Test Market Event',
  description: 'This is a test market event description.',
  eventType: 'geopolitical',
  impactLevel: 'high',
  affectedSectors: ['Energy', 'Banking'],
  date: new Date().toISOString(),
  source: 'Reuters',
};

describe('MarketEventCard', () => {
  it('renders the event title', () => {
    render(<MarketEventCard event={mockEvent} />);
    expect(screen.getByText('Test Market Event')).toBeInTheDocument();
  });

  it('renders the event description', () => {
    render(<MarketEventCard event={mockEvent} />);
    expect(screen.getByText('This is a test market event description.')).toBeInTheDocument();
  });

  it('renders the event type badge', () => {
    render(<MarketEventCard event={mockEvent} />);
    expect(screen.getByText('Geopolitical')).toBeInTheDocument();
  });

  it('renders the impact level badge', () => {
    render(<MarketEventCard event={mockEvent} />);
    expect(screen.getByText('high impact')).toBeInTheDocument();
  });

  it('renders affected sectors', () => {
    render(<MarketEventCard event={mockEvent} />);
    expect(screen.getByText('Energy')).toBeInTheDocument();
    expect(screen.getByText('Banking')).toBeInTheDocument();
  });

  it('renders the source', () => {
    render(<MarketEventCard event={mockEvent} />);
    expect(screen.getByText(/Reuters/)).toBeInTheDocument();
  });
});
