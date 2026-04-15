import React from 'react';
import { ThumbsUp, Info } from 'lucide-react';
import { useApp } from '../lib/AppContext';

const Prioritization: React.FC = () => {
  const { useCases, voteUseCase } = useApp();

  const quadrants = {
    'Quick Wins': { color: 'bg-green-100 border-green-300', title: 'Quick Wins', desc: 'High Impact, Low Effort - Priority 1' },
    'Strategic Bets': { color: 'bg-blue-100 border-blue-300', title: 'Strategic Bets', desc: 'High Impact, High Effort - Priority 2' },
    'Fill-in Jobs': { color: 'bg-neutral-100 border-neutral-300', title: 'Fill-in Jobs', desc: 'Low Impact, Low Effort - Priority 3' },
    'Money Pits': { color: 'bg-red-100 border-red-300', title: 'Money Pits', desc: 'Low Impact, High Effort - Avoid' },
  };

  const getUseCasesByQuadrant = (quadrant: string) =>
    useCases.filter((uc) => uc.quadrant === quadrant);

  const topVoted = [...useCases].sort((a, b) => b.votes - a.votes).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Impact vs Effort Prioritization</h1>
        <p className="text-neutral-600">
          Vote and prioritize skill development needs using the 2x2 impact-effort matrix.
        </p>
      </div>

      {/* Matrix */}
      <div className="card">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Quick Wins */}
          <div className={`p-6 rounded-lg border-2 ${quadrants['Quick Wins'].color} min-h-[300px]`}>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-neutral-900">{quadrants['Quick Wins'].title}</h3>
              <p className="text-sm text-neutral-600">{quadrants['Quick Wins'].desc}</p>
            </div>
            <div className="space-y-2">
              {getUseCasesByQuadrant('Quick Wins').map((uc) => (
                <div key={uc.id} className="bg-white p-3 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-neutral-900 text-sm">{uc.title}</h4>
                    <button
                      onClick={() => voteUseCase(uc.id)}
                      className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                      aria-label="Vote"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      {uc.votes}
                    </button>
                  </div>
                  <div className="text-xs text-neutral-600">
                    Impact: {uc.impact} | Effort: {uc.effort}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Bets */}
          <div className={`p-6 rounded-lg border-2 ${quadrants['Strategic Bets'].color} min-h-[300px]`}>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-neutral-900">{quadrants['Strategic Bets'].title}</h3>
              <p className="text-sm text-neutral-600">{quadrants['Strategic Bets'].desc}</p>
            </div>
            <div className="space-y-2">
              {getUseCasesByQuadrant('Strategic Bets').map((uc) => (
                <div key={uc.id} className="bg-white p-3 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-neutral-900 text-sm">{uc.title}</h4>
                    <button
                      onClick={() => voteUseCase(uc.id)}
                      className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                      aria-label="Vote"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      {uc.votes}
                    </button>
                  </div>
                  <div className="text-xs text-neutral-600">
                    Impact: {uc.impact} | Effort: {uc.effort}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fill-in Jobs */}
          <div className={`p-6 rounded-lg border-2 ${quadrants['Fill-in Jobs'].color} min-h-[300px]`}>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-neutral-900">{quadrants['Fill-in Jobs'].title}</h3>
              <p className="text-sm text-neutral-600">{quadrants['Fill-in Jobs'].desc}</p>
            </div>
            <div className="space-y-2">
              {getUseCasesByQuadrant('Fill-in Jobs').map((uc) => (
                <div key={uc.id} className="bg-white p-3 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-neutral-900 text-sm">{uc.title}</h4>
                    <button
                      onClick={() => voteUseCase(uc.id)}
                      className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                      aria-label="Vote"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      {uc.votes}
                    </button>
                  </div>
                  <div className="text-xs text-neutral-600">
                    Impact: {uc.impact} | Effort: {uc.effort}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Money Pits */}
          <div className={`p-6 rounded-lg border-2 ${quadrants['Money Pits'].color} min-h-[300px]`}>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-neutral-900">{quadrants['Money Pits'].title}</h3>
              <p className="text-sm text-neutral-600">{quadrants['Money Pits'].desc}</p>
            </div>
            <div className="space-y-2">
              {getUseCasesByQuadrant('Money Pits').map((uc) => (
                <div key={uc.id} className="bg-white p-3 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-neutral-900 text-sm">{uc.title}</h4>
                    <button
                      onClick={() => voteUseCase(uc.id)}
                      className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                      aria-label="Vote"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      {uc.votes}
                    </button>
                  </div>
                  <div className="text-xs text-neutral-600">
                    Impact: {uc.impact} | Effort: {uc.effort}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Axis Labels */}
        <div className="flex items-center justify-between text-sm text-neutral-600 mt-4">
          <div className="text-center flex-1">
            <p className="font-medium">← Lower Effort | Higher Effort →</p>
          </div>
        </div>
        <div className="text-center text-sm text-neutral-600 mt-2">
          <p className="font-medium">↑ Higher Impact | Lower Impact ↓</p>
        </div>
      </div>

      {/* Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-600" />
            Quadrant Distribution
          </h3>
          <div className="space-y-2">
            {Object.entries(quadrants).map(([key, data]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">{data.title}</span>
                <span className="font-bold text-neutral-900">{getUseCasesByQuadrant(key).length}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Top Voted Items</h3>
          <div className="space-y-3">
            {topVoted.map((uc, index) => (
              <div key={uc.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{uc.title}</p>
                  <p className="text-xs text-neutral-600">{uc.votes} votes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="card bg-gradient-to-r from-green-50 to-primary-50 border-green-200">
        <h3 className="text-lg font-bold text-neutral-900 mb-2">💡 Recommendation</h3>
        <p className="text-neutral-700">
          Focus on <span className="font-bold text-green-700">Quick Wins</span> first for immediate impact with minimal effort.
          Plan <span className="font-bold text-blue-700">Strategic Bets</span> for long-term value.
          Avoid <span className="font-bold text-red-700">Money Pits</span> that drain resources without meaningful returns.
        </p>
      </div>
    </div>
  );
};

export default Prioritization;
