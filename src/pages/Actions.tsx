import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, User, CheckSquare } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import Modal from '../components/Modal';
import type { Action } from '../types';

const Actions: React.FC = () => {
  const { actions, addAction, updateAction, removeAction, toggleActionDone, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [formData, setFormData] = useState<Omit<Action, 'id'>>({
    task: '',
    owner: '',
    dueDate: '',
    done: false,
  });

  const handleOpenModal = (action?: Action) => {
    if (action) {
      setEditingId(action.id);
      setFormData({
        task: action.task,
        owner: action.owner,
        dueDate: action.dueDate,
        done: action.done,
      });
    } else {
      setEditingId(null);
      setFormData({ task: '', owner: '', dueDate: '', done: false });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAction(editingId, { ...formData, id: editingId });
      showToast('Action updated!', 'success');
    } else {
      addAction({ ...formData, id: Date.now().toString() });
      showToast('Action added!', 'success');
    }
    handleCloseModal();
  };

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this action?')) {
      removeAction(id);
      showToast('Action removed!', 'success');
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getDueDateColor = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return 'text-red-600';
    if (days <= 2) return 'text-red-600';
    if (days <= 7) return 'text-amber-600';
    return 'text-green-600';
  };

  const filteredActions = actions.filter((action) => {
    if (filter === 'active') return !action.done;
    if (filter === 'completed') return action.done;
    return true;
  });

  const completedCount = actions.filter((a) => a.done).length;
  const progressPercentage = actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0;
  const overdueCount = actions.filter((a) => !a.done && getDaysUntilDue(a.dueDate) < 0).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Action Plan & Task Tracking</h1>
          <p className="text-neutral-600">Manage and track onboarding action items and deadlines.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Action
        </button>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm font-medium text-neutral-600 mb-2">Overall Progress</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-neutral-200 rounded-full h-3 mb-2">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-neutral-600">
                {completedCount} of {actions.length} completed
              </p>
            </div>
            <p className="text-3xl font-bold text-primary-600">{progressPercentage}%</p>
          </div>
        </div>

        <div className="card">
          <p className="text-sm font-medium text-neutral-600 mb-2">Upcoming (Next 7 Days)</p>
          <p className="text-3xl font-bold text-neutral-900">
            {actions.filter((a) => !a.done && getDaysUntilDue(a.dueDate) >= 0 && getDaysUntilDue(a.dueDate) <= 7).length}
          </p>
        </div>

        <div className="card">
          <p className="text-sm font-medium text-neutral-600 mb-2">Overdue</p>
          <p className="text-3xl font-bold text-red-600">{overdueCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {(['all', 'active', 'completed'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === filterOption
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Actions List */}
      <div className="card">
        {filteredActions.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600 mb-4">No actions found. Add your first action to get started.</p>
            <button onClick={() => handleOpenModal()} className="btn-primary">
              <Plus className="w-4 h-4 inline mr-2" />
              Add Action
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredActions.map((action) => {
              const daysUntil = getDaysUntilDue(action.dueDate);
              const dateColor = getDueDateColor(action.dueDate);

              return (
                <div
                  key={action.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    action.done ? 'border-neutral-200 bg-neutral-50' : 'border-neutral-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={action.done}
                    onChange={() => toggleActionDone(action.id)}
                    className="w-6 h-6 mt-1 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"
                  />

                  <div className="flex-1">
                    <p className={`font-medium text-neutral-900 mb-2 ${action.done ? 'line-through text-neutral-500' : ''}`}>
                      {action.task}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {action.owner}
                      </span>
                      <span className={`flex items-center gap-1 ${dateColor}`}>
                        <Calendar className="w-4 h-4" />
                        {action.dueDate}
                        {!action.done && (
                          <span className="ml-1">
                            ({daysUntil < 0 ? `${Math.abs(daysUntil)}d overdue` : `${daysUntil}d remaining`})
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(action)}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                      aria-label="Edit action"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemove(action.id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                      aria-label="Remove action"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Action' : 'Add Action'}
        footer={
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleCloseModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" form="action-form" className="btn-primary">
              {editingId ? 'Save Changes' : 'Add Action'}
            </button>
          </div>
        }
      >
        <form id="action-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task" className="label">Task Description</label>
            <textarea
              id="task"
              className="input min-h-[100px]"
              value={formData.task}
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="owner" className="label">Owner</label>
            <input
              type="text"
              id="owner"
              className="input"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="label">Due Date</label>
            <input
              type="date"
              id="dueDate"
              className="input"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          {editingId && (
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.done}
                  onChange={(e) => setFormData({ ...formData, done: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Mark as completed</span>
              </label>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default Actions;
