import { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { GoalWizard } from '../components/goals/GoalWizard';
import { RecommendationCard } from '../components/goals/RecommendationCard';
import { getAIRecommendations, generateGoalInsights } from '../services/aiService';
import { Target, RefreshCw, Lightbulb, Trash2 } from 'lucide-react';

export function GoalsPage() {
  const { profile, clearProfile } = useUserStore();
  const [showWizard, setShowWizard] = useState(!profile);
  const [wizardComplete, setWizardComplete] = useState(!!profile);

  const handleWizardComplete = () => {
    setShowWizard(false);
    setWizardComplete(true);
  };

  const handleReset = () => {
    clearProfile();
    setShowWizard(true);
    setWizardComplete(false);
  };

  const recommendations = profile ? getAIRecommendations(profile) : [];
  const insights = profile ? generateGoalInsights(profile) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Goals & AI Advisor</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Set your investment goals and get personalized AI-powered recommendations.
          </p>
        </div>
        {wizardComplete && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        )}
      </div>

      {showWizard && !wizardComplete ? (
        <GoalWizard onComplete={handleWizardComplete} />
      ) : wizardComplete && profile ? (
        <div className="space-y-6">
          {/* Profile Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">Your Investment Profile</h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                <Trash2 className="w-3 h-3" />
                Reset
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Age', value: `${profile.age} years` },
                { label: 'Monthly Income', value: `₹${Number(profile.monthlyIncome).toLocaleString('en-IN')}` },
                { label: 'Risk Tolerance', value: profile.riskTolerance, capitalize: true },
                { label: 'Investment Horizon', value: profile.investmentHorizon, capitalize: true },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className={`text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5 ${item.capitalize ? 'capitalize' : ''}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            {profile.goals.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Your Goals:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.goals.map(goal => (
                    <span key={goal} className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-semibold text-blue-900 dark:text-blue-300">AI Insights</h2>
            </div>
            <ul className="space-y-2">
              {insights.map((insight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                  <span className="text-blue-400 dark:text-blue-500 mt-0.5">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              AI Recommendations for You
            </h2>
            {recommendations.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No recommendations available. Please refine your profile.</p>
            ) : (
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <RecommendationCard key={rec.id} recommendation={rec} rank={idx + 1} />
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center border-t border-gray-100 dark:border-gray-700 pt-4">
            ⚠️ These recommendations are AI-generated for educational purposes only and do not constitute financial advice.
            Please consult a SEBI-registered investment advisor before making investment decisions.
          </p>
        </div>
      ) : null}
    </div>
  );
}
