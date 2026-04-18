'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { Calendar, Clock, MapPin, Phone, MessageSquare, Plus } from 'lucide-react';

export default function PatientConsultations() {
  const { user } = useAuth();
  const { getAppointmentsByPatientId, getDoctorById } = useContext(DataContext);

  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past

  useEffect(() => {
    const patientAppointments = getAppointmentsByPatientId('P001');
    setAppointments(patientAppointments);
  }, []);

  const upcomingAppointments = appointments.filter(
    (a) => new Date(a.date) >= new Date() && a.status !== 'cancelled'
  );

  const pastAppointments = appointments.filter(
    (a) => new Date(a.date) < new Date() || a.status === 'cancelled'
  );

  const displayAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Mes Consultations</h1>
          <p className="text-text-secondary">Gérez vos rendez-vous médicaux</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Nouveau Rendez-vous
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
          onClick={() => setActiveTab('past')}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === 'past'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          Passés ({pastAppointments.length})
        </button>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayAppointments.length > 0 ? (
          displayAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition"
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-text">Dr. {appointment.doctorName}</h3>
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

              {/* Appointment Details */}
              <div className="space-y-3 mb-4">
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
                  <span>{appointment.location || 'Clinique Générale'}</span>
                </div>
                {appointment.reason && (
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm text-text-secondary mb-1">Motif:</p>
                    <p className="text-text">{appointment.reason}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm font-semibold flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Appeler
                </button>
                <button className="flex-1 bg-background text-text py-2 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
                {activeTab === 'upcoming' && (
                  <button className="flex-1 bg-error bg-opacity-10 text-error py-2 rounded-lg hover:bg-opacity-20 transition text-sm font-semibold">
                    Annuler
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 bg-white p-12 rounded-lg border border-border text-center">
            <Calendar className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              {activeTab === 'upcoming'
                ? 'Aucun rendez-vous prévu'
                : 'Aucun rendez-vous passé'}
            </p>
            {activeTab === 'upcoming' && (
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition font-semibold">
                Prendre un Rendez-vous
              </button>
            )}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Consultations</p>
          <p className="text-3xl font-bold text-primary">{appointments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">À Venir</p>
          <p className="text-3xl font-bold text-success">{upcomingAppointments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Complétées</p>
          <p className="text-3xl font-bold text-warning">
            {appointments.filter((a) => a.status === 'completed').length}
          </p>
        </div>
      </div>
    </div>
  );
}
