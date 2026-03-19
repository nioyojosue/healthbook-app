# HealthBook Quick Reference

## 🎨 Tailwind Color Classes

### Brand Colors
```
bg-primary          → #2A7DE1 (Main Blue)
bg-primary-dark     → #1E5BA8 (Dark Blue)
bg-primary-light    → #5A9DFF (Light Blue)
bg-background       → #F4F6F8 (Light Gray Background)
bg-bg-secondary     → #FFFFFF (White Cards)
```

### Text Colors
```
text-text           → #1E1E1E (Dark Text)
text-text-secondary → #6B7280 (Medium Gray)
text-text-light     → #9CA3AF (Light Gray)
```

### Status Colors
```
bg-success          → #10B981 (Green)
bg-warning          → #F59E0B (Amber)
bg-error            → #EF4444 (Red)
bg-info             → #3B82F6 (Blue)
```

### Utility Classes
```
border-border       → #E5E7EB Border color
rounded-lg          → 12px border radius
shadow-md           → Medium box shadow
```

---

## 🧩 Component Locations

| Component | Path | Status |
|-----------|------|--------|
| Sidebar | `components/common/Sidebar.js` | ✅ Done |
| Topbar | `components/common/Topbar.js` | ✅ Done |
| DashboardLayout | `components/common/DashboardLayout.js` | ✅ Done |
| Button | `components/ui/Button.js` | ⏳ Step 2 |
| Input | `components/ui/Input.js` | ⏳ Step 2 |
| Card | `components/ui/Card.js` | ⏳ Step 2 |
| Table | `components/ui/Table.js` | ⏳ Step 2 |
| Modal | `components/ui/Modal.js` | ⏳ Step 2 |
| Badge | `components/ui/Badge.js` | ⏳ Step 2 |

---

## 📍 Key Directories

```
/app                          Next.js pages & routes
  /patient/dashboard          Patient dashboard
  /doctor/dashboard           Doctor dashboard
  /hospital/dashboard         Hospital dashboard
  /admin/dashboard            Admin dashboard
  /auth                       Auth pages
  /login                      Login page
  /register                   Registration page
  /settings                   Settings page
  layout.js                   Root layout

/components
  /common                     Shared components
    Sidebar.js
    Topbar.js
    DashboardLayout.js
  /ui                         UI components (Step 2)

/lib
  auth-context.js             Auth state management
  navigation.js               Navigation config

/styles
  globals.css                 Global styles

/public                       Static files
```

---

## 🔐 Authentication Testing

### Test Users
You can login as any role using:

**Email**: `test@example.com` (or any email)
**Password**: `password123` (or any password)
**Role**: Select from dropdown

**Available Roles:**
- `patient`
- `doctor`
- `hospital`
- `admin`

After login, you'll see role-specific navigation.

---

## 🎯 Sidebar Navigation by Role

### Patient Menu
```
🏠 Dashboard (exact match)
📄 Medical Records
⏰ Consultations
💊 Prescriptions
📋 Medical Reports
🔐 Medical Card
⚙️ Settings (bottom)
🚪 Logout (bottom)
```

### Doctor Menu
```
🏠 Dashboard
👥 Find Patient
⏰ Consultations
💊 Prescriptions
📊 Analysis
⚙️ Settings (bottom)
🚪 Logout (bottom)
```

### Hospital Menu
```
🏠 Dashboard
🩺 Manage Doctors
👥 Manage Patients
📊 Statistics
📋 Reports
📄 Billing
⚙️ Settings (bottom)
🚪 Logout (bottom)
```

### Admin Menu
```
🏠 Dashboard
👥 Users
🩺 Doctors
📄 Hospitals
📊 Analytics
⚙️ Settings (bottom)
🚪 Logout (bottom)
```

---

## 🎨 Typography Classes

```
font-sans           → Inter font family
font-bold           → Weight 700
font-semibold       → Weight 600
font-medium         → Weight 500
font-normal         → Weight 400

text-xs             → 12px
text-sm             → 14px
text-base           → 16px
text-lg             → 18px
text-xl             → 20px
text-2xl            → 24px
text-3xl            → 30px
text-4xl            → 36px
text-5xl            → 48px
text-6xl            → 60px
```

---

## 📱 Responsive Breakpoints

```
// Mobile first (no prefix)
<640px              → Default styles

sm:                 → 640px and up
md:                 → 768px and up (Sidebar shows)
lg:                 → 1024px and up
xl:                 → 1280px and up
2xl:                → 1536px and up
```

**Example:**
```jsx
<div className="hidden md:block">  {/* Hidden on mobile, visible on tablet+ */}
```

---

## 🎯 Design System Spacing

```
p-2   → 8px padding
p-4   → 16px padding
p-6   → 24px padding
p-8   → 32px padding

m-2   → 8px margin
m-4   → 16px margin
m-6   → 24px margin
m-8   → 32px margin

gap-2  → 8px gap
gap-3  → 12px gap
gap-4  → 16px gap
gap-6  → 24px gap
```

---

## 🔧 Using the Auth Context

```javascript
'use client';

import { useAuth } from '@/lib/auth-context';

export function MyComponent() {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Welcome {user.name}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

---

## 🚀 Development Server

```bash
npm run dev
# Opens at http://localhost:3002 (or available port)
```

---

## 📋 File Naming Convention

- **Components**: PascalCase (e.g., `Sidebar.js`, `Button.js`)
- **Pages**: lowercase (e.g., `page.js`, `layout.js`)
- **Utilities**: camelCase (e.g., `auth-context.js`, `navigation.js`)
- **Styles**: lowercase (e.g., `globals.css`)

---

## ✨ Pro Tips

1. **Color Consistency**: Always use Tailwind classes from `tailwind.config.js`
2. **Icons**: Import from `lucide-react` (already included)
3. **Responsive**: Test on mobile using browser DevTools
4. **Context**: Use `'use client'` directive for components using context
5. **Navigation**: Active links automatically highlight in Sidebar

---

## 🐛 Troubleshooting

**Issue**: Tailwind colors not applying?
→ Check `tailwind.config.js` is correct and restart dev server

**Issue**: Components not showing?
→ Add `'use client'` at top of component file

**Issue**: Auth context errors?
→ Ensure `AuthProvider` wraps your app (it's in `layout.js`)

---

**Ready for Step 2?** Let's build the UI component library! 🎨
