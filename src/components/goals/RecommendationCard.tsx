import type { InvestmentRecommendation } from '../../types';
import { Badge } from '../common/Badge';
import { TrendingUp, IndianRupee } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  recommendation: InvestmentRecommendation;
  rank: number;
}

const riskVariant = {
  conservative: 'success' as const,
  moderate: 'warning' as const,
  aggressive: 'danger' as const,
};

const typeLabels: Record<string, string> = {
  'mutual-fund': 'Mutual Fund',
  'stock': 'Stock',
  'etf': 'ETF',
  'bond': 'Bond',
  'fd': 'Fixed Deposit',
  'gold': 'Gold',
};

export function RecommendationCard({ recommendation, rank }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={clsx(
          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0',
          rank === 1 ? 'bg-yellow-500 dark:bg-yellow-600' :
          rank === 2 ? 'bg-gray-400 dark:bg-gray-500' :
          rank === 3 ? 'bg-orange-400 dark:bg-orange-500' :
          'bg-blue-400 dark:bg-blue-500'
        )}>
          #{rank}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{recommendation.name}</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge label={typeLabels[recommendation.type] || recommendation.type} variant="info" />
              <Badge label={recommendation.riskLevel} variant={riskVariant[recommendation.riskLevel]} />
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{recommendation.description}</p>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">{recommendation.expectedReturn}% expected return</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <IndianRupee className="w-4 h-4" />
              <span className="text-sm">Min. ₹{recommendation.minInvestment.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs font-medium text-blue-700 dark:text-blue-400">Why this recommendation?</p>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">{recommendation.reasonForRecommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
