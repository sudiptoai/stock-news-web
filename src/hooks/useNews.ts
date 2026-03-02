import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '../services/newsService';
import { useNewsStore } from '../store/newsStore';

export function useNews() {
  const filters = useNewsStore(state => state.filters);

  return useQuery({
    queryKey: ['news', filters],
    queryFn: () => fetchNews(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
