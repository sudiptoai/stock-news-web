import type { NewsItem, NewsFilters } from '../types';
import { mockNewsItems } from '../data/mockData';

export async function fetchNews(filters?: Partial<NewsFilters>): Promise<NewsItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let items = [...mockNewsItems];

  if (filters?.category && filters.category !== 'all') {
    items = items.filter(item => item.category === filters.category);
  }

  if (filters?.sentiment && filters.sentiment !== 'all') {
    items = items.filter(item => item.sentiment === filters.sentiment);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    items = items.filter(
      item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.summary.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  return items;
}

export async function fetchNewsById(id: string): Promise<NewsItem | undefined> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockNewsItems.find(item => item.id === id);
}
