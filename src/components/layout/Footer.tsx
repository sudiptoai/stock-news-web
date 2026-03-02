import { TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span>StockPulse</span>
          </div>
          <p className="text-sm text-center">
            For educational purposes only. Not financial advice. Always consult a SEBI-registered advisor.
          </p>
          <p className="text-xs">© 2025 StockPulse</p>
        </div>
      </div>
    </footer>
  );
}
