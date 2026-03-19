import { AuthProvider } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/common/DashboardLayout';
import '@/styles/globals.css';

export const metadata = {
  title: 'HealthBook - Digital Medical Records',
  description:
    'A comprehensive digital medical record system for patients, doctors, hospitals, and administrators.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
