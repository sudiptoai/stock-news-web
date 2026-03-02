import { useNews } from '../hooks/useNews';
import { NewsCard } from '../components/news/NewsCard';
import { NewsFilter } from '../components/news/NewsFilter';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { Newspaper } from 'lucide-react';

export function NewsPage() {
  const { data: news, isLoading, error } = useNews();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Newspaper className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Investment News</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Curated news across sectors, stocks, mutual funds, commodities, and more.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <NewsFilter />
          </div>
        </aside>

        {/* News grid */}
        <section className="lg:col-span-3">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message="Failed to load news. Please try again." />
          ) : !news?.length ? (
            <div className="text-center py-12 text-gray-500">
              <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No news found matching your filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {news.map(item => <NewsCard key={item.id} item={item} />)}
            </div>
          )}
          {news && (
            <p className="text-xs text-gray-400 mt-4 text-center">
              Showing {news.length} articles
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
