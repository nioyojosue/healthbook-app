'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { FileText, Download, Eye, Filter, Search, BarChart3, AlertCircle } from 'lucide-react';

export default function PatientReports() {
  const { user } = useAuth();
  const { getConsultationHistoryByPatientId } = useContext(DataContext);

  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Create mock reports from consultation history
    const consultations = getConsultationHistoryByPatientId('P001');
    const mockReports = consultations.map((c) => ({
      ...c,
      id: `REPORT-${c.id}`,
      reportType: ['blood_test', 'xray', 'ultrasound', 'ct_scan'][Math.floor(Math.random() * 4)],
      status: ['completed', 'pending', 'reviewed'][Math.floor(Math.random() * 3)],
      fileSize: Math.floor(Math.random() * 5) + 1,
    }));
    setReports(mockReports);
    setFilteredReports(mockReports);
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.reportType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter((report) => report.reportType === filterType);
    }

    setFilteredReports(filtered);
  }, [searchTerm, filterType, reports]);

  const reportTypeLabels = {
    blood_test: '🩸 Analyse Sanguine',
    xray: '📷 Radiographie',
    ultrasound: '🔊 Échographie',
    ct_scan: '🖼️ Scanner CT',
  };

  const statusColors = {
    completed: 'bg-green-100 text-success',
    pending: 'bg-yellow-100 text-warning',
    reviewed: 'bg-blue-100 text-primary',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text mb-2">Mes Rapports Médicaux</h1>
        <p className="text-text-secondary">Accédez à vos rapports et résultats d'examens</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Chercher dans vos rapports..."
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
              <option value="blood_test">Analyse Sanguine</option>
              <option value="xray">Radiographie</option>
              <option value="ultrasound">Échographie</option>
              <option value="ct_scan">Scanner CT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">
                      {reportTypeLabels[report.reportType]}
                    </h3>
                    <p className="text-sm text-text-secondary">Dr. {report.doctorName}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[report.status]}`}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Date:</span>
                  <span className="font-semibold text-text">{report.date}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Taille du fichier:</span>
                  <span className="font-semibold text-text">{report.fileSize} MB</span>
                </div>

                {report.status === 'completed' && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <span>✓</span>
                      Rapport complété et vérifié
                    </p>
                  </div>
                )}

                {report.status === 'pending' && (
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      En attente de révision médicale
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm font-semibold flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  Consulter
                </button>
                <button className="flex-1 bg-background text-text py-2 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 bg-white p-12 rounded-lg border border-border text-center">
            <BarChart3 className="w-12 h-12 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary">Aucun rapport trouvé</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Total Rapports</p>
          <p className="text-3xl font-bold text-primary">{reports.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Complétés</p>
          <p className="text-3xl font-bold text-success">
            {reports.filter((r) => r.status === 'completed').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">En Attente</p>
          <p className="text-3xl font-bold text-warning">
            {reports.filter((r) => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <p className="text-text-secondary text-sm mb-2">Revus</p>
          <p className="text-3xl font-bold text-purple-600">
            {reports.filter((r) => r.status === 'reviewed').length}
          </p>
        </div>
      </div>
    </div>
  );
}
