import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, Users as UsersIcon } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import Modal from '../components/Modal';
import type { Participant, AttendanceStatus } from '../types';

const Participants: React.FC = () => {
  const { participants, addParticipant, updateParticipant, removeParticipant, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Participant, 'id'>>({
    name: '',
    role: '',
    attendance: 'Present',
  });

  const handleOpenModal = (participant?: Participant) => {
    if (participant) {
      setEditingId(participant.id);
      setFormData({
        name: participant.name,
        role: participant.role,
        attendance: participant.attendance,
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', role: '', attendance: 'Present' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', role: '', attendance: 'Present' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateParticipant(editingId, { ...formData, id: editingId });
      showToast('Participant updated successfully!', 'success');
    } else {
      addParticipant({ ...formData, id: Date.now().toString() });
      showToast('Participant added successfully!', 'success');
    }
    handleCloseModal();
  };

  const handleRemove = (id: string) => {
    if (window.confirm('Are you sure you want to remove this participant?')) {
      removeParticipant(id);
      showToast('Participant removed successfully!', 'success');
    }
  };

  const presentCount = participants.filter((p) => p.attendance === 'Present').length;
  const optionalCount = participants.filter((p) => p.attendance === 'Optional').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Participants & Attendance</h1>
          <p className="text-neutral-600">Manage your onboarding team members and track attendance.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Participant
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-50 text-primary-700 rounded-lg">
              <UsersIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Participants</p>
              <p className="text-2xl font-bold text-neutral-900">{participants.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-700 rounded-lg">
              <UsersIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Present</p>
              <p className="text-2xl font-bold text-neutral-900">{presentCount}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neutral-100 text-neutral-700 rounded-lg">
              <UsersIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Optional</p>
              <p className="text-2xl font-bold text-neutral-900">{optionalCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Participants List */}
      <div className="card">
        {participants.length === 0 ? (
          <div className="text-center py-12">
            <UsersIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600 mb-4">No participants yet. Add your first participant to get started.</p>
            <button onClick={() => handleOpenModal()} className="btn-primary">
              <UserPlus className="w-4 h-4 inline mr-2" />
              Add Participant
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-neutral-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-900">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-900">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-900">Attendance</th>
                  <th className="text-right py-3 px-4 font-semibold text-neutral-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-neutral-900">{participant.name}</td>
                    <td className="py-3 px-4 text-neutral-600">{participant.role}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`badge ${
                          participant.attendance === 'Present' ? 'badge-green' : 'badge-neutral'
                        }`}
                      >
                        {participant.attendance}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(participant)}
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                          aria-label="Edit participant"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemove(participant.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          aria-label="Remove participant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Participant' : 'Add Participant'}
        footer={
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleCloseModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" form="participant-form" className="btn-primary">
              {editingId ? 'Save Changes' : 'Add Participant'}
            </button>
          </div>
        }
      >
        <form id="participant-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">
              Name
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

          <div>
            <label htmlFor="role" className="label">
              Role
            </label>
            <input
              type="text"
              id="role"
              className="input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="label">Attendance Status</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="Present"
                  checked={formData.attendance === 'Present'}
                  onChange={(e) =>
                    setFormData({ ...formData, attendance: e.target.value as AttendanceStatus })
                  }
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Present</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="Optional"
                  checked={formData.attendance === 'Optional'}
                  onChange={(e) =>
                    setFormData({ ...formData, attendance: e.target.value as AttendanceStatus })
                  }
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Optional</span>
              </label>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Participants;
