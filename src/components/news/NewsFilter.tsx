import { Search, X } from 'lucide-react';
import { useNewsStore } from '../../store/newsStore';
import type { NewsCategory } from '../../types';

const categories: Array<{ value: NewsCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'stocks', label: 'Stocks' },
  { value: 'sectors', label: 'Sectors' },
  { value: 'mutual-funds', label: 'Mutual Funds' },
  { value: 'commodities', label: 'Commodities' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'economy', label: 'Economy' },
];

const sentiments = [
  { value: 'all', label: 'All Sentiment' },
  { value: 'positive', label: '📈 Positive' },
  { value: 'neutral', label: '➡️ Neutral' },
  { value: 'negative', label: '📉 Negative' },
];

export function NewsFilter() {
  const { filters, setFilters, resetFilters } = useNewsStore();

  const hasActiveFilters =
    filters.category !== 'all' || filters.sentiment !== 'all' || filters.search !== '';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search news..."
          value={filters.search}
          onChange={e => setFilters({ search: e.target.value })}
          className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category filter */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setFilters({ category: cat.value })}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                filters.category === cat.value
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sentiment filter */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Sentiment</p>
        <div className="flex flex-wrap gap-2">
          {sentiments.map(s => (
            <button
              key={s.value}
              onClick={() =>
                setFilters({ sentiment: s.value as 'all' | 'positive' | 'negative' | 'neutral' })
              }
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                filters.sentiment === s.value
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium"
        >
          <X className="w-3 h-3" />
          Reset filters
        </button>
      )}
    </div>
  );
}
