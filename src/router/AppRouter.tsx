import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { NewsPage } from '../pages/NewsPage';
import { MarketEventsPage } from '../pages/MarketEventsPage';
import { GoalsPage } from '../pages/GoalsPage';

export function AppRouter() {
  return (
    <BrowserRouter basename="/stock-news-web">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="events" element={<MarketEventsPage />} />
          <Route path="goals" element={<GoalsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
