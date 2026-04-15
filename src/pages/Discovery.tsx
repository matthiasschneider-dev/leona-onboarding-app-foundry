import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Lightbulb } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import Modal from '../components/Modal';
import type { UseCase, Quadrant } from '../types';

const Discovery: React.FC = () => {
  const { useCases, addUseCase, updateUseCase, removeUseCase, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Omit<UseCase, 'id' | 'quadrant' | 'votes'>>({
    title: '',
    cluster: '',
    who: '',
    problem: '',
    impact: 5,
    effort: 5,
    processes: '',
  });

  const calculateQuadrant = (impact: number, effort: number): Quadrant => {
    if (impact >= 7 && effort <= 5) return 'Quick Wins';
    if (impact >= 7 && effort > 5) return 'Strategic Bets';
    if (impact < 7 && effort <= 5) return 'Fill-in Jobs';
    return 'Money Pits';
  };

  const handleOpenModal = (useCase?: UseCase) => {
    if (useCase) {
      setEditingId(useCase.id);
      setFormData({
        title: useCase.title,
        cluster: useCase.cluster,
        who: useCase.who,
        problem: useCase.problem,
        impact: useCase.impact,
        effort: useCase.effort,
        processes: useCase.processes || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        cluster: '',
        who: '',
        problem: '',
        impact: 5,
        effort: 5,
        processes: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quadrant = calculateQuadrant(formData.impact, formData.effort);

    if (editingId) {
      const existing = useCases.find((uc) => uc.id === editingId);
      updateUseCase(editingId, { ...formData, id: editingId, quadrant, votes: existing?.votes || 0 });
      showToast('Skill development need updated!', 'success');
    } else {
      addUseCase({ ...formData, id: Date.now().toString(), quadrant, votes: 0 });
      showToast('Skill development need added!', 'success');
    }
    handleCloseModal();
  };

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this skill development need?')) {
      removeUseCase(id);
      showToast('Skill development need removed!', 'success');
    }
  };

  const filteredUseCases = useCases.filter(
    (uc) =>
      uc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uc.cluster.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quadrantColors = {
    'Quick Wins': 'badge-green',
    'Strategic Bets': 'badge-blue',
    'Fill-in Jobs': 'badge-neutral',
    'Money Pits': 'badge-red',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Skills Discovery & Identification</h1>
          <p className="text-neutral-600">Identify and prioritize skill development needs for your team.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Skill Need
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by title or cluster..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Use Cases Grid */}
      {filteredUseCases.length === 0 ? (
        <div className="card text-center py-12">
          <Lightbulb className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-600 mb-4">No skill development needs found. Add your first one to get started.</p>
          <button onClick={() => handleOpenModal()} className="btn-primary">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Skill Need
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUseCases.map((useCase) => (
            <div key={useCase.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-primary-700">{useCase.title}</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(useCase)}
                    className="text-neutral-400 hover:text-primary-600 transition-colors"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(useCase.id)}
                    className="text-neutral-400 hover:text-red-600 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <span className="badge badge-primary mb-3">{useCase.cluster}</span>

              <div className="space-y-2 text-sm mb-4">
                <p>
                  <span className="font-medium text-neutral-700">Who:</span>{' '}
                  <span className="text-neutral-600">{useCase.who}</span>
                </p>
                <p className="text-neutral-600">{useCase.problem}</p>
              </div>

              <div className="flex items-center gap-4 mb-3 text-sm">
                <div>
                  <span className="font-medium text-neutral-700">Impact:</span>{' '}
                  <span className="text-neutral-900 font-bold">{useCase.impact}/10</span>
                </div>
                <div>
                  <span className="font-medium text-neutral-700">Effort:</span>{' '}
                  <span className="text-neutral-900 font-bold">{useCase.effort}/10</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <span className={`badge ${quadrantColors[useCase.quadrant]}`}>
                  {useCase.quadrant}
                </span>
                <span className="text-sm text-neutral-600">{useCase.votes} votes</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Skill Development Need' : 'Add Skill Development Need'}
        footer={
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleCloseModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" form="usecase-form" className="btn-primary">
              {editingId ? 'Save Changes' : 'Add Need'}
            </button>
          </div>
        }
      >
        <form id="usecase-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="label">Title</label>
            <input
              type="text"
              id="title"
              className="input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="cluster" className="label">Cluster</label>
            <input
              type="text"
              id="cluster"
              className="input"
              value={formData.cluster}
              onChange={(e) => setFormData({ ...formData, cluster: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="who" className="label">Who</label>
            <input
              type="text"
              id="who"
              className="input"
              value={formData.who}
              onChange={(e) => setFormData({ ...formData, who: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="problem" className="label">Problem Statement</label>
            <textarea
              id="problem"
              className="input min-h-[100px]"
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="impact" className="label">
                Impact (1-10): {formData.impact}
              </label>
              <input
                type="range"
                id="impact"
                min="1"
                max="10"
                className="w-full"
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label htmlFor="effort" className="label">
                Effort (1-10): {formData.effort}
              </label>
              <input
                type="range"
                id="effort"
                min="1"
                max="10"
                className="w-full"
                value={formData.effort}
                onChange={(e) => setFormData({ ...formData, effort: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="label">Auto-calculated Quadrant</label>
            <span className={`badge ${quadrantColors[calculateQuadrant(formData.impact, formData.effort)]}`}>
              {calculateQuadrant(formData.impact, formData.effort)}
            </span>
          </div>

          <div>
            <label htmlFor="processes" className="label">Related Processes (optional)</label>
            <textarea
              id="processes"
              className="input min-h-[80px]"
              value={formData.processes}
              onChange={(e) => setFormData({ ...formData, processes: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Discovery;
