'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { Pill, Plus, FileText, CheckCircle, Clock, Send } from 'lucide-react';

export default function DoctorPrescriptions() {
  const { user } = useAuth();
  const { prescriptions } = useContext(DataContext);

  const [doctorPrescriptions, setDoctorPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // pending, sent, archived

  useEffect(() => {
    // Filter prescriptions by doctor (using D001 as example)
    const filtered = prescriptions.filter((p) => p.doctorId === 'D001' || !p.doctorId);
    setDoctorPrescriptions(filtered);
  }, []);

  const pendingPrescriptions = doctorPrescriptions.filter((p) => p.status === 'pending');
  const sentPrescriptions = doctorPrescriptions.filter((p) => p.status === 'active' || p.status === 'sent');
  const archivedPrescriptions = doctorPrescriptions.filter((p) => p.status === 'expired' || p.status === 'archived');

  const displayPrescriptions =
    activeTab === 'pending'
      ? pendingPrescriptions
      : activeTab === 'sent'
      ? sentPrescriptions
      : archivedPrescriptions;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Mes Prescriptions</h1>
          <p className="text-text-secondary">Créez et gérez les ordonnances</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Nouvelle Prescription
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'pending'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          En Attente ({pendingPrescriptions.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'sent'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          Envoyées ({sentPrescriptions.length})
        </button>
        <button
          onClick={() => setActiveTab('archived')}
          className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'archived'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          Archivées ({archivedPrescriptions.length})
        </button>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {displayPrescriptions.length > 0 ? (
          displayPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                    <Pill className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">{prescription.medication}</h3>
                    <p className="text-sm text-text-secondary">Pour: {prescription.patientName || 'Patient'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {prescription.status === 'active' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : prescription.status === 'pending' ? (
                    <Clock className="w-5 h-5 text-warning" />
                  ) : (
                    <FileText className="w-5 h-5 text-text-light" />
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      prescription.status === 'active'
                        ? 'bg-green-100 text-success'
                        : prescription.status === 'pending'
                        ? 'bg-yellow-100 text-warning'
                        : 'bg-gray-100 text-text-secondary'
                    }`}
                  >
                    {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Dosage:</span>
                      <span className="font-semibold text-text">{prescription.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Fréquence:</span>
                      <span className="font-semibold text-text">{prescription.frequency}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Quantité:</span>
                      <span className="font-semibold text-text">{prescription.quantity} {prescription.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Renouvellements:</span>
                      <span className="font-semibold text-text">{prescription.refillsRemaining}</span>
                    </div>
                  </div>
                </div>
              </div>

              {prescription.notes && (
                <div className="p-3 bg-background rounded-lg mb-4">
                  <p className="text-sm text-text-secondary mb-1">Notes:</p>
                  <p className="text-text">{prescription.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {activeTab === 'pending' && (
                  <>
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition font-semibold flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Envoyer au Patient
                    </button>
                    <button className="flex-1 bg-background text-text py-2 rounded-lg hover:bg-gray-200 transition font-semibold">
                      Éditer
                    </button>
                  </>
                )}
                {(activeTab === 'sent' || activeTab === 'archived') && (
                  <>
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition font-semibold">
                      Voir Détails
                    </button>
                    <button className="flex-1 bg-background text-text py-2 rounded-lg hover:bg-gray-200 transition font-semibold">
                      Dupliquer
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-lg border border-border text-center">
            <Pill className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary">
              {activeTab === 'pending'
                ? 'Aucune prescription en attente'
                : activeTab === 'sent'
                ? 'Aucune prescription envoyée'
                : 'Aucune prescription archivée'}
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Prescriptions</p>
          <p className="text-3xl font-bold text-primary">{doctorPrescriptions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">En Attente</p>
          <p className="text-3xl font-bold text-warning">{pendingPrescriptions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Envoyées</p>
          <p className="text-3xl font-bold text-success">{sentPrescriptions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Archivées</p>
          <p className="text-3xl font-bold text-text-secondary">{archivedPrescriptions.length}</p>
        </div>
      </div>
    </div>
  );
}
