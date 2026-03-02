import { describe, it, expect } from 'vitest';
import { getAIRecommendations, generateGoalInsights } from '../../services/aiService';
import type { UserProfile } from '../../types';

const conservativeProfile: UserProfile = {
  age: 55,
  monthlyIncome: 60000,
  riskTolerance: 'conservative',
  investmentHorizon: 'short',
  goals: ['Retirement Planning'],
  existingInvestments: ['Fixed Deposits'],
};

const aggressiveProfile: UserProfile = {
  age: 25,
  monthlyIncome: 100000,
  riskTolerance: 'aggressive',
  investmentHorizon: 'long',
  goals: ['Wealth Creation'],
  existingInvestments: [],
};

describe('getAIRecommendations', () => {
  it('returns recommendations for conservative profile', () => {
    const recs = getAIRecommendations(conservativeProfile);
    expect(recs).toBeDefined();
    expect(recs.length).toBeGreaterThan(0);
    expect(recs.length).toBeLessThanOrEqual(5);
  });

  it('returns only conservative/moderate options for conservative short-term profile', () => {
    const recs = getAIRecommendations(conservativeProfile);
    recs.forEach(rec => {
      expect(['conservative', 'moderate']).toContain(rec.riskLevel);
    });
  });

  it('returns recommendations for aggressive profile', () => {
    const recs = getAIRecommendations(aggressiveProfile);
    expect(recs.length).toBeGreaterThan(0);
    expect(recs.length).toBeLessThanOrEqual(5);
  });

  it('filters short-term profiles to safe investments', () => {
    const recs = getAIRecommendations(conservativeProfile);
    recs.forEach(rec => {
      expect(['conservative']).toContain(rec.riskLevel);
    });
  });
});

describe('generateGoalInsights', () => {
  it('returns insights for a young aggressive investor', () => {
    const insights = generateGoalInsights(aggressiveProfile);
    expect(insights).toBeDefined();
    expect(insights.length).toBeGreaterThan(0);
    expect(insights.some(i => i.toLowerCase().includes('long'))).toBe(true);
  });

  it('returns insights mentioning income-based savings', () => {
    const insights = generateGoalInsights(aggressiveProfile);
    expect(insights.some(i => i.includes('₹'))).toBe(true);
  });

  it('returns age-appropriate insight for older conservative investor', () => {
    const insights = generateGoalInsights(conservativeProfile);
    expect(insights.some(i => i.toLowerCase().includes('preservation') || i.toLowerCase().includes('debt'))).toBe(true);
  });
});
