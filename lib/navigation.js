import {
  Home,
  FileText,
  Clock,
  Pill,
  File,
  QrCode,
  User,
  Users,
  Stethoscope,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

export const NAVIGATION = {
  patient: [
    {
      label: 'Dashboard',
      href: '/patient/dashboard',
      icon: Home,
      exact: true,
    },
    {
      label: 'Medical Records',
      href: '/patient/records',
      icon: FileText,
    },
    {
      label: 'Consultations',
      href: '/patient/consultations',
      icon: Clock,
    },
    {
      label: 'Prescriptions',
      href: '/patient/prescriptions',
      icon: Pill,
    },
    {
      label: 'Medical Reports',
      href: '/patient/reports',
      icon: File,
    },
    {
      label: 'Medical Card',
      href: '/patient/medical-card',
      icon: QrCode,
    },
  ],
  doctor: [
    {
      label: 'Dashboard',
      href: '/doctor/dashboard',
      icon: Home,
      exact: true,
    },
    {
      label: 'Find Patient',
      href: '/doctor/patients',
      icon: Users,
    },
    {
      label: 'Consultations',
      href: '/doctor/consultations',
      icon: Clock,
    },
    {
      label: 'Prescriptions',
      href: '/doctor/prescriptions',
      icon: Pill,
    },
    {
      label: 'Analysis',
      href: '/doctor/analysis',
      icon: BarChart3,
    },
  ],
  hospital: [
    {
      label: 'Dashboard',
      href: '/hospital/dashboard',
      icon: Home,
      exact: true,
    },
    {
      label: 'Manage Doctors',
      href: '/hospital/doctors',
      icon: Stethoscope,
    },
    {
      label: 'Manage Patients',
      href: '/hospital/patients',
      icon: Users,
    },
    {
      label: 'Statistics',
      href: '/hospital/statistics',
      icon: BarChart3,
    },
    {
      label: 'Reports',
      href: '/hospital/reports',
      icon: File,
    },
    {
      label: 'Billing',
      href: '/hospital/billing',
      icon: FileText,
    },
  ],
  admin: [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: Home,
      exact: true,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: Users,
    },
    {
      label: 'Doctors',
      href: '/admin/doctors',
      icon: Stethoscope,
    },
    {
      label: 'Hospitals',
      href: '/admin/hospitals',
      icon: FileText,
    },
    {
      label: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
    },
  ],
};

export const BOTTOM_NAVIGATION = [
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    label: 'Logout',
    href: '/logout',
    icon: LogOut,
    action: 'logout',
  },
];
