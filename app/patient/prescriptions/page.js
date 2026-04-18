'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { Pill, Calendar, AlertCircle, Download, Eye, RotateCcw, Trash2 } from 'lucide-react';

export default function PatientPrescriptions() {
  const { user } = useAuth();
  const { getPrescriptionsByPatientId } = useContext(DataContext);

  const [prescriptions, setPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); // active, expired, refillable

  useEffect(() => {
    const patientPrescriptions = getPrescriptionsByPatientId('P001');
    setPrescriptions(patientPrescriptions);
  }, []);

  const activePrescriptions = prescriptions.filter((p) => p.status === 'active');
  const expiredPrescriptions = prescriptions.filter((p) => p.status === 'expired');
  const refillablePrescriptions = prescriptions.filter((p) => p.refillsRemaining > 0 && p.status === 'active');

  const displayPrescriptions =
    activeTab === 'active'
      ? activePrescriptions
      : activeTab === 'expired'
      ? expiredPrescriptions
      : refillablePrescriptions;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text mb-2">Mes Ordonnances</h1>
        <p className="text-text-secondary">Suivez vos prescriptions médicales</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'active'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          Actives ({activePrescriptions.length})
        </button>
        <button
          onClick={() => setActiveTab('refillable')}
          className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'refillable'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          Renouvellement ({refillablePrescriptions.length})
        </button>
        <button
          onClick={() => setActiveTab('expired')}
          className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'expired'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          Expirées ({expiredPrescriptions.length})
        </button>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {displayPrescriptions.length > 0 ? (
          displayPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-white p-6 rounded-lg border-l-4 border-primary shadow-sm hover:shadow-md transition"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side - Drug Info */}
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text">{prescription.medication}</h3>
                      <p className="text-sm text-text-secondary">Prescrit par: Dr. {prescription.doctorName}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Dosage:</span>
                      <span className="font-semibold text-text">{prescription.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Fréquence:</span>
                      <span className="font-semibold text-text">{prescription.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Quantité:</span>
                      <span className="font-semibold text-text">{prescription.quantity} {prescription.unit}</span>
                    </div>
                    {prescription.notes && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 mt-2">
                        <p className="text-sm text-yellow-800">
                          <AlertCircle className="inline w-4 h-4 mr-2" />
                          {prescription.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side - Status & Actions */}
                <div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-text-secondary" />
                      <div>
                        <p className="text-xs text-text-secondary">Prescrit le:</p>
                        <p className="font-semibold text-text">{prescription.prescribedDate}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary mb-1">Expiration:</p>
                      <p className="font-semibold text-text">{prescription.expiryDate}</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="text-sm text-text-secondary">Renouvellements restants:</span>
                      <span className="font-bold text-lg text-primary">{prescription.refillsRemaining}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        prescription.status === 'active'
                          ? 'bg-green-100 text-success'
                          : prescription.status === 'expired'
                          ? 'bg-red-100 text-error'
                          : 'bg-yellow-100 text-warning'
                      }`}
                    >
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm font-semibold flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      Voir
                    </button>
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm font-semibold flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                    {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                      <button className="flex-1 bg-success bg-opacity-10 text-success py-2 rounded-lg hover:bg-opacity-20 transition text-sm font-semibold flex items-center justify-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Renouveler
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-lg border border-border text-center">
            <Pill className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary">
              {activeTab === 'active'
                ? 'Aucune ordonnance active'
                : activeTab === 'refillable'
                ? 'Aucun renouvellement disponible'
                : 'Aucune ordonnance expirée'}
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Ordonnances</p>
          <p className="text-3xl font-bold text-primary">{prescriptions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Actives</p>
          <p className="text-3xl font-bold text-success">{activePrescriptions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Renouvelables</p>
          <p className="text-3xl font-bold text-warning">{refillablePrescriptions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Expirées</p>
          <p className="text-3xl font-bold text-error">{expiredPrescriptions.length}</p>
        </div>
      </div>
    </div>
  );
}
