import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Building2, Globe, TrendingUp, Shield, DollarSign } from 'lucide-react';
import { Badge } from '../common/Badge';
import type { MarketEvent } from '../../types';
import clsx from 'clsx';

interface Props {
  event: MarketEvent;
}

const eventTypeIcons = {
  geopolitical: Globe,
  company: Building2,
  fundamental: TrendingUp,
  economic: DollarSign,
  regulatory: Shield,
};

const impactVariant = {
  low: 'success' as const,
  medium: 'warning' as const,
  high: 'danger' as const,
};

const eventTypeLabels = {
  geopolitical: 'Geopolitical',
  company: 'Company',
  fundamental: 'Fundamental',
  economic: 'Economic',
  regulatory: 'Regulatory',
};

export function MarketEventCard({ event }: Props) {
  const Icon = eventTypeIcons[event.eventType] || AlertTriangle;
  const timeAgo = formatDistanceToNow(new Date(event.date), { addSuffix: true });

  return (
    <article className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div
          className={clsx(
            'p-2 rounded-lg shrink-0',
            event.impactLevel === 'high' ? 'bg-red-100 text-red-600' :
            event.impactLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
            'bg-green-100 text-green-600'
          )}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge label={eventTypeLabels[event.eventType]} variant="info" />
              <Badge label={`${event.impactLevel} impact`} variant={impactVariant[event.impactLevel]} />
            </div>
            <span className="text-xs text-gray-400 shrink-0">{timeAgo}</span>
          </div>

          <h3 className="font-semibold text-gray-900 mt-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-1">Affected Sectors:</p>
            <div className="flex flex-wrap gap-1">
              {event.affectedSectors.map(sector => (
                <span
                  key={sector}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2">Source: {event.source}</p>
        </div>
      </div>
    </article>
  );
}
