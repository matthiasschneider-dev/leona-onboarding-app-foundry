import React from 'react';
import { TrendingUp, Target, Award } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { maturityLevels } from '../data/mockData';

const RealityCheck: React.FC = () => {
  const { maturity, updateMaturity, showToast } = useApp();

  const handleLevelChange = (type: 'current' | 'target', level: number) => {
    if (type === 'current') {
      updateMaturity(level, maturity.targetLevel);
    } else {
      updateMaturity(maturity.currentLevel, level);
    }
    showToast(`${type === 'current' ? 'Current' : 'Target'} level updated!`, 'success');
  };

  const gap = maturity.targetLevel - maturity.currentLevel;
  const timeEstimate = gap > 0 ? `${gap * 2} weeks` : 'Target achieved!';

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Reality Check - The Onboarding Magic Pyramid</h1>
        <p className="text-neutral-600">
          Assess current skill levels and set target mastery goals for your electrotechnicians.
        </p>
      </div>

      {/* Pyramid Visualization */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">Maturity Pyramid</h2>

        <div className="flex flex-col-reverse gap-3 mb-8">
          {maturityLevels.map((level) => {
            const isCurrent = maturity.currentLevel === level.level;
            const isTarget = maturity.targetLevel === level.level;
            const width = 40 + (level.level * 15); // Progressive width

            return (
              <div
                key={level.level}
                className="flex items-center justify-center"
              >
                <div
                  style={{ width: `${width}%` }}
                  className={`relative p-6 rounded-lg border-2 transition-all duration-300 ${
                    isCurrent && isTarget
                      ? 'bg-green-50 border-green-500'
                      : isCurrent
                      ? 'bg-primary-50 border-primary-500'
                      : isTarget
                      ? 'bg-accent-50 border-accent-500'
                      : 'bg-neutral-50 border-neutral-300'
                  }`}
                >
                  {/* Level indicators */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-neutral-900">Level {level.level}</span>
                      {isCurrent && (
                        <span className="badge badge-primary flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Current
                        </span>
                      )}
                      {isTarget && (
                        <span className="badge badge-accent flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Target
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{level.label}</h3>
                  <p className="text-sm text-neutral-600">{level.description}</p>

                  {/* Arrow indicators */}
                  {isCurrent && !isTarget && gap > 0 && (
                    <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                      <TrendingUp className="w-6 h-6 text-primary-600" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gap indicator */}
        {maturity.currentLevel !== maturity.targetLevel && (
          <div className="text-center py-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="text-sm text-neutral-600">
              {gap > 0 ? (
                <>
                  You need to advance <span className="font-bold text-primary-700">{gap} level{gap > 1 ? 's' : ''}</span> to reach your target
                </>
              ) : (
                <>
                  Target level is <span className="font-bold text-red-700">{Math.abs(gap)} level{Math.abs(gap) > 1 ? 's' : ''}</span> below current level
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Level Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Level */}
        <div className="card">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Current Maturity Level
          </h3>
          <div className="space-y-2">
            {maturityLevels.map((level) => (
              <button
                key={`current-${level.level}`}
                onClick={() => handleLevelChange('current', level.level)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                  maturity.currentLevel === level.level
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                }`}
              >
                <div className="font-bold text-neutral-900">Level {level.level}</div>
                <div className="text-sm text-neutral-600">{level.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Target Level */}
        <div className="card">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-600" />
            Target Maturity Level
          </h3>
          <div className="space-y-2">
            {maturityLevels.map((level) => (
              <button
                key={`target-${level.level}`}
                onClick={() => handleLevelChange('target', level.level)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                  maturity.targetLevel === level.level
                    ? 'border-accent-500 bg-accent-50'
                    : 'border-neutral-200 hover:border-accent-300 hover:bg-neutral-50'
                }`}
              >
                <div className="font-bold text-neutral-900">Level {level.level}</div>
                <div className="text-sm text-neutral-600">{level.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
        <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-primary-600" />
          Development Impact Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-neutral-600 mb-1">Skill Gap</p>
            <p className="text-2xl font-bold text-neutral-900">
              {gap > 0 ? `${gap} Level${gap > 1 ? 's' : ''}` : 'No Gap'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600 mb-1">Estimated Timeline</p>
            <p className="text-2xl font-bold text-neutral-900">{timeEstimate}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600 mb-1">Development Focus</p>
            <p className="text-2xl font-bold text-neutral-900">
              {gap > 0 ? 'Active Training' : 'Maintenance'}
            </p>
          </div>
        </div>

        {gap > 0 && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-primary-200">
            <h4 className="font-bold text-neutral-900 mb-2">Key Development Areas:</h4>
            <ul className="space-y-1 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Advanced electrical safety certification and OSHA compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Independent troubleshooting and maintenance procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Emergency response leadership and decision-making</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Mentorship skills and knowledge transfer capabilities</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealityCheck;
