import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';
import type { NewsItem } from '../../types';
import clsx from 'clsx';

interface Props {
  item: NewsItem;
}

const sentimentVariant = {
  positive: 'success' as const,
  negative: 'danger' as const,
  neutral: 'default' as const,
};

const categoryLabels: Record<string, string> = {
  'sectors': 'Sectors',
  'stocks': 'Stocks',
  'mutual-funds': 'Mutual Funds',
  'commodities': 'Commodities',
  'crypto': 'Crypto',
  'economy': 'Economy',
};

export function NewsCard({ item }: Props) {
  const timeAgo = formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true });

  return (
    <article
      className={clsx(
        'bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow',
        'flex flex-col gap-3'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge label={categoryLabels[item.category] || item.category} variant="info" />
          <Badge label={item.sentiment} variant={sentimentVariant[item.sentiment]} />
        </div>
        <span className="text-xs text-gray-400 shrink-0">{timeAgo}</span>
      </div>

      <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2">
        {item.title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {item.summary}
      </p>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        <span className="text-xs font-medium text-gray-500">{item.source}</span>
        <div className="flex items-center gap-2 flex-wrap">
          {item.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 ml-1"
            aria-label={`Read more about ${item.title}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
