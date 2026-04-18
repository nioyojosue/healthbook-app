# 🔗 URLs & Testing Guide

## 🚀 Démarrer l'Application

```bash
cd /home/nioyo/Sites/healthbook
npm run dev
```

**Server running on:** http://localhost:3000

---

## 📍 URLs Accessibles

### Authentication
```
http://localhost:3000/auth/login           🔐 Login page
http://localhost:3000/auth/register        📝 Registration page
http://localhost:3000/auth/forgot-password 🔑 Forgot password
```

### Dashboards
```
http://localhost:3000/patient/dashboard    👤 Patient Dashboard (WITH ASIDE)
http://localhost:3000/doctor/dashboard     👨‍⚕️ Doctor Dashboard
http://localhost:3000/hospital/dashboard   🏥 Hospital Dashboard
http://localhost:3000/admin/dashboard      🔐 Admin Dashboard
```

### Other Pages
```
http://localhost:3000/                     🏠 Landing page
http://localhost:3000/settings             ⚙️ Settings page
http://localhost:3000/login                🔓 Login redirect
http://localhost:3000/register             📋 Register redirect
```

---

## 🧪 Testing Patient Dashboard

### Patient Dashboard URL
```
http://localhost:3000/patient/dashboard
```

### What to Test

#### 1. Main Dashboard Content
- [ ] See welcome message "Bienvenue, Alice! 👋"
- [ ] See 4 stats cards:
  - [ ] Rendez-vous à venir (1)
  - [ ] Prescriptions actives (1)
  - [ ] Consultations (2)
  - [ ] Messages non lus (0)

#### 2. Vital Signs Section
- [ ] See "Signes vitaux actuels" card
- [ ] Display:
  - [ ] Tension artérielle: 130/85
  - [ ] Fréquence cardiaque: 72 bpm
  - [ ] Température: 36.8°C
  - [ ] Saturation O₂: 98%
- [ ] See BMI card with progress bar

#### 3. Heart Rate Chart
- [ ] See line chart with 7-day data
- [ ] Chart shows heart rate trend
- [ ] X-axis: Lun, Mar, Mer, Jeu, Ven, Sam, Dim
- [ ] Y-axis: bpm values

#### 4. Appointments Section
- [ ] Filter buttons work: Tous, Confirmé, En attente, Complété
- [ ] See appointment list
- [ ] Click "Confirmer" on pending appointments
- [ ] Click "Annuler" on appointments

#### 5. RIGHT SIDE ASIDE NAVIGATION
- [ ] See 6 navigation buttons on the right:
  1. [ ] 📊 Tableau de bord
  2. [ ] 📋 Dossiers (badge: 5)
  3. [ ] 🔍 Consultations (badge: 2)
  4. [ ] 💊 Prescriptions (badge: 1)
  5. [ ] 📄 Rapports (badge: 3)
  6. [ ] 🎫 Carte médicale

#### 6. Test Each Aside Tab

**Tab 1: Tableau de Bord** 📊
- [ ] Welcome message displays
- [ ] See 2 quick links (Consultations, Prescriptions)
- [ ] Informational content

**Tab 2: Dossiers Médicaux** 📋
- [ ] See medical records list (5 items)
- [ ] Each record shows:
  - [ ] Title (e.g., "Vaccin Anti-COVID")
  - [ ] Date
  - [ ] Type
  - [ ] Doctor

**Tab 3: Consultations** 🔍
- [ ] See consultation history list (2 items)
- [ ] Each consultation shows:
  - [ ] Type (e.g., "Suivi")
  - [ ] Doctor name
  - [ ] Date badge
  - [ ] Diagnosis

**Tab 4: Prescriptions** 💊
- [ ] See prescriptions list (1 active)
- [ ] Each prescription shows:
  - [ ] ID (e.g., "RX001")
  - [ ] Status badge (Actif/Expiré)
  - [ ] Medication list
  - [ ] Dose & frequency
  - [ ] Prescription date

**Tab 5: Rapports Médicaux** 📄
- [ ] See medical reports list (3 items)
- [ ] Each report shows:
  - [ ] Title (e.g., "Rapport ECG")
  - [ ] Type (e.g., "Cardiologie")
  - [ ] Date
  - [ ] Download button

**Tab 6: Carte Médicale** 🎫
- [ ] See premium card design
- [ ] Card displays:
  - [ ] Header: "HealthBook - Carte Médicale"
  - [ ] Patient name: "Alice Dupont"
  - [ ] Blood type: "O+"
  - [ ] Age: "34 ans"
  - [ ] Gender: "Femme"
  - [ ] Patient ID: "P001"
- [ ] Bottom section shows allergies/warnings

---

## 🧪 Testing Doctor Dashboard

### Doctor Dashboard URL
```
http://localhost:3000/doctor/dashboard
```

### What to Test

- [ ] Welcome with doctor name
- [ ] 4 Stats cards:
  - [ ] Total patients (24)
  - [ ] Upcoming appointments
  - [ ] Pending confirmations
  - [ ] Completed this month
- [ ] Monthly consultations chart
- [ ] Appointments management
- [ ] Work schedule display
- [ ] Patient list

---

## 🧪 Testing Hospital Dashboard

### Hospital Dashboard URL
```
http://localhost:3000/hospital/dashboard
```

### What to Test

- [ ] Hospital name display
- [ ] 4 Stats cards
- [ ] Bed status by department
- [ ] Occupancy rate chart
- [ ] Medical team list
- [ ] Contact information

---

## 🧪 Testing Admin Dashboard

### Admin Dashboard URL
```
http://localhost:3000/admin/dashboard
```

### What to Test

- [ ] 5 Stats cards
- [ ] User search bar
- [ ] Filter buttons (All roles, Patient, Doctor, Hospital, Admin)
- [ ] Status filters (Active, Inactive)
- [ ] User list with filtering
- [ ] User role badges
- [ ] User status badges
- [ ] Role distribution chart

---

## 📱 Responsive Testing

### Mobile (< 640px)
```
Test with: Chrome DevTools Mobile Viewport
OR: http://localhost:3000 on a mobile phone

Check:
- [ ] Sidebar collapses
- [ ] Grid becomes single column
- [ ] Buttons remain clickable
- [ ] Text readable
- [ ] Charts resize properly
```

### Tablet (768px)
```
Test with: iPad Pro in Chrome DevTools
Check:
- [ ] 2-column layout
- [ ] Aside sidebar visible
- [ ] Touch-friendly buttons
- [ ] Proper spacing
```

### Desktop (1280px+)
```
Test with: Full browser window
Check:
- [ ] 3-column layout (2 main + 1 aside)
- [ ] Optimal use of space
- [ ] Hover effects work
- [ ] All content visible
```

---

## 🔌 Browser Testing

### Chrome
- [ ] Rendering correct
- [ ] Colors accurate
- [ ] Charts display
- [ ] Interactions work

### Firefox
- [ ] Rendering correct
- [ ] Colors accurate
- [ ] Responsive works
- [ ] No console errors

### Safari
- [ ] Rendering correct
- [ ] Mobile viewport
- [ ] Interactions work
- [ ] No layout shifts

### Edge
- [ ] Rendering correct
- [ ] Grid layout works
- [ ] Charts render
- [ ] Responsive fine

---

## 🧪 Feature Testing

### Click Testing
- [ ] All buttons clickable
- [ ] Tab navigation works
- [ ] Hover effects visible
- [ ] Active states correct

### Data Testing
- [ ] Mock data loads
- [ ] Numbers display
- [ ] Dates format correctly
- [ ] Names show properly

### Chart Testing
- [ ] Line charts render
- [ ] Bar charts render
- [ ] Progress bars work
- [ ] SVG renders properly

### Layout Testing
- [ ] Grid layouts correct
- [ ] Spacing proper
- [ ] Alignment good
- [ ] No overlapping

---

## 🚨 Troubleshooting

### Issue: Page doesn't load
```
✅ Check: http://localhost:3000 working
✅ Check: npm run dev still running
✅ Check: Console for errors (F12)
✅ Try: Hard refresh (Ctrl+Shift+R)
```

### Issue: Aside not showing
```
✅ Check: You're on /patient/dashboard
✅ Check: Scroll right on mobile
✅ Check: Viewport wide enough
✅ Try: Clear cache
```

### Issue: Data not displaying
```
✅ Check: Mock data loaded (lib/mock-data.js)
✅ Check: DataContext in app/layout.js
✅ Check: Console for errors
✅ Try: Page refresh
```

### Issue: Styles look wrong
```
✅ Check: Tailwind CSS loaded
✅ Check: npm run dev compiling CSS
✅ Check: Browser zoom at 100%
✅ Try: Hard refresh
```

---

## 📝 Test Results Template

```
Date: _____________
Browser: _____________
Device: _____________
Resolution: _____________

Patient Dashboard:
  [ ] Main content renders ✓/✗
  [ ] Stats cards display ✓/✗
  [ ] Vital signs visible ✓/✗
  [ ] Chart renders ✓/✗
  [ ] Aside navigation works ✓/✗
  [ ] All 6 tabs work ✓/✗

Responsive:
  [ ] Mobile (< 640px) ✓/✗
  [ ] Tablet (768px) ✓/✗
  [ ] Desktop (1280px) ✓/✗

Performance:
  [ ] Load time < 2s ✓/✗
  [ ] Smooth interactions ✓/✗
  [ ] No lag/stutter ✓/✗

Overall: ✓ PASS / ✗ FAIL

Notes:
_________________________________
_________________________________
```

---

## 🎯 Quick Verification

Run this to verify everything:

```bash
# 1. Build check
npm run build

# 2. Start dev server
npm run dev

# 3. Open browser to:
http://localhost:3000/patient/dashboard

# 4. Test patient aside:
- Click through all 6 tabs
- Verify content displays
- Check responsive design
- No errors in console (F12)

# 5. Test other dashboards:
http://localhost:3000/doctor/dashboard
http://localhost:3000/hospital/dashboard
http://localhost:3000/admin/dashboard
```

---

## ✅ Sign-off

Once all tests pass:

```
✅ Patient Dashboard Tested
✅ Doctor Dashboard Tested
✅ Hospital Dashboard Tested
✅ Admin Dashboard Tested
✅ Responsive Design Verified
✅ Cross-browser Tested
✅ All Features Working
✅ Performance OK
✅ Ready for Production
```

---

*Test Date: 17 Avril 2026*
*Status: Ready for Testing*
