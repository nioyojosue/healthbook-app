'use client';

import { useState } from 'react';
import { FileText, Download, Filter, Search } from 'lucide-react';

export default function HospitalReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const reports = [
    { id: 1, name: 'Rapport Mensuel Janvier', date: '2026-01-31', type: 'monthly', size: '2.4MB' },
    { id: 2, name: 'Rapport Occupancy Décembre', date: '2025-12-31', type: 'occupancy', size: '1.8MB' },
    { id: 3, name: 'Rapport Financier Q4', date: '2025-12-31', type: 'financial', size: '3.1MB' },
    { id: 4, name: 'Rapport Sécurité', date: '2025-12-15', type: 'security', size: '0.9MB' },
    { id: 5, name: 'Audit Externe', date: '2025-11-30', type: 'audit', size: '2.7MB' },
    { id: 6, name: 'Rapport RH', date: '2025-11-30', type: 'hr', size: '1.5MB' },
  ];

  const filteredReports = reports.filter((report) => {
    const matchSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterType === 'all' || report.type === filterType;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text mb-2">Rapports Hôpital</h1>
        <p className="text-text-secondary">Accédez à tous les rapports générés</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Chercher un rapport..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-text-secondary" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tous les types</option>
              <option value="monthly">Mensuel</option>
              <option value="occupancy">Occupation</option>
              <option value="financial">Financier</option>
              <option value="security">Sécurité</option>
              <option value="audit">Audit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">{report.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-text-secondary">
                    <span>📅 {new Date(report.date).toLocaleDateString('fr-FR')}</span>
                    <span>📦 {report.size}</span>
                  </div>
                </div>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
