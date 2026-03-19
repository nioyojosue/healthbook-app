'use client';

import { Sidebar } from '@/components/common/Sidebar';
import { Topbar } from '@/components/common/Topbar';
import { useAuth } from '@/lib/auth-context';

export function DashboardLayout({ children }) {
  const { user } = useAuth();

  // Only show layout for authenticated users in dashboard routes
  if (!user) {
    return <>{children}</>;
  }

  const isDashboard = typeof window !== 'undefined' && 
    window.location.pathname.includes('/dashboard') ||
    window.location.pathname.includes('/patient') ||
    window.location.pathname.includes('/doctor') ||
    window.location.pathname.includes('/hospital') ||
    window.location.pathname.includes('/admin') ||
    window.location.pathname.includes('/settings');

  if (!isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Topbar />
        <main className="mt-16 p-6">{children}</main>
      </div>
    </div>
  );
}
