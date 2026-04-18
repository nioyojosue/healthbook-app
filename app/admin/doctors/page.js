'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { Stethoscope, Search, Filter, Edit, Trash2, Plus, Shield } from 'lucide-react';

export default function AdminDoctors() {
  const { doctors } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    setFilteredDoctors(doctors);
  }, [doctors]);

  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Gestion des Médecins</h1>
          <p className="text-text-secondary">Supervisez tous les médecins du système</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Ajouter Médecin
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Chercher un médecin..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Médecin</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Spécialité</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Hôpital</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-background transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-text">Dr. {doctor.name}</p>
                        <p className="text-sm text-text-secondary">{doctor.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text">{doctor.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {doctor.specialty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text">{doctor.hospital || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          doctor.status === 'active'
                            ? 'bg-green-100 text-success'
                            : 'bg-gray-100 text-text-secondary'
                        }`}
                      >
                        {doctor.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-background rounded-lg transition">
                          <Edit className="w-5 h-5 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-background rounded-lg transition">
                          <Trash2 className="w-5 h-5 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Stethoscope className="w-12 h-12 text-text-light mx-auto mb-4" />
                    <p className="text-text-secondary">Aucun médecin trouvé</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Médecins</p>
          <p className="text-3xl font-bold text-primary">{doctors.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Actifs</p>
          <p className="text-3xl font-bold text-success">{doctors.filter((d) => d.status === 'active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Spécialités</p>
          <p className="text-3xl font-bold text-purple-600">{new Set(doctors.map((d) => d.specialty)).size}</p>
        </div>
      </div>
    </div>
  );
}
