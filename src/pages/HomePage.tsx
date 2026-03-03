import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Newspaper, AlertCircle, Target, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { fetchNews } from '../services/newsService';
import { fetchMarketEvents } from '../services/marketService';
import { NewsCard } from '../components/news/NewsCard';
import { MarketEventCard } from '../components/market/MarketEventCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const stats = [
  { label: 'Nifty 50', value: '22,475', change: '+1.2%', positive: true },
  { label: 'Sensex', value: '74,119', change: '+0.9%', positive: true },
  { label: 'Nifty Bank', value: '48,232', change: '-0.3%', positive: false },
  { label: 'Gold', value: '₹71,280', change: '+0.5%', positive: true },
];

export function HomePage() {
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ['news', { category: 'all', sentiment: 'all', search: '' }],
    queryFn: () => fetchNews(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['marketEvents', 'all'],
    queryFn: () => fetchMarketEvents(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 sm:p-8 text-white">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-6 h-6" />
          <span className="text-blue-200 font-medium">Market Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Stay Ahead of the Market
        </h1>
        <p className="text-blue-100 mb-5 max-w-xl">
          Real-time investment news, market event tracking, and AI-powered recommendations — all in one place.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/news"
            className="px-4 py-2 bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
          >
            Latest News
          </Link>
          <Link
            to="/goals"
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-400 dark:hover:bg-blue-500 transition-colors border border-blue-400 dark:border-blue-500"
          >
            Set Investment Goals
          </Link>
        </div>
      </section>

      {/* Market Snapshot */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Market Snapshot</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Feature Links */}
      <section className="grid sm:grid-cols-3 gap-4">
        {[
          { to: '/news', icon: Newspaper, title: 'Investment News', desc: 'Stocks, sectors, MF & economy news', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
          { to: '/events', icon: AlertCircle, title: 'Market Events', desc: 'Geopolitical & fundamental events', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
          { to: '/goals', icon: Target, title: 'Goals & AI Advisor', desc: 'Set goals, get AI recommendations', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow flex items-start gap-3 group"
            >
              <div className={`p-2 rounded-lg ${item.iconBg}`}>
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </Link>
          );
        })}
      </section>

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Latest News</h2>
          <Link to="/news" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {newsLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {news?.slice(0, 3).map(item => <NewsCard key={item.id} item={item} />)}
          </div>
        )}
      </section>

      {/* Market Events */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Market Events</h2>
          <Link to="/events" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {eventsLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-3">
            {events?.slice(0, 2).map(event => <MarketEventCard key={event.id} event={event} />)}
          </div>
        )}
      </section>
    </div>
  );
}
