'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { Users, Search, Filter, FileText, Plus, AlertCircle } from 'lucide-react';

export default function HospitalPatients() {
  const { user } = useAuth();
  const { patients } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  useEffect(() => {
    let filtered = patients;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    setFilteredPatients(filtered);
  }, [searchTerm, filterStatus, patients]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Gestion des Patients</h1>
          <p className="text-text-secondary">Supervisez vos patients hospitalisés</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Ajouter Patient
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Chercher un patient..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-text-secondary" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tous les patients</option>
              <option value="active">Hospitalisés</option>
              <option value="inactive">Sortis</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Patient</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Chambre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Médecin</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Admission</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-background transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-text">{patient.name}</p>
                        <p className="text-sm text-text-secondary">{patient.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text">A-{Math.floor(Math.random() * 100)}</td>
                    <td className="px-6 py-4 text-text">Dr. {patient.assignedDoctor}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          patient.status === 'active'
                            ? 'bg-orange-100 text-warning'
                            : 'bg-green-100 text-success'
                        }`}
                      >
                        {patient.status === 'active' ? 'Hospitalisé' : 'Sorti'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text">{new Date().toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4">
                      <button className="text-primary hover:text-primary-dark transition font-semibold text-sm">
                        Voir Dossier
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Users className="w-12 h-12 text-text-light mx-auto mb-4" />
                    <p className="text-text-secondary">Aucun patient trouvé</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Patients</p>
          <p className="text-3xl font-bold text-primary">{patients.length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Hospitalisés</p>
          <p className="text-3xl font-bold text-warning">
            {patients.filter((p) => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Sorties Aujourd'hui</p>
          <p className="text-3xl font-bold text-success">3</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Cas Critiques</p>
          <p className="text-3xl font-bold text-error">2</p>
        </div>
      </div>
    </div>
  );
}
