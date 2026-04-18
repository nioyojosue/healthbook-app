'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { Download, FileText, Eye, Filter, Search } from 'lucide-react';

export default function PatientRecords() {
  const { user } = useAuth();
  const { getPatientById, getConsultationHistoryByPatientId } = useContext(DataContext);

  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const patientData = getPatientById('P001');
    if (patientData) {
      setPatient(patientData);
      const consultations = getConsultationHistoryByPatientId('P001');
      setRecords(consultations);
      setFilteredRecords(consultations);
    }
  }, []);

  useEffect(() => {
    let filtered = records;

    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter((record) => record.type === filterType);
    }

    setFilteredRecords(filtered);
  }, [searchTerm, filterType, records]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text mb-2">Dossier Médical</h1>
        <p className="text-text-secondary">Historique complet de vos consultations et examens</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Chercher dans vos dossiers..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-text-secondary" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tous les types</option>
              <option value="consultation">Consultation</option>
              <option value="examination">Examen</option>
              <option value="lab">Analyse de labo</option>
              <option value="imaging">Imagerie</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{record.type}</h3>
                      <p className="text-sm text-text-secondary">Dr. {record.doctorName}</p>
                    </div>
                  </div>
                  <p className="text-text mb-3">{record.notes}</p>
                  <div className="flex gap-4 text-sm text-text-secondary">
                    <span>📅 {record.date}</span>
                    <span>🏥 {record.hospital || 'Clinique Générale'}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 hover:bg-background rounded-lg transition" title="Voir">
                    <Eye className="w-5 h-5 text-primary" />
                  </button>
                  <button className="p-2 hover:bg-background rounded-lg transition" title="Télécharger">
                    <Download className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-lg border border-border text-center">
            <FileText className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary">Aucun dossier trouvé</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Dossiers</p>
          <p className="text-3xl font-bold text-primary">{records.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Consultations</p>
          <p className="text-3xl font-bold text-success">{records.filter((r) => r.type === 'consultation').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Examens</p>
          <p className="text-3xl font-bold text-warning">{records.filter((r) => r.type === 'examination').length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Analyses</p>
          <p className="text-3xl font-bold text-purple-600">{records.filter((r) => r.type === 'lab').length}</p>
        </div>
      </div>
    </div>
  );
}
