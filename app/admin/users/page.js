'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { Users, Search, Filter, Edit, Trash2, Plus, Shield, AlertCircle } from 'lucide-react';

export default function AdminUsers() {
  const { getAllUsers } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
    setFilteredUsers(allUsers);
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter((u) => u.role === filterRole);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterRole, users]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Gestion des Utilisateurs</h1>
          <p className="text-text-secondary">Supervisez tous les utilisateurs du système</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Ajouter Utilisateur
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Chercher un utilisateur..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-text-secondary" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tous les rôles</option>
              <option value="patient">Patient</option>
              <option value="doctor">Médecin</option>
              <option value="hospital">Hôpital</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Utilisateur</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Rôle</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Inscription</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-background transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-text">{user.name}</p>
                        <p className="text-sm text-text-secondary">{user.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary bg-opacity-10 text-primary capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active'
                            ? 'bg-green-100 text-success'
                            : user.status === 'inactive'
                            ? 'bg-gray-100 text-text-secondary'
                            : 'bg-red-100 text-error'
                        }`}
                      >
                        {user.status === 'active' ? 'Actif' : user.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text text-sm">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-background rounded-lg transition" title="Éditer">
                          <Edit className="w-5 h-5 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-background rounded-lg transition" title="Supprimer">
                          <Trash2 className="w-5 h-5 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Users className="w-12 h-12 text-text-light mx-auto mb-4" />
                    <p className="text-text-secondary">Aucun utilisateur trouvé</p>
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
          <p className="text-text-secondary text-sm mb-2">Total Utilisateurs</p>
          <p className="text-3xl font-bold text-primary">{users.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Actifs</p>
          <p className="text-3xl font-bold text-success">{users.filter((u) => u.status === 'active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Inactifs</p>
          <p className="text-3xl font-bold text-warning">{users.filter((u) => u.status === 'inactive').length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Suspendus</p>
          <p className="text-3xl font-bold text-error">{users.filter((u) => u.status === 'suspended').length}</p>
        </div>
      </div>
    </div>
  );
}
