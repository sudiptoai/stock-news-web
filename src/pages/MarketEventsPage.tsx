import { useMarketEvents } from '../hooks/useMarketEvents';
import { MarketEventCard } from '../components/market/MarketEventCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { AlertCircle } from 'lucide-react';

const eventTypeFilters: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All Events' },
  { value: 'geopolitical', label: '🌍 Geopolitical' },
  { value: 'company', label: '🏢 Company' },
  { value: 'fundamental', label: '📊 Fundamental' },
  { value: 'economic', label: '💰 Economic' },
  { value: 'regulatory', label: '🛡️ Regulatory' },
];

export function MarketEventsPage() {
  const { data: events, isLoading, error, eventTypeFilter, setEventTypeFilter } = useMarketEvents();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Market Events</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Track events that affect the stock market — geopolitical, company, economic, and regulatory.
        </p>
      </div>

      {/* Event type filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {eventTypeFilters.map(f => (
            <button
              key={f.value}
              onClick={() => setEventTypeFilter(f.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                eventTypeFilter === f.value
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events list */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message="Failed to load market events." />
      ) : !events?.length ? (
        <div className="text-center py-12 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No events found for the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <MarketEventCard key={event.id} event={event} />
          ))}
          <p className="text-xs text-gray-400 text-center">
            Showing {events.length} events
          </p>
        </div>
      )}
    </div>
  );
}
