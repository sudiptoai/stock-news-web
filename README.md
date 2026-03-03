# Stock News Web

A modern financial news aggregator built with React, TypeScript, and Vite. Get real-time financial news from various sources with filtering and sentiment analysis.

## Features

- 📰 Real-time financial news from NewsAPI
- 🎯 Category-based filtering (stocks, crypto, commodities, etc.)
- 💹 Sentiment analysis (positive, negative, neutral)
- 🔍 Search functionality
- 🎨 Modern and responsive UI
- ⚡ Fast and optimized with Vite

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- NewsAPI key (free tier available)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your free NewsAPI key:
   - Visit [https://newsapi.org/register](https://newsapi.org/register)
   - Sign up for a free account
   - Copy your API key

4. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

5. Add your NewsAPI key to `.env`:
   ```
   VITE_NEWS_API_KEY=your_actual_api_key_here
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## NewsAPI Free Tier Limitations

- 100 requests per day
- News articles up to 1 month old
- HTTPS access
- Developer attribution required

For production use, consider upgrading to a paid plan at [newsapi.org/pricing](https://newsapi.org/pricing).

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
