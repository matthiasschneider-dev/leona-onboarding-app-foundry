import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Users,
  UserCheck,
  Target,
  Lightbulb,
  Grid3x3,
  Palette,
  CheckSquare,
  Calendar,
  Menu,
} from 'lucide-react';
import { useApp } from '../lib/AppContext';
import Toast from './Toast';

const navigation = [
  { name: 'Home', path: '/', icon: LayoutDashboard },
  { name: 'Setup', path: '/setup', icon: Settings },
  { name: 'Participants', path: '/participants', icon: Users },
  { name: 'Mentors', path: '/mentors', icon: UserCheck },
  { name: 'Reality Check', path: '/reality-check', icon: Target },
  { name: 'Discovery', path: '/discovery', icon: Lightbulb },
  { name: 'Prioritization', path: '/prioritization', icon: Grid3x3 },
  { name: 'Canvas', path: '/canvas', icon: Palette },
  { name: 'Actions', path: '/actions', icon: CheckSquare },
  { name: 'Schedule', path: '/schedule', icon: Calendar },
];

const Layout = () => {
  const location = useLocation();
  const { brand, toast, showToast } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => showToast('', 'info')}
        />
      )}

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 lg:w-[456px] bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-200">
          <img
            src="https://manufacturing.woodburn.digital/dx/api/dam/v1/collections/bbefe6ff-458f-436e-a810-a78d28ab5317/items/3826839a-5f1f-4add-8429-c6b674ea3cbc/renditions/949a3c91-3f46-48c7-bc13-fe12c604ed95?binary=true"
            alt={brand.logoText}
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="text-lg font-bold text-neutral-900">{brand.logoText}</h1>
            <p className="text-xs text-neutral-500">Onboarding Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Settings link at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-neutral-200">
          <Link
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === '/settings'
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-[456px]">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 px-4 py-3 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-neutral-700 hover:text-neutral-900"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src="https://manufacturing.woodburn.digital/dx/api/dam/v1/collections/bbefe6ff-458f-436e-a810-a78d28ab5317/items/3826839a-5f1f-4add-8429-c6b674ea3cbc/renditions/949a3c91-3f46-48c7-bc13-fe12c604ed95?binary=true"
                alt={brand.logoText}
                className="w-16 h-16 object-contain"
              />
              <h1 className="text-lg font-bold text-neutral-900">{brand.logoText}</h1>
            </div>
            <div className="w-6" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
