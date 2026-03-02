import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchEventsByType } from '../services/marketService';

export function useMarketEvents() {
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');

  const query = useQuery({
    queryKey: ['marketEvents', eventTypeFilter],
    queryFn: () => fetchEventsByType(eventTypeFilter),
    staleTime: 5 * 60 * 1000,
  });

  return { ...query, eventTypeFilter, setEventTypeFilter };
}
