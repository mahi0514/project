import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  User, 
  Search, 
  History, 
  Users, 
  Activity, 
  FileText,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  if (!user) return null;

  const links = {
    college: [
      { name: 'Dashboard', href: '/college/dashboard', icon: LayoutDashboard },
      { name: 'Create Event', href: '/college/create-event', icon: PlusCircle },
      { name: 'My Events', href: '/college/events', icon: Calendar },
      { name: 'Requests', href: '/college/requests', icon: MessageSquare },
      { name: 'Payments', href: '/college/payments', icon: CreditCard },
      { name: 'Profile', href: '/college/profile', icon: User },
    ],
    sponsor: [
      { name: 'Dashboard', href: '/sponsor/dashboard', icon: LayoutDashboard },
      { name: 'Browse Events', href: '/sponsor/browse', icon: Search },
      { name: 'History', href: '/sponsor/history', icon: History },
      { name: 'Profile', href: '/sponsor/profile', icon: User },
    ],
    admin: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Manage Users', href: '/admin/users', icon: Users },
      { name: 'Manage Events', href: '/admin/events', icon: Calendar },
      { name: 'Monitoring', href: '/admin/monitoring', icon: Activity },
      { name: 'Reports', href: '/admin/reports', icon: FileText },
    ],
    guest: []
  };

  const currentLinks = links[user.role] || [];

  return (
    <div className="flex flex-col h-full w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <span className="text-2xl font-bold text-blue-500">Sponza</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {currentLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center mb-4">
          <img
            className="h-8 w-8 rounded-full"
            src={user.avatar}
            alt={user.name}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-400 rounded-md hover:bg-gray-800 hover:text-red-300"
        >
          <LogOut className="mr-3 h-6 w-6" />
          Logout
        </button>
      </div>
    </div>
  );
};
