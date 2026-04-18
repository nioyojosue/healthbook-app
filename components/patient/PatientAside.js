import React from 'react';

export function AsideSection({ title, icon, count, isActive = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'bg-background text-text hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      {count !== undefined && (
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold ${
            isActive
              ? 'bg-white text-primary'
              : 'bg-primary text-white'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function MedicalRecordsPanel({ records = [] }) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-text mb-3">Dossiers médicaux</h4>
      {records.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-4">Aucun dossier</p>
      ) : (
        records.map((record, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
          >
            <p className="text-sm font-medium text-text">{record.title}</p>
            <p className="text-xs text-text-secondary mt-1">{record.date}</p>
            <p className="text-xs text-text-secondary">{record.doctor}</p>
          </div>
        ))
      )}
    </div>
  );
}

export function ConsultationHistoryPanel({ consultations = [] }) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-text mb-3">Historique des consultations</h4>
      {consultations.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-4">Aucune consultation</p>
      ) : (
        consultations.map((consultation, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg p-3 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-text">{consultation.type}</p>
              <span className="text-xs bg-info text-white px-2 py-1 rounded">
                {consultation.date}
              </span>
            </div>
            <p className="text-xs text-text-secondary">Dr. {consultation.doctor}</p>
            <p className="text-xs text-text mt-2">{consultation.diagnosis}</p>
          </div>
        ))
      )}
    </div>
  );
}

export function PrescriptionPanel({ prescriptions = [] }) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-text mb-3">Prescriptions médicales</h4>
      {prescriptions.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-4">Aucune prescription</p>
      ) : (
        prescriptions.map((prescription, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg p-3 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-text">{prescription.id}</p>
              <span
                className={`text-xs px-2 py-1 rounded font-medium ${
                  prescription.status === 'active'
                    ? 'bg-success text-white'
                    : 'bg-warning text-white'
                }`}
              >
                {prescription.status === 'active' ? 'Actif' : 'Expiré'}
              </span>
            </div>
            <div className="space-y-2">
              {prescription.medications.map((med, medIdx) => (
                <div key={medIdx} className="text-xs">
                  <p className="font-medium text-text">{med.name} {med.dose}</p>
                  <p className="text-text-secondary">{med.frequency}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-secondary mt-3">
              Prescrit le: {prescription.date}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export function MedicalReportsPanel({ reports = [] }) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-text mb-3">Rapports médicaux</h4>
      {reports.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-4">Aucun rapport</p>
      ) : (
        reports.map((report, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-text">{report.title}</p>
              <span className="text-lg">📄</span>
            </div>
            <p className="text-xs text-text-secondary">{report.type}</p>
            <p className="text-xs text-text-secondary mt-1">{report.date}</p>
            <div className="mt-2 pt-2 border-t border-border">
              <button className="text-xs text-primary font-medium hover:underline">
                Télécharger
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export function MedicalCardPanel({ patient }) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-text mb-3">Carte médicale</h4>
      <div className="border-2 border-primary rounded-lg p-4 bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs opacity-75">HealthBook</p>
            <p className="text-lg font-bold">Carte Médicale</p>
          </div>
          <span className="text-3xl">🏥</span>
        </div>

        {/* Patient Info */}
        <div className="mb-4 pb-4 border-b border-white border-opacity-25">
          <p className="text-xs opacity-75">Nom Complet</p>
          <p className="font-semibold text-lg">{patient?.name}</p>
        </div>

        {/* Medical Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs opacity-75">Groupe Sanguin</p>
            <p className="font-bold">{patient?.bloodType}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Âge</p>
            <p className="font-bold">{patient?.age} ans</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Sexe</p>
            <p className="font-bold">{patient?.gender}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">ID Patient</p>
            <p className="font-bold text-xs">{patient?.id}</p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-4 pt-4 border-t border-white border-opacity-25">
          <p className="text-xs opacity-75">Médecin Assigné</p>
          <p className="font-semibold">À consulter</p>
        </div>
      </div>

      {/* Important Info */}
      <div className="bg-warning bg-opacity-10 border border-warning rounded-lg p-3">
        <p className="text-xs font-semibold text-warning mb-2">⚠️ Allergies/Avertissements</p>
        <p className="text-xs text-text-secondary">
          {patient?.medicalHistory?.length > 0
            ? `Antécédents: ${patient.medicalHistory.join(', ')}`
            : 'Aucune allergie connue'}
        </p>
      </div>
    </div>
  );
}

export function SidebarAside({ activeTab, onTabChange, patient, consultations, prescriptions, reports }) {
  const sections = [
    {
      id: 'dashboard',
      title: 'Tableau de bord',
      icon: '📊',
      count: null,
    },
    {
      id: 'records',
      title: 'Dossiers',
      icon: '📋',
      count: 5,
    },
    {
      id: 'consultations',
      title: 'Consultations',
      icon: '🔍',
      count: consultations?.length || 0,
    },
    {
      id: 'prescriptions',
      title: 'Prescriptions',
      icon: '💊',
      count: prescriptions?.length || 0,
    },
    {
      id: 'reports',
      title: 'Rapports',
      icon: '📄',
      count: reports?.length || 0,
    },
    {
      id: 'card',
      title: 'Carte médicale',
      icon: '🎫',
      count: null,
    },
  ];

  return (
    <aside className="lg:col-span-1 space-y-3">
      {/* Navigation Sections */}
      <div className="bg-white rounded-lg border border-border p-4 space-y-2">
        {sections.map((section) => (
          <AsideSection
            key={section.id}
            title={section.title}
            icon={section.icon}
            count={section.count}
            isActive={activeTab === section.id}
            onClick={() => onTabChange(section.id)}
          />
        ))}
      </div>

      {/* Content Panel */}
      <div className="bg-white rounded-lg border border-border p-4 min-h-96">
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-text">Accueil</h4>
            <p className="text-sm text-text-secondary">
              Bienvenue sur votre espace patient. Sélectionnez une section pour accéder à vos informations médicales.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-primary bg-opacity-10 rounded-lg p-3">
                <p className="text-2xl">👁️</p>
                <p className="text-xs font-medium text-text mt-2">Consultations</p>
              </div>
              <div className="bg-success bg-opacity-10 rounded-lg p-3">
                <p className="text-2xl">💊</p>
                <p className="text-xs font-medium text-text mt-2">Prescriptions</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && <MedicalRecordsPanel records={[]} />}
        {activeTab === 'consultations' && <ConsultationHistoryPanel consultations={consultations} />}
        {activeTab === 'prescriptions' && <PrescriptionPanel prescriptions={prescriptions} />}
        {activeTab === 'reports' && <MedicalReportsPanel reports={reports} />}
        {activeTab === 'card' && <MedicalCardPanel patient={patient} />}
      </div>
    </aside>
  );
}
