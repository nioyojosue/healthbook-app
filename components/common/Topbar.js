'use client';

import Link from 'next/link';
import { Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-white border-b border-border z-20">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side */}
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-text capitalize">
            {user.role} Dashboard
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-background rounded-lg transition-colors">
            <Bell size={20} className="text-text-secondary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 p-2 hover:bg-background rounded-lg transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-text">{user.name}</p>
                <p className="text-xs text-text-secondary capitalize">
                  {user.role}
                </p>
              </div>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg p-2">
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-text hover:bg-background rounded-lg transition-colors"
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
