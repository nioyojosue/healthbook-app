'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, Plus } from 'lucide-react';

export default function DoctorConsultations() {
  const { user } = useAuth();
  const { getAppointmentsByDoctorId } = useContext(DataContext);

  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, completed

  useEffect(() => {
    const doctorAppointments = getAppointmentsByDoctorId('D001');
    setAppointments(doctorAppointments);
  }, []);

  const upcomingAppointments = appointments.filter(
    (a) => new Date(a.date) >= new Date() && a.status !== 'cancelled' && a.status !== 'completed'
  );

  const completedAppointments = appointments.filter(
    (a) => a.status === 'completed' || new Date(a.date) < new Date()
  );

  const displayAppointments = activeTab === 'upcoming' ? upcomingAppointments : completedAppointments;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Mes Consultations</h1>
          <p className="text-text-secondary">Gérez vos rendez-vous patients</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Nouvelle Consultation
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === 'upcoming'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          À Venir ({upcomingAppointments.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === 'completed'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          Complétées ({completedAppointments.length})
        </button>
      </div>

      {/* Consultations Grid */}
      <div className="space-y-4">
        {displayAppointments.length > 0 ? (
          displayAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text">{appointment.patientName}</h3>
                  <p className="text-sm text-text-secondary">Patient ID: {appointment.patientId}</p>
                </div>
                <div className="flex items-center gap-2">
                  {appointment.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : appointment.status === 'pending' ? (
                    <AlertCircle className="w-6 h-6 text-warning" />
                  ) : (
                    <Calendar className="w-6 h-6 text-primary" />
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-success'
                        : appointment.status === 'pending'
                        ? 'bg-yellow-100 text-warning'
                        : appointment.status === 'completed'
                        ? 'bg-blue-100 text-primary'
                        : 'bg-red-100 text-error'
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-3 text-text-secondary">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{appointment.location || 'Bureau'}</span>
                </div>
              </div>

              {/* Notes & Reason */}
              {appointment.reason && (
                <div className="p-4 bg-background rounded-lg mb-4">
                  <p className="text-sm text-text-secondary mb-2">Motif:</p>
                  <p className="text-text">{appointment.reason}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {activeTab === 'upcoming' && (
                  <>
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition font-semibold">
                      Commencer Consultation
                    </button>
                    <button className="flex-1 bg-background text-text py-2 rounded-lg hover:bg-gray-200 transition font-semibold">
                      Reprogrammer
                    </button>
                  </>
                )}
                {activeTab === 'completed' && (
                  <>
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition font-semibold">
                      Voir Notes
                    </button>
                    <button className="flex-1 bg-background text-text py-2 rounded-lg hover:bg-gray-200 transition font-semibold">
                      Créer Prescription
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-lg border border-border text-center">
            <Calendar className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary">
              {activeTab === 'upcoming'
                ? 'Aucune consultation prévue'
                : 'Aucune consultation complétée'}
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Consultations</p>
          <p className="text-3xl font-bold text-primary">{appointments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">À Venir</p>
          <p className="text-3xl font-bold text-success">{upcomingAppointments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Complétées</p>
          <p className="text-3xl font-bold text-primary">{completedAppointments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Taux de remplissage</p>
          <p className="text-3xl font-bold text-warning">94%</p>
        </div>
      </div>
    </div>
  );
}
