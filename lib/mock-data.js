// Mock Data for HealthBook Application

export const mockPatients = [
  {
    id: 'P001',
    name: 'Alice Dupont',
    email: 'alice@example.com',
    age: 34,
    gender: 'Femme',
    phone: '+33612345678',
    bloodType: 'O+',
    address: '123 Rue de Paris, 75001 Paris',
    assignedDoctor: 'D001',
    medicalHistory: ['Hypertension', 'Diabète Type 2'],
    vitalSigns: {
      bloodPressure: '130/85',
      heartRate: 72,
      temperature: 36.8,
      oxygenSaturation: 98,
      weight: 68,
      height: 165,
    },
    lastCheckup: '2026-03-15',
  },
  {
    id: 'P002',
    name: 'Bob Martin',
    email: 'bob@example.com',
    age: 45,
    gender: 'Homme',
    phone: '+33687654321',
    bloodType: 'A+',
    address: '456 Avenue de Lyon, 69000 Lyon',
    assignedDoctor: 'D002',
    medicalHistory: ['Cholestérol élevé'],
    vitalSigns: {
      bloodPressure: '120/80',
      heartRate: 68,
      temperature: 37.0,
      oxygenSaturation: 99,
      weight: 82,
      height: 178,
    },
    lastCheckup: '2026-03-10',
  },
  {
    id: 'P003',
    name: 'Claire Leblanc',
    email: 'claire@example.com',
    age: 28,
    gender: 'Femme',
    phone: '+33698765432',
    bloodType: 'B+',
    address: '789 Rue de Marseille, 13000 Marseille',
    assignedDoctor: 'D001',
    medicalHistory: ['Asthme légère'],
    vitalSigns: {
      bloodPressure: '115/75',
      heartRate: 70,
      temperature: 36.9,
      oxygenSaturation: 99,
      weight: 62,
      height: 172,
    },
    lastCheckup: '2026-04-01',
  },
];

export const mockDoctors = [
  {
    id: 'D001',
    name: 'Dr. Jean Moreau',
    email: 'jean.moreau@hospital.fr',
    specialization: 'Cardiologie',
    phone: '+33612111111',
    hospital: 'H001',
    experience: 15,
    patientCount: 24,
    consultationsPerMonth: 40,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    rating: 4.8,
    license: 'ML001234567',
    workDays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
  },
  {
    id: 'D002',
    name: 'Dr. Marie Dubois',
    email: 'marie.dubois@hospital.fr',
    specialization: 'Médecine Générale',
    phone: '+33687222222',
    hospital: 'H001',
    experience: 10,
    patientCount: 32,
    consultationsPerMonth: 50,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
    rating: 4.9,
    license: 'ML002234567',
    workDays: ['Lundi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  },
  {
    id: 'D003',
    name: 'Dr. Pierre Leclerc',
    email: 'pierre.leclerc@hospital.fr',
    specialization: 'Neurologie',
    phone: '+33698333333',
    hospital: 'H002',
    experience: 20,
    patientCount: 18,
    consultationsPerMonth: 35,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
    rating: 4.7,
    license: 'ML003234567',
    workDays: ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
  },
];

export const mockHospitals = [
  {
    id: 'H001',
    name: 'Hôpital Central Paris',
    address: '123 Boulevard Haussmann, 75001 Paris',
    phone: '+33145677890',
    email: 'contact@hopital-paris.fr',
    doctorCount: 45,
    bedCount: 250,
    availableBeds: 32,
    departments: ['Cardiologie', 'Neurologie', 'Urgences', 'Maternité'],
    rating: 4.6,
    website: 'www.hopital-paris.fr',
  },
  {
    id: 'H002',
    name: 'Clinique Lyon Santé',
    address: '456 Rue de la République, 69000 Lyon',
    phone: '+33478654321',
    email: 'contact@clinique-lyon.fr',
    doctorCount: 28,
    bedCount: 120,
    availableBeds: 15,
    departments: ['Orthopédie', 'Dentaire', 'Dermatologie'],
    rating: 4.5,
    website: 'www.clinique-lyon.fr',
  },
];

export const mockAppointments = [
  {
    id: 'APT001',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2026-04-20',
    time: '10:30',
    reason: 'Suivi cardiaque',
    status: 'confirmed', // 'confirmed' | 'pending' | 'completed' | 'cancelled'
    notes: 'Vérifier tension artérielle et résultats ECG',
    type: 'consultation',
  },
  {
    id: 'APT002',
    patientId: 'P002',
    doctorId: 'D002',
    date: '2026-04-18',
    time: '14:00',
    reason: 'Contrôle cholestérol',
    status: 'confirmed',
    notes: 'Analyser résultats analyses sanguines',
    type: 'consultation',
  },
  {
    id: 'APT003',
    patientId: 'P003',
    doctorId: 'D001',
    date: '2026-04-25',
    time: '09:00',
    reason: 'Crise d\'asthme',
    status: 'pending',
    notes: 'Patient appelle pour urgence asthme',
    type: 'urgency',
  },
  {
    id: 'APT004',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2026-03-15',
    time: '11:00',
    reason: 'Suivi diabète',
    status: 'completed',
    notes: 'Visite effectuée, renouveler traitement',
    type: 'consultation',
  },
];

export const mockPrescriptions = [
  {
    id: 'RX001',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2026-03-15',
    medications: [
      { name: 'Lisinopril', dose: '10mg', frequency: '1 fois par jour', duration: '3 mois' },
      { name: 'Metformine', dose: '500mg', frequency: '2 fois par jour', duration: '6 mois' },
    ],
    status: 'active',
  },
  {
    id: 'RX002',
    patientId: 'P002',
    doctorId: 'D002',
    date: '2026-03-10',
    medications: [
      { name: 'Atorvastatine', dose: '20mg', frequency: '1 fois par jour', duration: '1 an' },
    ],
    status: 'active',
  },
  {
    id: 'RX003',
    patientId: 'P003',
    doctorId: 'D001',
    date: '2026-02-20',
    medications: [
      { name: 'Salbutamol', dose: '100mcg', frequency: 'Au besoin', duration: 'Continu' },
    ],
    status: 'active',
  },
];

export const mockMessages = [
  {
    id: 'MSG001',
    senderId: 'D001',
    receiverId: 'P001',
    subject: 'Résultats d\'analyse',
    content: 'Vos résultats d\'analyse sont disponibles dans votre dossier.',
    date: '2026-04-15',
    read: false,
  },
  {
    id: 'MSG002',
    senderId: 'P002',
    receiverId: 'D002',
    subject: 'Question sur mon traitement',
    content: 'Puis-je réduire la dose de mon médicament?',
    date: '2026-04-14',
    read: true,
  },
];

export const mockUsers = [
  {
    id: 'U001',
    name: 'Alice Dupont',
    email: 'alice@example.com',
    role: 'patient',
    status: 'active',
    lastLogin: '2026-04-17',
    joinDate: '2025-01-15',
  },
  {
    id: 'U002',
    name: 'Dr. Jean Moreau',
    email: 'jean.moreau@hospital.fr',
    role: 'doctor',
    status: 'active',
    lastLogin: '2026-04-17',
    joinDate: '2024-05-20',
  },
  {
    id: 'U003',
    name: 'Hospital Admin',
    email: 'admin@hopital-paris.fr',
    role: 'hospital',
    status: 'active',
    lastLogin: '2026-04-17',
    joinDate: '2024-01-10',
  },
  {
    id: 'U004',
    name: 'System Admin',
    email: 'admin@healthbook.fr',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-04-17',
    joinDate: '2023-06-01',
  },
];

export const mockConsultationHistory = [
  {
    id: 'CONS001',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2026-03-15',
    type: 'Suivi',
    diagnosis: 'Hypertension contrôlée',
    treatment: 'Continuer traitement actuel',
    notes: 'Tension: 128/82. Bonne évolution.',
  },
  {
    id: 'CONS002',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2026-01-20',
    type: 'Diagnostic',
    diagnosis: 'Hypertension',
    treatment: 'Lisinopril 10mg',
    notes: 'Patient présente signes hypertension.',
  },
];

export const getPatientById = (id) => mockPatients.find((p) => p.id === id);
export const getDoctorById = (id) => mockDoctors.find((d) => d.id === id);
export const getHospitalById = (id) => mockHospitals.find((h) => h.id === id);
export const getAppointmentsByPatientId = (patientId) => mockAppointments.filter((a) => a.patientId === patientId);
export const getAppointmentsByDoctorId = (doctorId) => mockAppointments.filter((a) => a.doctorId === doctorId);
export const getPrescriptionsByPatientId = (patientId) => mockPrescriptions.filter((p) => p.patientId === patientId);
export const getMessagesByUserId = (userId) => mockMessages.filter((m) => m.receiverId === userId);
export const getConsultationHistoryByPatientId = (patientId) =>
  mockConsultationHistory.filter((c) => c.patientId === patientId);
