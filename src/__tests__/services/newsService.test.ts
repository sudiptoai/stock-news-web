import { describe, it, expect } from 'vitest';
import { fetchNews, fetchNewsById } from '../../services/newsService';

describe('newsService', () => {
  it('fetches all news without filters', async () => {
    const news = await fetchNews();
    expect(Array.isArray(news)).toBe(true);
    expect(news.length).toBeGreaterThan(0);
  });

  it('filters news by category', async () => {
    const news = await fetchNews({ category: 'stocks' });
    news.forEach(item => {
      expect(item.category).toBe('stocks');
    });
  });

  it('filters news by sentiment', async () => {
    const news = await fetchNews({ sentiment: 'positive' });
    news.forEach(item => {
      expect(item.sentiment).toBe('positive');
    });
  });

  it('filters news by search term', async () => {
    const news = await fetchNews({ search: 'HDFC' });
    news.forEach(item => {
      const matchesSearch =
        item.title.toLowerCase().includes('hdfc') ||
        item.summary.toLowerCase().includes('hdfc') ||
        item.tags.some(tag => tag.toLowerCase().includes('hdfc'));
      expect(matchesSearch).toBe(true);
    });
  });

  it('returns empty array when no matches', async () => {
    const news = await fetchNews({ search: 'XYZNONEXISTENTTERM123456' });
    expect(news).toHaveLength(0);
  });

  it('fetches news by id', async () => {
    const item = await fetchNewsById('1');
    expect(item).toBeDefined();
    expect(item?.id).toBe('1');
  });

  it('returns undefined for non-existent id', async () => {
    const item = await fetchNewsById('999');
    expect(item).toBeUndefined();
  });
});
