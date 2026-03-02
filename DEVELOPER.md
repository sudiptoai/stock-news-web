# StockPulse – Developer Documentation

## Overview

StockPulse is a React + TypeScript investment news web application providing:
- Real-time investment news (sectors, stocks, MF, commodities, crypto, economy)
- Market event tracking (geopolitical, company, economic, regulatory events)
- AI-powered investment goal recommendations

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI framework |
| Vite 7 | Build tool |
| React Query (TanStack Query v5) | Server state management |
| Zustand v5 | Client state management |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Lucide React | Icon library |
| date-fns | Date formatting |
| Vitest + Testing Library | Unit testing |

## Project Structure

```
src/
├── __tests__/           # Unit tests (mirrors src/ structure)
│   ├── components/      # Component tests
│   ├── services/        # Service layer tests
│   └── store/           # Zustand store tests
├── components/
│   ├── common/          # Reusable UI: Badge, LoadingSpinner, ErrorMessage
│   ├── goals/           # GoalWizard, RecommendationCard
│   ├── layout/          # Header, Footer, Layout
│   ├── market/          # MarketEventCard
│   └── news/            # NewsCard, NewsFilter
├── context/             # ThemeContext (dark/light mode)
├── data/                # mockData.ts (mock news & market data)
├── hooks/               # useNews, useMarketEvents (React Query hooks)
├── pages/               # HomePage, NewsPage, MarketEventsPage, GoalsPage
├── router/              # AppRouter (React Router v7)
├── services/            # newsService, marketService, aiService
├── store/               # newsStore (Zustand), userStore (Zustand + persist)
├── test/                # Test setup (Vitest)
└── types/               # Shared TypeScript types
```

## Design Patterns

### Repository Pattern (Service Layer)
All data fetching is encapsulated in service modules (`newsService.ts`, `marketService.ts`, `aiService.ts`). Components never call data sources directly.

### Observer Pattern (React Query)
`useNews` and `useMarketEvents` hooks wrap React Query's `useQuery`. Components re-render automatically when data changes.

### Strategy Pattern (AI Recommendations)
`aiService.ts` uses a configurable strategy: filters and ranks investment recommendations based on user profile (risk tolerance, horizon, income).

### State Management Split
- **Zustand** (`newsStore`, `userStore`): Client-side UI state and persisted user preferences
- **React Query**: Server/async state (news, events) with caching and background refetch
- **Context API** (`ThemeContext`): Cross-cutting concerns (theme)

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/sudiptoai/stock-news-web.git
cd stock-news-web
npm install
```

### Development

```bash
npm run dev          # Start dev server at http://localhost:5173/stock-news-web/
```

### Build

```bash
npm run build        # Production build (output: ./dist)
npm run preview      # Preview production build
```

### Testing

```bash
npm test             # Run all tests once
npm run test:watch   # Watch mode
```

### Linting

```bash
npm run lint         # ESLint
```

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Dashboard with market snapshot, latest news, recent events |
| `/news` | `NewsPage` | Full news feed with category/sentiment/search filters |
| `/events` | `MarketEventsPage` | Market events filtered by type |
| `/goals` | `GoalsPage` | Investment goal wizard + AI recommendations |

## AI Recommendation Engine

The AI recommendation engine is located in `src/services/aiService.ts`. It uses a rule-based approach:

1. **Risk Filter**: Filters investments matching user's risk tolerance
2. **Horizon Filter**: Short-term investors get only conservative options
3. **Affordability Filter**: Minimum investment must be ≤ 30% of monthly income
4. **Ranking**: Investments matching exact risk level are ranked higher; then sorted by expected return

To extend with a real AI/ML backend, replace `getAIRecommendations()` with an API call.

## Deployment

The app auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.

**Manual deployment:**
1. Enable GitHub Pages in repository settings (Source: GitHub Actions)
2. Push to `main` branch
3. The workflow builds and deploys automatically

**Live URL:** `https://sudiptoai.github.io/stock-news-web/`

## Adding Real News Data

The app currently uses mock data. To integrate real news APIs:

1. Add your API key to GitHub Secrets (`NEWS_API_KEY`)
2. Update `src/services/newsService.ts` to call the real API
3. Map the API response to the `NewsItem` type

Compatible APIs:
- [NewsAPI.org](https://newsapi.org) - `fetchNews()`
- [Alpha Vantage](https://www.alphavantage.co) - Market data
- [GNews API](https://gnews.io) - Financial news

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Run tests: `npm test`
4. Submit a pull request

## License

MIT
