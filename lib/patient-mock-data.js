// Mock data for patient medical reports
export const mockMedicalReports = [
  {
    id: 'RPT001',
    title: 'Rapport ECG',
    type: 'Cardiologie',
    date: '2026-03-15',
    doctor: 'Dr. Jean Moreau',
    content: 'ECG normal. Pas de signes d\'arythmie.',
    fileUrl: '#',
  },
  {
    id: 'RPT002',
    title: 'Analyse sanguine',
    type: 'Biologie',
    date: '2026-03-10',
    doctor: 'Lab. Central',
    content: 'Tous les paramètres dans les normes.',
    fileUrl: '#',
  },
  {
    id: 'RPT003',
    title: 'Radiographie thorax',
    type: 'Radiologie',
    date: '2026-02-20',
    doctor: 'Dr. Marie Dubois',
    content: 'Poumons clairs. Pas de pathologie détectée.',
    fileUrl: '#',
  },
];

export const mockMedicalRecords = [
  {
    id: 'REC001',
    title: 'Vaccin Anti-COVID (3ème dose)',
    date: '2026-01-15',
    type: 'Vaccination',
    doctor: 'Infirmerie',
  },
  {
    id: 'REC002',
    title: 'Visite de contrôle',
    date: '2025-12-10',
    type: 'Suivi',
    doctor: 'Dr. Jean Moreau',
  },
  {
    id: 'REC003',
    title: 'Vaccination grippe',
    date: '2025-11-05',
    type: 'Vaccination',
    doctor: 'Infirmerie',
  },
  {
    id: 'REC004',
    title: 'Bilan de santé annuel',
    date: '2025-10-20',
    type: 'Bilan',
    doctor: 'Dr. Marie Dubois',
  },
  {
    id: 'REC005',
    title: 'Test tensionnel',
    date: '2025-09-15',
    type: 'Test',
    doctor: 'Infirmerie',
  },
];
