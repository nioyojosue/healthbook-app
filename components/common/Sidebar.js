'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { NAVIGATION, BOTTOM_NAVIGATION } from '@/lib/navigation';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const navItems = NAVIGATION[user.role] || [];

  const isActive = (href, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleNavClick = (item) => {
    if (item.action === 'logout') {
      logout();
      router.push('/login');
      return;
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border z-40 transform transition-transform duration-300 md:transform-none md:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HB</span>
              </div>
              <span className="font-bold text-lg text-text">HealthBook</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-background'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-border px-4 py-4 space-y-2">
            {BOTTOM_NAVIGATION.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-background'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
