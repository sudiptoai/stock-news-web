import type { UserProfile, InvestmentRecommendation } from '../types';
import { mockRecommendations } from '../data/mockData';

export function getAIRecommendations(profile: UserProfile): InvestmentRecommendation[] {
  const { riskTolerance, investmentHorizon, monthlyIncome } = profile;
  
  let filtered = [...mockRecommendations];

  // Filter by risk tolerance
  if (riskTolerance === 'conservative') {
    filtered = filtered.filter(r => r.riskLevel === 'conservative' || r.riskLevel === 'moderate');
  } else if (riskTolerance === 'moderate') {
    filtered = filtered.filter(r => r.riskLevel !== 'aggressive' || investmentHorizon === 'long');
  }
  // aggressive - include all

  // For short horizon, prefer safer options
  if (investmentHorizon === 'short') {
    filtered = filtered.filter(r => r.riskLevel === 'conservative' || r.type === 'fd' || r.type === 'bond');
  }

  // Filter by affordability
  const maxMin = monthlyIncome * 0.3;
  filtered = filtered.filter(r => r.minInvestment <= maxMin || r.minInvestment <= 1000);

  // Sort by expected return descending, but put too-risky last
  filtered.sort((a, b) => {
    if (a.riskLevel === riskTolerance && b.riskLevel !== riskTolerance) return -1;
    if (b.riskLevel === riskTolerance && a.riskLevel !== riskTolerance) return 1;
    return b.expectedReturn - a.expectedReturn;
  });

  return filtered.slice(0, 5);
}

export function generateGoalInsights(profile: UserProfile): string[] {
  const insights: string[] = [];
  const { age, monthlyIncome, riskTolerance, investmentHorizon } = profile;

  if (age < 30) {
    insights.push('You have a long investment runway. Consider allocating more to equity for higher growth.');
  } else if (age >= 30 && age < 50) {
    insights.push('Balance between growth and stability. A 60/40 equity-debt split can work well.');
  } else {
    insights.push('Focus on capital preservation. Gradually shift to debt and fixed-income instruments.');
  }

  const savingRate = 0.2 * monthlyIncome;
  insights.push(`Based on your income, aim to invest at least ₹${savingRate.toLocaleString('en-IN')} per month (20% of income).`);

  if (riskTolerance === 'aggressive' && investmentHorizon === 'long') {
    insights.push('Your high risk tolerance and long horizon are ideal for equity mutual funds and direct stocks.');
  } else if (riskTolerance === 'conservative') {
    insights.push('Consider diversifying across FDs, SGBs, and debt mutual funds for stable returns.');
  }

  if (investmentHorizon === 'long') {
    insights.push('Start SIP early – the power of compounding works best over 10+ years.');
  }

  return insights;
}
