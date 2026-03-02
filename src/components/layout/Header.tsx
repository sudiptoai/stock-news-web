import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/news', label: 'News' },
  { to: '/events', label: 'Market Events' },
  { to: '/goals', label: 'Goals & AI' },
];

export function Header() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <TrendingUp className="w-6 h-6" />
            <span>StockPulse</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  'text-sm font-medium transition-colors',
                  location.pathname === link.to
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5'
                    : 'text-gray-600 hover:text-blue-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden py-3 border-t border-gray-100">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'block py-2 px-3 rounded-lg text-sm font-medium',
                  location.pathname === link.to
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
