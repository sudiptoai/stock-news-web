import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '../../store/userStore';
import type { InvestmentGoal, UserProfile } from '../../types';

const mockProfile: UserProfile = {
  age: 30,
  monthlyIncome: 80000,
  riskTolerance: 'moderate',
  investmentHorizon: 'long',
  goals: ['Retirement Planning'],
  existingInvestments: ['Mutual Funds'],
};

const mockGoal: InvestmentGoal = {
  id: 'g1',
  name: 'Retirement',
  targetAmount: 5000000,
  currentAmount: 100000,
  horizon: 'long',
  riskLevel: 'moderate',
  monthlyInvestment: 10000,
};

describe('userStore', () => {
  beforeEach(() => {
    useUserStore.getState().clearProfile();
  });

  it('has null profile initially', () => {
    expect(useUserStore.getState().profile).toBeNull();
  });

  it('sets user profile', () => {
    useUserStore.getState().setProfile(mockProfile);
    expect(useUserStore.getState().profile).toEqual(mockProfile);
  });

  it('adds a goal', () => {
    useUserStore.getState().addGoal(mockGoal);
    expect(useUserStore.getState().goals).toContainEqual(mockGoal);
  });

  it('removes a goal', () => {
    useUserStore.getState().addGoal(mockGoal);
    useUserStore.getState().removeGoal('g1');
    expect(useUserStore.getState().goals).not.toContainEqual(mockGoal);
  });

  it('clears profile and goals', () => {
    useUserStore.getState().setProfile(mockProfile);
    useUserStore.getState().addGoal(mockGoal);
    useUserStore.getState().clearProfile();
    expect(useUserStore.getState().profile).toBeNull();
    expect(useUserStore.getState().goals).toHaveLength(0);
  });
});
