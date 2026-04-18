'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { Building2, Search, Edit, Trash2, Plus, MapPin, Users } from 'lucide-react';

export default function AdminHospitals() {
  const { hospitals } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    setFilteredHospitals(hospitals);
  }, [hospitals]);

  useEffect(() => {
    let filtered = hospitals;

    if (searchTerm) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredHospitals(filtered);
  }, [searchTerm, hospitals]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Gestion des Hôpitaux</h1>
          <p className="text-text-secondary">Supervisez tous les hôpitaux du réseau</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Ajouter Hôpital
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Chercher un hôpital..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-success">
                  Actif
                </span>
              </div>

              <h3 className="text-lg font-semibold text-text mb-2">{hospital.name}</h3>

              <div className="space-y-3 mb-4 py-4 border-y border-border">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{hospital.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{hospital.doctorCount || 12} Médecins</span>
                </div>
                <div className="text-sm">
                  <p className="text-text-secondary">Lits: <span className="font-semibold text-text">{hospital.bedCount}</span></p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm font-semibold">
                  Voir Détails
                </button>
                <button className="p-2 hover:bg-background rounded-lg transition">
                  <Edit className="w-5 h-5 text-primary" />
                </button>
                <button className="p-2 hover:bg-background rounded-lg transition">
                  <Trash2 className="w-5 h-5 text-error" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-12 rounded-lg border border-border text-center">
            <Building2 className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary">Aucun hôpital trouvé</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Hôpitaux</p>
          <p className="text-3xl font-bold text-primary">{hospitals.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Hôpitaux Actifs</p>
          <p className="text-3xl font-bold text-success">{hospitals.filter((h) => h.status === 'active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Lits</p>
          <p className="text-3xl font-bold text-warning">{hospitals.reduce((sum, h) => sum + h.bedCount, 0)}</p>
        </div>
      </div>
    </div>
  );
}
