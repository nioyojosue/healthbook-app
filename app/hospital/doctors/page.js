'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { Stethoscope, Search, Filter, Phone, MessageSquare, FileText, Plus, Star, TrendingUp } from 'lucide-react';

export default function HospitalDoctors() {
  const { user } = useAuth();
  const { doctors } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  const specialties = ['all', ...new Set(doctors.map((d) => d.specialty))];

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
          d.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSpecialty !== 'all') {
      filtered = filtered.filter((d) => d.specialty === filterSpecialty);
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, filterSpecialty, doctors]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Gestion des Médecins</h1>
          <p className="text-text-secondary">Gérez et supervisez vos médecins</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Ajouter Médecin
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-text-secondary" />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'Toutes les spécialités' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-lg">
                  {doctor.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="text-sm font-semibold text-text">4.8</span>
                </div>
              </div>

              {/* Doctor Info */}
              <h3 className="text-lg font-semibold text-text mb-1">Dr. {doctor.name}</h3>
              <p className="text-sm text-primary font-semibold mb-2">{doctor.specialty}</p>
              <p className="text-sm text-text-secondary mb-4">{doctor.email}</p>

              {/* Stats */}
              <div className="space-y-2 mb-4 py-4 border-y border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Patients:</span>
                  <span className="font-semibold text-text">24</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Consultations/mois:</span>
                  <span className="font-semibold text-text">18</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Disponibilité:</span>
                  <span className="font-semibold text-success">92%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm font-semibold">
                  Voir Profil
                </button>
                <button className="p-2 hover:bg-background rounded-lg transition">
                  <Phone className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-12 rounded-lg border border-border text-center">
            <Stethoscope className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary">Aucun médecin trouvé</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Médecins</p>
          <p className="text-3xl font-bold text-primary">{doctors.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Médecins Actifs</p>
          <p className="text-3xl font-bold text-success">
            {doctors.filter((d) => d.status === 'active').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Spécialités</p>
          <p className="text-3xl font-bold text-warning">{specialties.length - 1}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Taux de satisfaction</p>
          <p className="text-3xl font-bold text-purple-600">94%</p>
        </div>
      </div>
    </div>
  );
}
