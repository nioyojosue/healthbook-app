'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Settings</h1>

      <div className="grid gap-6">
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-lg border border-border">
          <h2 className="text-xl font-bold text-text mb-6">Profile Settings</h2>
          <div className="flex items-center gap-6 mb-8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold text-text">{user.name}</p>
              <p className="text-text-secondary capitalize">{user.role}</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Account Settings */}
        <div className="bg-white p-8 rounded-lg border border-border">
          <h2 className="text-xl font-bold text-text mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-border">
              <span className="text-text-secondary">Email</span>
              <span className="font-medium text-text">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-border">
              <span className="text-text-secondary">Role</span>
              <span className="font-medium text-text capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-text-secondary">Change Password</span>
              <button className="text-primary font-medium hover:underline">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white p-8 rounded-lg border border-border">
          <h2 className="text-xl font-bold text-text mb-6">Logout</h2>
          <p className="text-text-secondary mb-6">
            Click below to logout from your account.
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
