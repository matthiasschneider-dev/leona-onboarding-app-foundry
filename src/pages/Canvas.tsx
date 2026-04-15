import React, { useState } from 'react';
import { Save, FileText, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import Modal from '../components/Modal';

const Canvas: React.FC = () => {
  const { canvas, updateCanvas, showToast } = useApp();
  const [formData, setFormData] = useState(canvas);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleSave = () => {
    updateCanvas(formData);
    showToast('Canvas saved successfully!', 'success');
  };

  const handleAddMetric = () => {
    const newMetric = {
      id: Date.now().toString(),
      kpi: '',
      baseline: '',
      target: '',
    };
    setFormData({ ...formData, metrics: [...formData.metrics, newMetric] });
  };

  const handleUpdateMetric = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    });
  };

  const handleRemoveMetric = (id: string) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((m) => m.id !== id),
    });
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      id: Date.now().toString(),
      month: '',
      description: '',
    };
    setFormData({ ...formData, timeline: [...formData.timeline, newMilestone] });
  };

  const handleUpdateMilestone = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      timeline: formData.timeline.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    });
  };

  const handleRemoveMilestone = (id: string) => {
    setFormData({
      ...formData,
      timeline: formData.timeline.filter((m) => m.id !== id),
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Development Canvas & Planning</h1>
          <p className="text-neutral-600">Comprehensive skill development blueprint and execution plan.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Canvas
          </button>
          <button onClick={() => setShowExportModal(true)} className="btn-secondary flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Core Information */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Core Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Skill/Focus Area</label>
            <input
              type="text"
              className="input"
              value={formData.skill}
              onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Assigned Mentor</label>
            <input
              type="text"
              className="input"
              value={formData.mentor}
              onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Success Metrics</h2>
          <button onClick={handleAddMetric} className="btn-secondary btn-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Metric
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="text-left py-2 px-2 font-semibold text-neutral-900">KPI</th>
                <th className="text-left py-2 px-2 font-semibold text-neutral-900">Baseline</th>
                <th className="text-left py-2 px-2 font-semibold text-neutral-900">Target</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {formData.metrics.map((metric) => (
                <tr key={metric.id} className="border-b border-neutral-100">
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      className="input"
                      value={metric.kpi}
                      onChange={(e) => handleUpdateMetric(metric.id, 'kpi', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      className="input"
                      value={metric.baseline}
                      onChange={(e) => handleUpdateMetric(metric.id, 'baseline', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      className="input"
                      value={metric.target}
                      onChange={(e) => handleUpdateMetric(metric.id, 'target', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => handleRemoveMetric(metric.id)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Remove metric"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope Definition */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Scope Definition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Scope In (What's included)</label>
            <textarea
              className="input min-h-[120px]"
              value={formData.scopeIn}
              onChange={(e) => setFormData({ ...formData, scopeIn: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Scope Out (What's excluded)</label>
            <textarea
              className="input min-h-[120px]"
              value={formData.scopeOut}
              onChange={(e) => setFormData({ ...formData, scopeOut: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Solution Approach */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Solution Approach</h2>
        <textarea
          className="input min-h-[150px]"
          value={formData.solution}
          onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
          placeholder="Describe how you'll achieve the development goals..."
        />
      </div>

      {/* Timeline & Milestones */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Timeline & Milestones</h2>
          <button onClick={handleAddMilestone} className="btn-secondary btn-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="text-left py-2 px-2 font-semibold text-neutral-900">Month/Week</th>
                <th className="text-left py-2 px-2 font-semibold text-neutral-900">Description</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {formData.timeline.map((milestone) => (
                <tr key={milestone.id} className="border-b border-neutral-100">
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      className="input"
                      value={milestone.month}
                      onChange={(e) => handleUpdateMilestone(milestone.id, 'month', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      className="input"
                      value={milestone.description}
                      onChange={(e) => handleUpdateMilestone(milestone.id, 'description', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => handleRemoveMilestone(milestone.id)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Remove milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resources Required */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Resources Required</h2>
        <textarea
          className="input min-h-[120px]"
          value={formData.resources}
          onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
          placeholder="List people, tools, budget, and other resources..."
        />
      </div>

      {/* Risks & Mitigation */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Risks & Mitigation</h2>
        <textarea
          className="input min-h-[120px]"
          value={formData.risks}
          onChange={(e) => setFormData({ ...formData, risks: e.target.value })}
          placeholder="Identify risks and how to mitigate them..."
        />
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export to PDF"
        footer={
          <button onClick={() => setShowExportModal(false)} className="btn-primary">
            Close
          </button>
        }
      >
        <div className="text-center py-8">
          <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-700">PDF export functionality available in the full version.</p>
        </div>
      </Modal>
    </div>
  );
};

export default Canvas;
