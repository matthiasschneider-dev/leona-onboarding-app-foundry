import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useApp } from '../lib/AppContext';

const Schedule: React.FC = () => {
  const { shifts } = useApp();

  const statusColors = {
    'Scheduled': 'badge-blue',
    'In Progress': 'badge-amber',
    'Completed': 'badge-green',
  };

  // Group shifts by date
  const shiftsByDate = shifts.reduce((acc, shift) => {
    if (!acc[shift.date]) {
      acc[shift.date] = { Morning: null, Afternoon: null, Evening: null };
    }
    acc[shift.date][shift.shift] = shift;
    return acc;
  }, {} as Record<string, Record<string, any>>);

  const dates = Object.keys(shiftsByDate).sort();

  const totalShifts = shifts.length;
  const completedShifts = shifts.filter((s) => s.status === 'Completed').length;
  const completionRate = totalShifts > 0 ? Math.round((completedShifts / totalShifts) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Training Shift Schedule</h1>
        <p className="text-neutral-600">2-week rotation calendar for supervised hands-on training.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-50 text-primary-700 rounded-lg">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Shifts</p>
              <p className="text-2xl font-bold text-neutral-900">{totalShifts}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-700 rounded-lg">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Completed</p>
              <p className="text-2xl font-bold text-neutral-900">{completedShifts}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent-50 text-accent-700 rounded-lg">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Completion Rate</p>
              <p className="text-2xl font-bold text-neutral-900">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="text-sm font-bold text-neutral-900 mb-3">Status Legend</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="badge badge-blue">Scheduled</span>
            <span className="text-sm text-neutral-600">- Shift planned</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-amber">In Progress</span>
            <span className="text-sm text-neutral-600">- Currently active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-green">Completed</span>
            <span className="text-sm text-neutral-600">- Shift finished</span>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b-2 border-neutral-200">
            <tr>
              <th className="text-left py-3 px-4 font-bold text-neutral-900">Date</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-900">
                Morning<br />
                <span className="text-xs font-normal text-neutral-500">(6am-2pm)</span>
              </th>
              <th className="text-left py-3 px-4 font-bold text-neutral-900">
                Afternoon<br />
                <span className="text-xs font-normal text-neutral-500">(2pm-10pm)</span>
              </th>
              <th className="text-left py-3 px-4 font-bold text-neutral-900">
                Evening<br />
                <span className="text-xs font-normal text-neutral-500">(10pm-6am)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => {
              const dateObj = new Date(date);
              const formattedDate = dateObj.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              });

              return (
                <tr
                  key={date}
                  className={`border-b border-neutral-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-neutral-900">{formattedDate}</td>
                  {['Morning', 'Afternoon', 'Evening'].map((shiftType) => {
                    const shift = shiftsByDate[date][shiftType];
                    return (
                      <td key={shiftType} className="py-3 px-4">
                        {shift ? (
                          <div>
                            <p className="text-sm font-medium text-neutral-900 mb-1">
                              {shift.participantName}
                            </p>
                            <span className={`badge ${statusColors[shift.status as keyof typeof statusColors]}`}>
                              {shift.status}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-neutral-400">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
