# HealthBook - Digital Medical Record System

A comprehensive frontend web application for managing digital medical records. Built with Next.js 13+ (App Router), Tailwind CSS, and JavaScript.

## 🎯 Project Overview

HealthBook is a health-tech platform designed for:
- **Patients**: Manage personal medical records
- **Doctors**: Access patient information and create consultations
- **Hospitals**: Manage doctors, patients, and billing
- **Admins**: System-wide management and analytics

## 📁 Project Structure

### `/app` - Next.js App Router Pages
- `layout.js` - Root layout with AuthProvider and DashboardLayout
- `page.js` - Landing/Home page
- `/login` - Login page (Step 3)
- `/register` - Registration page (Step 3)
- `/settings` - Settings page
- `/patient/*` - Patient dashboard routes (Step 4)
- `/doctor/*` - Doctor dashboard routes (Step 5)
- `/hospital/*` - Hospital dashboard routes (Step 6)
- `/admin/*` - Admin dashboard routes (Step 7)

### `/components` - Reusable React Components
- `/common` - Shared components used across the app
  - `Sidebar.js` - Navigation sidebar with role-based menu
  - `Topbar.js` - Top navigation bar with user menu
  - `DashboardLayout.js` - Wrapper layout for dashboard pages
- More UI components coming in Step 2 (Button, Input, Card, Table, Modal, Badge)

### `/lib` - Utility Functions & Contexts
- `auth-context.js` - Authentication context with useAuth hook
- `navigation.js` - Navigation configuration for each role

### `/styles` - Global Styling
- `globals.css` - Global Tailwind CSS directives and custom styles

### `/public` - Static Assets
- Images, icons, and other static files

## 🎨 Design System

### Color Palette
- **Primary**: `#2A7DE1` (Main brand color)
- **Primary Dark**: `#1E5BA8` (Hover state)
- **Primary Light**: `#5A9DFF`
- **Background**: `#F4F6F8`
- **Background Secondary**: `#FFFFFF` (Cards)
- **Text**: `#1E1E1E`
- **Text Secondary**: `#6B7280`
- **Text Light**: `#9CA3AF`
- **Border**: `#E5E7EB`
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`
- **Info**: `#3B82F6`

### Typography
- **Font Family**: Inter (from Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Border Radius
- **Default**: 12px (used for most components)
- **xs**: 4px
- **sm**: 8px
- **lg**: 16px
- **xl**: 20px

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

## 🔐 Authentication System

### Auth Context (`lib/auth-context.js`)
Provides:
- `user` - Current user object with id, name, email, role, avatar
- `login(email, password, role)` - Simulate login
- `logout()` - Clear user session

### Roles
- `patient` - Patient user type
- `doctor` - Doctor user type
- `hospital` - Hospital administrator
- `admin` - System administrator

## 🧭 Navigation System

### Sidebar Navigation (`lib/navigation.js`)
Role-based navigation menus configured for each user type:
- Dynamic menu items with icons from lucide-react
- Active state highlighting
- Mobile-responsive with toggle

### Topbar
- User profile section
- Notifications bell
- Settings and logout shortcuts

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## 📦 Dependencies

### Production
- `next@13.5.6` - React framework with App Router
- `react@18.2.0` - UI library
- `react-dom@18.2.0` - React DOM
- `lucide-react@^0.263.1` - Icon library

### Development
- `tailwindcss@3.3.6` - CSS framework
- `postcss@8.4.32` - CSS post-processor
- `autoprefixer@10.4.16` - Vendor prefixes
- `eslint@8.54.0` - Code linter
- `eslint-config-next@13.5.6` - Next.js ESLint config

## 📋 Implementation Steps

### ✅ Step 1: Project Setup (COMPLETED)
- [x] Directory structure
- [x] Tailwind CSS configuration
- [x] Global styles
- [x] Navigation system (Sidebar + Topbar)
- [x] Authentication context
- [x] Basic layout

### ⏳ Step 2: Design System
- [ ] Button component
- [ ] Input component
- [ ] Card component
- [ ] Table component
- [ ] Modal component
- [ ] Badge component

### ⏳ Step 3: Authentication Pages
- [ ] Landing page (updated)
- [ ] Login page (updated)
- [ ] Register page (updated)
- [ ] Forgot password page

### ⏳ Step 4: Patient Dashboard
- [ ] Dashboard overview
- [ ] Medical records
- [ ] Consultation history
- [ ] Prescriptions
- [ ] Medical reports
- [ ] QR medical card
- [ ] Profile settings

### ⏳ Step 5: Doctor Dashboard
- [ ] Dashboard overview
- [ ] Patient search
- [ ] Patient record view
- [ ] Add consultation
- [ ] Create prescription
- [ ] Upload analysis

### ⏳ Step 6: Hospital Dashboard
- [ ] Dashboard overview
- [ ] Manage doctors
- [ ] Manage patients
- [ ] Statistics
- [ ] Reports
- [ ] Billing

### ⏳ Step 7: Admin Panel
- [ ] Admin dashboard
- [ ] Manage users
- [ ] Manage doctors
- [ ] Manage hospitals
- [ ] Analytics

### ⏳ Step 8: Functionality
- [ ] Routing implementation
- [ ] Protected routes
- [ ] Role-based UI
- [ ] Mock data integration

### ⏳ Step 9: Bonus Features
- [ ] QR code component
- [ ] Loading states
- [ ] Notifications/Toasts

## 🔒 Protected Routes

Protected routes are implemented in Step 8. Currently, all routes are accessible.

## 📝 Code Quality

- ESLint configured for code quality
- Tailwind CSS for consistent styling
- Component-based architecture
- Context API for state management

## 🎯 Next Steps

Proceed to **Step 2** to create the design system with reusable UI components.

## 📄 License

Private project - HealthBook 2026
