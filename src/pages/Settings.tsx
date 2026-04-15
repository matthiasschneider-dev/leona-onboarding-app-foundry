import React, { useState } from 'react';
import { Save, Package, RotateCcw, Download, Upload } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import Modal from '../components/Modal';
import type { PackageEntry } from '../types';

const Settings: React.FC = () => {
  const { brand, updateBrand, loadScenario, resetDemo, showToast } = useApp();
  const [brandData, setBrandData] = useState(brand);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  const handleSaveBrand = () => {
    updateBrand(brandData);
    showToast('Branding updated successfully!', 'success');
  };

  const handleLoadScenario = (packageEntry: PackageEntry) => {
    if (window.confirm(`Load ${packageEntry} scenario? This will replace current data.`)) {
      loadScenario(packageEntry);
      showToast(`${packageEntry} scenario loaded!`, 'success');
    }
  };

  const handleResetDemo = () => {
    resetDemo();
    setShowResetConfirm(false);
    showToast('Demo session reset to default state!', 'success');
  };

  const scenarios = [
    {
      name: 'STARTER',
      duration: '45 min',
      participants: 3,
      features: ['Basic assembly plan', 'Work readiness checklist', 'Essential safety training'],
    },
    {
      name: 'ENABLED',
      duration: '60 min',
      participants: 4,
      features: ['Comprehensive plan', 'Impact-effort matrix', 'Full certification path', 'Mentor pairing'],
    },
    {
      name: 'MASTER',
      duration: '90 min',
      participants: 5,
      features: ['Executive oversight', 'Career roadmap', 'Advanced training', 'Leadership development', 'Full compliance'],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Settings & Configuration</h1>
        <p className="text-neutral-600">Customize your onboarding platform and manage demo data.</p>
      </div>

      {/* Branding Customization */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Branding Customization</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="logoText" className="label">Logo Text</label>
            <input
              type="text"
              id="logoText"
              className="input"
              value={brandData.logoText}
              onChange={(e) => setBrandData({ ...brandData, logoText: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="customerName" className="label">Customer Name</label>
            <input
              type="text"
              id="customerName"
              className="input"
              value={brandData.customerName}
              onChange={(e) => setBrandData({ ...brandData, customerName: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={brandData.darkMode}
                onChange={(e) => setBrandData({ ...brandData, darkMode: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                disabled
              />
              <span className="text-sm text-neutral-700">
                Dark Mode <span className="text-neutral-400">(Coming soon)</span>
              </span>
            </label>
          </div>

          <button onClick={handleSaveBrand} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Update Brand
          </button>
        </div>
      </div>

      {/* Demo Scenarios */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Package className="w-6 h-6 text-primary-600" />
          Demo Scenarios
        </h2>
        <p className="text-neutral-600 mb-6">
          Quick-start with pre-configured scenarios. Each scenario includes sample data tailored to different complexity levels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario) => (
            <div
              key={scenario.name}
              className="border-2 border-neutral-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{scenario.name}</h3>
              <div className="space-y-1 text-sm text-neutral-600 mb-4">
                <p>⏱️ Duration: {scenario.duration}</p>
                <p>👥 Participants: {scenario.participants}</p>
                <div className="mt-2">
                  <p className="font-medium text-neutral-700 mb-1">Key Features:</p>
                  <ul className="space-y-1">
                    {scenario.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-primary-600">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleLoadScenario(scenario.name as PackageEntry)}
                className="btn-secondary w-full"
              >
                Load {scenario.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Data Management</h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <RotateCcw className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-neutral-900 mb-1">Reset Demo Session</h3>
              <p className="text-sm text-neutral-600">
                Restore all data to default ENABLED scenario. This action cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="btn-destructive whitespace-nowrap"
            >
              Reset Demo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setShowFeatureModal(true)}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button
              onClick={() => setShowFeatureModal(true)}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Import Data
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">About</h2>
        <div className="space-y-3 text-sm text-neutral-700">
          <p>
            <span className="font-medium">Version:</span> 1.0.0
          </p>
          <p>
            <span className="font-medium">Built with:</span> Vite, React, TypeScript, Tailwind CSS
          </p>
          <p>
            <span className="font-medium">Purpose:</span> Comprehensive electrotechnician onboarding management platform
          </p>
          <div className="pt-4 border-t border-primary-200">
            <p className="text-xs font-bold">
              <span className="icon-gradient-purple">✨ Built by Leona - Vibe coding Agent from HCL Software</span>
            </p>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Confirm Reset"
        footer={
          <div className="flex items-center gap-3">
            <button onClick={() => setShowResetConfirm(false)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleResetDemo} className="btn-destructive">
              Yes, Reset Demo
            </button>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-neutral-700 mb-4">
            Are you sure you want to reset the demo session? This will:
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span>Restore all data to the default ENABLED scenario</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span>Remove any custom participants, actions, and use cases you've added</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span>Reset all configuration settings (branding will be preserved)</span>
            </li>
          </ul>
          <p className="text-neutral-700 mt-4 font-medium">This action cannot be undone.</p>
        </div>
      </Modal>

      {/* Feature Coming Soon Modal */}
      <Modal
        isOpen={showFeatureModal}
        onClose={() => setShowFeatureModal(false)}
        title="Feature Coming Soon"
        footer={
          <button onClick={() => setShowFeatureModal(false)} className="btn-primary">
            Close
          </button>
        }
      >
        <div className="text-center py-8">
          <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-700">This feature is available in the full version.</p>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
