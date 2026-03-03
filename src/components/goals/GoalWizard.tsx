import { useState } from 'react';
import { useUserStore } from '../../store/userStore';
import type { UserProfile, RiskLevel, InvestmentHorizon } from '../../types';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  onComplete: () => void;
}

const steps = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Financial Profile' },
  { id: 3, title: 'Investment Goals' },
];

const riskOptions: Array<{ value: RiskLevel; label: string; description: string }> = [
  { value: 'conservative', label: 'Conservative', description: 'Prefer stability, low risk, capital preservation' },
  { value: 'moderate', label: 'Moderate', description: 'Balance between growth and stability' },
  { value: 'aggressive', label: 'Aggressive', description: 'High growth potential, comfortable with volatility' },
];

const horizonOptions: Array<{ value: InvestmentHorizon; label: string; description: string }> = [
  { value: 'short', label: 'Short Term', description: 'Less than 3 years' },
  { value: 'medium', label: 'Medium Term', description: '3–7 years' },
  { value: 'long', label: 'Long Term', description: 'More than 7 years' },
];

const goalOptions = [
  'Retirement Planning', 'Child Education', 'Home Purchase',
  'Emergency Fund', 'Wealth Creation', 'Tax Saving',
];

const investmentOptions = [
  'Fixed Deposits', 'Stocks', 'Mutual Funds',
  'PPF/NPS', 'Real Estate', 'Gold',
];

export function GoalWizard({ onComplete }: Props) {
  const setProfile = useUserStore(state => state.setProfile);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    monthlyIncome: '',
    riskTolerance: 'moderate' as RiskLevel,
    investmentHorizon: 'long' as InvestmentHorizon,
    goals: [] as string[],
    existingInvestments: [] as string[],
  });

  const toggleArrayItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

  const handleSubmit = () => {
    const profile: UserProfile = {
      age: Number(formData.age),
      monthlyIncome: Number(formData.monthlyIncome),
      riskTolerance: formData.riskTolerance,
      investmentHorizon: formData.investmentHorizon,
      goals: formData.goals,
      existingInvestments: formData.existingInvestments,
    };
    setProfile(profile);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                  currentStep > step.id ? 'bg-green-500 dark:bg-green-600 text-white' :
                  currentStep === step.id ? 'bg-blue-600 dark:bg-blue-500 text-white' :
                  'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                )}
              >
                {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
              </div>
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">{step.title}</span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={clsx(
                  'flex-1 h-0.5 mx-3 mt-[-10px]',
                  currentStep > step.id ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Tell us about yourself</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Age</label>
              <input
                type="number"
                placeholder="e.g. 28"
                value={formData.age}
                onChange={e => setFormData(p => ({ ...p, age: e.target.value }))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="18"
                max="80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Monthly Income (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 75000"
                value={formData.monthlyIncome}
                onChange={e => setFormData(p => ({ ...p, monthlyIncome: e.target.value }))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>
        )}

        {/* Step 2: Financial Profile */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Your financial profile</h3>

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Tolerance</p>
              <div className="space-y-2">
                {riskOptions.map(opt => (
                  <label
                    key={opt.value}
                    className={clsx(
                      'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
                      formData.riskTolerance === opt.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    )}
                  >
                    <input
                      type="radio"
                      name="risk"
                      value={opt.value}
                      checked={formData.riskTolerance === opt.value}
                      onChange={() => setFormData(p => ({ ...p, riskTolerance: opt.value }))}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{opt.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{opt.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Investment Horizon</p>
              <div className="space-y-2">
                {horizonOptions.map(opt => (
                  <label
                    key={opt.value}
                    className={clsx(
                      'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
                      formData.investmentHorizon === opt.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    )}
                  >
                    <input
                      type="radio"
                      name="horizon"
                      value={opt.value}
                      checked={formData.investmentHorizon === opt.value}
                      onChange={() => setFormData(p => ({ ...p, investmentHorizon: opt.value }))}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{opt.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{opt.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Your investment goals</h3>

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What are your investment goals? (Select all that apply)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {goalOptions.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() =>
                      setFormData(p => ({
                        ...p,
                        goals: toggleArrayItem(p.goals, goal),
                      }))
                    }
                    className={clsx(
                      'text-left px-3 py-2 text-sm rounded-lg border transition-colors',
                      formData.goals.includes(goal)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                    )}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Where do you already invest? (Select all that apply)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {investmentOptions.map(inv => (
                  <button
                    key={inv}
                    type="button"
                    onClick={() =>
                      setFormData(p => ({
                        ...p,
                        existingInvestments: toggleArrayItem(p.existingInvestments, inv),
                      }))
                    }
                    className={clsx(
                      'text-left px-3 py-2 text-sm rounded-lg border transition-colors',
                      formData.existingInvestments.includes(inv)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                    )}
                  >
                    {inv}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setCurrentStep(s => s - 1)}
            disabled={currentStep === 1}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(s => s + 1)}
              disabled={
                (currentStep === 1 && (!formData.age || !formData.monthlyIncome))
              }
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={formData.goals.length === 0}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Get Recommendations
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
