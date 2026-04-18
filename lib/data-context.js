'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  mockPatients,
  mockDoctors,
  mockHospitals,
  mockAppointments,
  mockPrescriptions,
  mockMessages,
  mockUsers,
  mockConsultationHistory,
} from './mock-data';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [patients, setPatients] = useState(mockPatients);
  const [doctors, setDoctors] = useState(mockDoctors);
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [messages, setMessages] = useState(mockMessages);
  const [users, setUsers] = useState(mockUsers);
  const [consultationHistory, setConsultationHistory] = useState(mockConsultationHistory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Patient operations
  const getPatientById = (id) => patients.find((p) => p.id === id);
  const updatePatient = (id, updates) => {
    setPatients(patients.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  // Doctor operations
  const getDoctorById = (id) => doctors.find((d) => d.id === id);
  const updateDoctor = (id, updates) => {
    setDoctors(doctors.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  // Hospital operations
  const getHospitalById = (id) => hospitals.find((h) => h.id === id);
  const updateHospital = (id, updates) => {
    setHospitals(hospitals.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  };

  // Appointment operations
  const getAppointmentsByPatientId = (patientId) =>
    appointments.filter((a) => a.patientId === patientId);
  const getAppointmentsByDoctorId = (doctorId) =>
    appointments.filter((a) => a.doctorId === doctorId);
  const createAppointment = (appointmentData) => {
    const newAppointment = {
      id: `APT${Date.now()}`,
      ...appointmentData,
    };
    setAppointments([...appointments, newAppointment]);
    return newAppointment;
  };
  const updateAppointment = (id, updates) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };
  const cancelAppointment = (id) => {
    updateAppointment(id, { status: 'cancelled' });
  };

  // Prescription operations
  const getPrescriptionsByPatientId = (patientId) =>
    prescriptions.filter((p) => p.patientId === patientId);
  const getActivePrescriptionsByPatientId = (patientId) =>
    prescriptions.filter((p) => p.patientId === patientId && p.status === 'active');
  const createPrescription = (prescriptionData) => {
    const newPrescription = {
      id: `RX${Date.now()}`,
      ...prescriptionData,
    };
    setPrescriptions([...prescriptions, newPrescription]);
    return newPrescription;
  };

  // Message operations
  const getMessagesByUserId = (userId) => messages.filter((m) => m.receiverId === userId);
  const getUnreadMessages = (userId) =>
    messages.filter((m) => m.receiverId === userId && !m.read);
  const sendMessage = (messageData) => {
    const newMessage = {
      id: `MSG${Date.now()}`,
      ...messageData,
      read: false,
    };
    setMessages([...messages, newMessage]);
    return newMessage;
  };
  const markMessageAsRead = (messageId) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, read: true } : m)));
  };

  // Consultation History operations
  const getConsultationHistoryByPatientId = (patientId) =>
    consultationHistory.filter((c) => c.patientId === patientId);

  // User operations
  const getUserById = (id) => users.find((u) => u.id === id);
  const getAllUsers = () => users;
  const getUsersByRole = (role) => users.filter((u) => u.role === role);
  const updateUser = (id, updates) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  };

  // Statistics operations
  const getPatientStats = (patientId) => {
    const patient = getPatientById(patientId);
    const upcomingAppointments = getAppointmentsByPatientId(patientId).filter(
      (a) => new Date(a.date) >= new Date() && a.status !== 'cancelled'
    );
    const activePrescriptions = getActivePrescriptionsByPatientId(patientId);
    const consultations = getConsultationHistoryByPatientId(patientId);
    const unreadMessages = getUnreadMessages(patientId);

    return {
      patient,
      upcomingAppointments,
      activePrescriptions,
      consultations,
      unreadMessages,
      appointmentCount: upcomingAppointments.length,
      prescriptionCount: activePrescriptions.length,
      consultationCount: consultations.length,
      messageCount: unreadMessages.length,
    };
  };

  const getDoctorStats = (doctorId) => {
    const doctor = getDoctorById(doctorId);
    const myAppointments = getAppointmentsByDoctorId(doctorId);
    const upcomingAppointments = myAppointments.filter(
      (a) => new Date(a.date) >= new Date() && a.status !== 'cancelled'
    );
    const pendingAppointments = myAppointments.filter((a) => a.status === 'pending');
    const completedAppointments = myAppointments.filter((a) => a.status === 'completed');

    return {
      doctor,
      appointments: myAppointments,
      upcomingAppointments,
      pendingAppointments,
      completedAppointments,
      appointmentCount: myAppointments.length,
      upcomingCount: upcomingAppointments.length,
      pendingCount: pendingAppointments.length,
    };
  };

  const getHospitalStats = (hospitalId) => {
    const hospital = getHospitalById(hospitalId);
    const hospitalDoctors = doctors.filter((d) => d.hospital === hospitalId);
    const occupancyRate = ((hospital.bedCount - hospital.availableBeds) / hospital.bedCount) * 100;

    return {
      hospital,
      doctorCount: hospitalDoctors.length,
      occupancyRate: occupancyRate.toFixed(1),
      availableBeds: hospital.availableBeds,
      totalBeds: hospital.bedCount,
    };
  };

  const value = {
    // Patient
    patients,
    getPatientById,
    updatePatient,

    // Doctor
    doctors,
    getDoctorById,
    updateDoctor,

    // Hospital
    hospitals,
    getHospitalById,
    updateHospital,

    // Appointments
    appointments,
    getAppointmentsByPatientId,
    getAppointmentsByDoctorId,
    createAppointment,
    updateAppointment,
    cancelAppointment,

    // Prescriptions
    prescriptions,
    getPrescriptionsByPatientId,
    getActivePrescriptionsByPatientId,
    createPrescription,

    // Messages
    messages,
    getMessagesByUserId,
    getUnreadMessages,
    sendMessage,
    markMessageAsRead,

    // Consultation History
    consultationHistory,
    getConsultationHistoryByPatientId,

    // Users
    users,
    getUserById,
    getAllUsers,
    getUsersByRole,
    updateUser,

    // Statistics
    getPatientStats,
    getDoctorStats,
    getHospitalStats,

    // Loading & Error
    loading,
    setLoading,
    error,
    setError,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
