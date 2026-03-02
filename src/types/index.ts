export type NewsCategory = 'sectors' | 'stocks' | 'mutual-funds' | 'commodities' | 'crypto' | 'economy';
export type EventType = 'geopolitical' | 'company' | 'fundamental' | 'economic' | 'regulatory';
export type RiskLevel = 'conservative' | 'moderate' | 'aggressive';
export type InvestmentHorizon = 'short' | 'medium' | 'long';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  url: string;
  tags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface MarketEvent {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  impactLevel: 'low' | 'medium' | 'high';
  affectedSectors: string[];
  date: string;
  source: string;
}

export interface InvestmentGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  horizon: InvestmentHorizon;
  riskLevel: RiskLevel;
  monthlyInvestment: number;
}

export interface UserProfile {
  age: number;
  monthlyIncome: number;
  riskTolerance: RiskLevel;
  investmentHorizon: InvestmentHorizon;
  goals: string[];
  existingInvestments: string[];
}

export interface InvestmentRecommendation {
  id: string;
  name: string;
  type: 'mutual-fund' | 'stock' | 'etf' | 'bond' | 'fd' | 'gold';
  expectedReturn: number;
  riskLevel: RiskLevel;
  minInvestment: number;
  description: string;
  reasonForRecommendation: string;
  category: string;
}

export interface NewsFilters {
  category: NewsCategory | 'all';
  sentiment: 'positive' | 'negative' | 'neutral' | 'all';
  search: string;
}
