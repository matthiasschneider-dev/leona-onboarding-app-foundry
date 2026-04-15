import React, { useState } from 'react';
import { Save, Package } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import type { OnboardingFormat, PackageEntry } from '../types';

const Setup: React.FC = () => {
  const { onboardingActivity, updateOnboardingActivity, loadScenario, showToast } = useApp();

  const [formData, setFormData] = useState(onboardingActivity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateOnboardingActivity(formData);
    showToast('Configuration saved successfully!', 'success');
  };

  const handleLoadScenario = (packageEntry: PackageEntry) => {
    if (window.confirm(`Load ${packageEntry} scenario? This will replace current data.`)) {
      loadScenario(packageEntry);
      setFormData((prev) => ({ ...prev, packageEntry }));
      showToast(`${packageEntry} scenario loaded successfully!`, 'success');
    }
  };

  const packageDescriptions = {
    STARTER: '45 min - Perfect for small teams with basic onboarding needs',
    ENABLED: '60 min - Standard deliverables with full workshop experience',
    MASTER: '90 min - Comprehensive program with executive oversight and sign-off',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Onboarding Setup & Configuration</h1>
        <p className="text-neutral-600">
          Define your program parameters and expected outcomes. Configure the foundation for measurable success.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        <h2 className="text-xl font-bold text-neutral-900 border-b border-neutral-200 pb-3">
          Program Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Program Name */}
          <div>
            <label htmlFor="name" className="label">
              Program Name
            </label>
            <input
              type="text"
              id="name"
              className="input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Lead Mentor */}
          <div>
            <label htmlFor="mentor" className="label">
              Lead Mentor
            </label>
            <input
              type="text"
              id="mentor"
              className="input"
              value={formData.mentor}
              onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
              required
            />
          </div>

          {/* Format */}
          <div>
            <label htmlFor="format" className="label">
              Onboarding Format
            </label>
            <select
              id="format"
              className="input"
              value={formData.format}
              onChange={(e) =>
                setFormData({ ...formData, format: e.target.value as OnboardingFormat })
              }
              required
            >
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Package Level */}
          <div>
            <label htmlFor="package" className="label">
              Package Level
            </label>
            <select
              id="package"
              className="input"
              value={formData.packageEntry}
              onChange={(e) =>
                setFormData({ ...formData, packageEntry: e.target.value as PackageEntry })
              }
              required
            >
              <option value="STARTER">STARTER</option>
              <option value="ENABLED">ENABLED</option>
              <option value="MASTER">MASTER</option>
            </select>
            <p className="text-xs text-neutral-500 mt-1">
              {packageDescriptions[formData.packageEntry]}
            </p>
          </div>

          {/* Duration */}
          <div className="md:col-span-2">
            <label htmlFor="duration" className="label">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              className="input"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })
              }
              min="30"
              max="180"
              required
            />
          </div>
        </div>

        {/* Expected Outputs */}
        <div>
          <label htmlFor="outputs" className="label">
            Expected Outputs (one per line)
          </label>
          <textarea
            id="outputs"
            className="input min-h-[120px]"
            value={formData.outputs.join('\n')}
            onChange={(e) =>
              setFormData({ ...formData, outputs: e.target.value.split('\n').filter(Boolean) })
            }
            placeholder="Assembly plan&#10;Impact-effort matrix&#10;Work readiness assessment"
          />
        </div>

        {/* Known Constraints */}
        <div>
          <label htmlFor="constraints" className="label">
            Known Constraints (one per line)
          </label>
          <textarea
            id="constraints"
            className="input min-h-[120px]"
            value={formData.constraints.join('\n')}
            onChange={(e) =>
              setFormData({
                ...formData,
                constraints: e.target.value.split('\n').filter(Boolean),
              })
            }
            placeholder="Union guidelines&#10;Safety protocols&#10;Budget constraints"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </form>

      {/* Load Scenario Section */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Package className="w-6 h-6 text-primary-600" />
          Load Demo Scenario
        </h2>
        <p className="text-neutral-600 mb-6">
          Quick-start with pre-configured scenarios tailored to different team sizes and complexity levels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['STARTER', 'ENABLED', 'MASTER'] as PackageEntry[]).map((pkg) => (
            <div
              key={pkg}
              className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{pkg}</h3>
              <p className="text-sm text-neutral-600 mb-4">{packageDescriptions[pkg]}</p>
              <button
                type="button"
                onClick={() => handleLoadScenario(pkg)}
                className="btn-secondary w-full"
              >
                Load {pkg}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Setup;
