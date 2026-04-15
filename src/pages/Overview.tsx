import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../lib/AppContext';
import { phases } from '../data/mockData';

const readinessData = [
  { week: 'Week 1', readiness: 25 },
  { week: 'Week 2', readiness: 40 },
  { week: 'Week 3', readiness: 60 },
  { week: 'Week 4', readiness: 85 },
  { week: 'Week 5', readiness: 95 },
];

const Overview: React.FC = () => {
  const { onboardingActivity, actions, useCases, participants } = useApp();

  const completedActions = actions.filter((a) => a.done).length;
  const totalActions = actions.length;
  const workReadiness = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  const stats = [
    {
      label: 'Onboarding Duration',
      value: `${onboardingActivity.duration} min`,
      icon: Clock,
      color: 'primary',
    },
    {
      label: 'Work Readiness',
      value: `${workReadiness}%`,
      icon: TrendingUp,
      color: 'accent',
    },
    {
      label: 'Onboarding Steps',
      value: useCases.length.toString(),
      icon: CheckCircle,
      color: 'green',
    },
    {
      label: 'Team Members',
      value: participants.length.toString(),
      icon: Users,
      color: 'blue',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary-50 text-primary-700',
    accent: 'bg-accent-50 text-accent-700',
    green: 'bg-green-50 text-green-700',
    blue: 'bg-blue-50 text-blue-700',
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white p-8 lg:p-12">
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Our New Onboarding Magic
          </h1>
          <p className="text-xl lg:text-2xl text-primary-100 mb-2">
            From vision to reality in 30 days
          </p>
          <p className="text-primary-50 max-w-2xl mb-8">
            Empower your new electrotechnicians with a comprehensive, measurable onboarding experience
            that transforms beginners into certified professionals through proven methodologies and expert mentorship.
          </p>
          <Link
            to="/setup"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Readiness Trajectory Chart */}
      <div className="card">
        <h2 className="section-heading">Work Readiness Trajectory</h2>
        <p className="section-description">
          Projected skill development and certification progress over the 5-week onboarding period
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={readinessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="readiness"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Phase Timeline */}
      <div>
        <h2 className="section-heading">Onboarding Phase Timeline</h2>
        <p className="section-description">
          Structured journey from documentation to full certification
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {phases.map((phase, index) => {
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-800',
              purple: 'bg-purple-100 text-purple-800',
              accent: 'bg-accent-100 text-accent-800',
              green: 'bg-green-100 text-green-800',
              amber: 'bg-amber-100 text-amber-800',
            };

            return (
              <div key={phase.id} className="card">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge ${colorClasses[phase.color as keyof typeof colorClasses]}`}>
                    Phase {index + 1}
                  </span>
                  <span className="text-xs text-neutral-500">{phase.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{phase.name}</h3>
                <p className="text-sm text-neutral-600">{phase.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="card bg-gradient-to-r from-neutral-50 to-primary-50 border-primary-200">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Ready to Get Started?</h3>
            <p className="text-neutral-600">
              Configure your onboarding program and build your action plan today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/setup" className="btn-primary whitespace-nowrap">
              Configure Your Program
            </Link>
            <Link to="/actions" className="btn-secondary whitespace-nowrap">
              View Action Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Leona Attribution */}
      <div className="flex justify-center">
        <p className="text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-md shadow-lg border-l-4 border-purple-400 animate-pulse bg-white">
          <span className="icon-gradient-purple">✨ Built by Leona - Vibe coding Agent from HCL Software</span>
        </p>
      </div>
    </div>
  );
};

export default Overview;
