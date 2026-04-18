'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { Heart, Droplet, TrendingUp, AlertCircle, QrCode, Download, Share2 } from 'lucide-react';

export default function PatientMedicalCard() {
  const { user } = useAuth();
  const { getPatientById } = useContext(DataContext);

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const patientData = getPatientById('P001');
    if (patientData) {
      setPatient(patientData);
    }
  }, []);

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-text-secondary">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text mb-2">Carte Médicale</h1>
        <p className="text-text-secondary">Votre carte d'identité médicale numérique</p>
      </div>

      {/* Main Card */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -ml-16 -mb-16"></div>

        <div className="relative">
          {/* Top Section */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-sm opacity-75 mb-2">PATIENT ID</p>
              <p className="text-2xl font-bold tracking-wider">{patient.id}</p>
            </div>
            <Heart className="w-12 h-12" />
          </div>

          {/* Middle Section */}
          <div className="mb-12">
            <p className="text-sm opacity-75 mb-2">NOM DU PATIENT</p>
            <p className="text-3xl font-bold mb-6">{patient.name}</p>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs opacity-75">ÂGE</p>
                <p className="text-lg font-semibold">{patient.age}</p>
              </div>
              <div>
                <p className="text-xs opacity-75">SEXE</p>
                <p className="text-lg font-semibold">{patient.gender}</p>
              </div>
              <div>
                <p className="text-xs opacity-75">GROUPE SANGUIN</p>
                <p className="text-2xl font-bold">{patient.bloodType}</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-75 mb-1">MÉDECIN ASSIGNÉ</p>
              <p className="text-lg font-semibold">Dr. {patient.assignedDoctor}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-75 mb-1">VALIDE JUSQU'AU</p>
              <p className="text-lg font-semibold">12/2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Vital Signs */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Heart className="w-6 h-6 text-error" />
            </div>
            <h3 className="text-lg font-semibold text-text">Signes Vitaux</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Tension:</span>
              <span className="font-semibold">{patient.vitalSigns.bloodPressure}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Cœur:</span>
              <span className="font-semibold">{patient.vitalSigns.heartRate} bpm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Temp:</span>
              <span className="font-semibold">{patient.vitalSigns.temperature}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">SpO2:</span>
              <span className="font-semibold">{patient.vitalSigns.oxygenSaturation}%</span>
            </div>
          </div>
        </div>

        {/* Blood Type & Allergies */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Droplet className="w-6 h-6 text-error" />
            </div>
            <h3 className="text-lg font-semibold text-text">Informations</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-text-secondary text-sm mb-1">Groupe Sanguin:</p>
              <p className="text-2xl font-bold text-primary">{patient.bloodType}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-2">Allergies:</p>
              <div className="flex flex-wrap gap-2">
                {patient.allergies && patient.allergies.length > 0 ? (
                  patient.allergies.map((allergy, idx) => (
                    <span key={idx} className="bg-error bg-opacity-10 text-error px-2 py-1 rounded text-xs">
                      {allergy}
                    </span>
                  ))
                ) : (
                  <span className="text-text-secondary text-sm">Aucune allergie signalée</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-text">Antécédents</h3>
          </div>
          <div className="space-y-2">
            {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
              patient.medicalHistory.map((history, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-text-secondary text-sm">{history}</span>
                </div>
              ))
            ) : (
              <p className="text-text-secondary text-sm">Aucun antécédent</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact & Emergency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Informations de Contact</h3>
          <div className="space-y-3">
            <div>
              <p className="text-text-secondary text-sm">Email:</p>
              <p className="font-semibold text-text break-all">{patient.email}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">Téléphone:</p>
              <p className="font-semibold text-text">{patient.phone}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">Adresse:</p>
              <p className="font-semibold text-text">{patient.address || 'Non fournie'}</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Contact d'Urgence</h3>
          <div className="space-y-3">
            <div>
              <p className="text-text-secondary text-sm">Nom:</p>
              <p className="font-semibold text-text">{patient.emergencyContact?.name || 'Non fourni'}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">Relation:</p>
              <p className="font-semibold text-text">{patient.emergencyContact?.relation || 'N/A'}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">Téléphone:</p>
              <p className="font-semibold text-text">{patient.emergencyContact?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="bg-white p-8 rounded-lg border border-border shadow-sm text-center">
        <h3 className="text-lg font-semibold text-text mb-6">Code QR - Partage Sécurisé</h3>
        <div className="flex justify-center mb-6">
          <div className="bg-background p-6 rounded-lg">
            <QrCode className="w-32 h-32 text-primary mx-auto" />
          </div>
        </div>
        <p className="text-text-secondary mb-4 max-w-md mx-auto">
          Partagez votre code QR avec les professionnels de santé pour un accès sécurisé à votre dossier
        </p>
        <div className="flex gap-2 justify-center">
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition font-semibold flex items-center gap-2">
            <Download className="w-4 h-4" />
            Télécharger QR
          </button>
          <button className="bg-background text-text px-6 py-2 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Partager
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 Gardez cette carte à portée de main en cas d'urgence. Vous pouvez la partager avec les
          professionnels de santé pour un accès rapide à vos informations médicales essentielles.
        </p>
      </div>
    </div>
  );
}
