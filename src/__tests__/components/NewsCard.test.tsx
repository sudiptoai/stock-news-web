import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NewsCard } from '../../components/news/NewsCard';
import type { NewsItem } from '../../types';

const mockItem: NewsItem = {
  id: '1',
  title: 'Test News Title',
  summary: 'This is a test summary for the news article.',
  category: 'stocks',
  source: 'Test Source',
  publishedAt: new Date().toISOString(),
  url: '#',
  tags: ['TestTag', 'Finance'],
  sentiment: 'positive',
};

describe('NewsCard', () => {
  it('renders the news title', () => {
    render(<NewsCard item={mockItem} />);
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
  });

  it('renders the news summary', () => {
    render(<NewsCard item={mockItem} />);
    expect(screen.getByText('This is a test summary for the news article.')).toBeInTheDocument();
  });

  it('renders the source', () => {
    render(<NewsCard item={mockItem} />);
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  it('renders the sentiment badge', () => {
    render(<NewsCard item={mockItem} />);
    expect(screen.getByText('positive')).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(<NewsCard item={mockItem} />);
    expect(screen.getByText('Stocks')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<NewsCard item={mockItem} />);
    expect(screen.getByText('#TestTag')).toBeInTheDocument();
  });

  it('renders external link', () => {
    render(<NewsCard item={mockItem} />);
    expect(screen.getByLabelText(/read more about test news title/i)).toBeInTheDocument();
  });
});
