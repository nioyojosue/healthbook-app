'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import { BarChart3, TrendingUp, Users, Calendar, Activity, Download } from 'lucide-react';

export default function DoctorAnalysis() {
  const { user } = useAuth();
  const { getAppointmentsByDoctorId, getDoctorStats } = useContext(DataContext);

  const [stats, setStats] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // month, quarter, year

  useEffect(() => {
    const doctorStats = getDoctorStats('D001');
    setStats(doctorStats);
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-text-secondary">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Analyse & Statistiques</h1>
          <p className="text-text-secondary">Analysez vos performances et vos métriques</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Download className="w-5 h-5" />
          Exporter Rapport
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {['month', 'quarter', 'year'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              selectedPeriod === period
                ? 'bg-primary text-white'
                : 'bg-background text-text hover:bg-gray-200'
            }`}
          >
            {period === 'month' ? 'Ce Mois' : period === 'quarter' ? 'Ce Trimestre' : 'Cette Année'}
          </button>
        ))}
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Total Consultations</p>
              <p className="text-4xl font-bold text-primary">{stats.appointmentCount}</p>
              <p className="text-xs text-success mt-2">↑ 12% vs mois précédent</p>
            </div>
            <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">À Venir</p>
              <p className="text-4xl font-bold text-warning">{stats.upcomingCount}</p>
              <p className="text-xs text-text-secondary mt-2">Prochains 30 jours</p>
            </div>
            <div className="p-3 bg-warning bg-opacity-10 rounded-lg">
              <Activity className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Complétées</p>
              <p className="text-4xl font-bold text-success">{stats.completedAppointments.length}</p>
              <p className="text-xs text-text-secondary mt-2">Taux: 96%</p>
            </div>
            <div className="p-3 bg-success bg-opacity-10 rounded-lg">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Satisfaction</p>
              <p className="text-4xl font-bold text-primary">4.8/5</p>
              <p className="text-xs text-success mt-2">↑ 0.3 points</p>
            </div>
            <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultation Trend */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Tendance des Consultations</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {[45, 52, 48, 65, 73, 58, 72, 81, 76, 88, 92, 85].map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t"
                  style={{ height: `${(value / 100) * 100}%` }}
                ></div>
                <span className="text-xs text-text-secondary mt-2">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Status Distribution */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Distribution des Statuts</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary">Complétées</span>
                <span className="font-semibold text-primary">48 (60%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary">Confirmées</span>
                <span className="font-semibold text-primary">20 (25%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary">En Attente</span>
                <span className="font-semibold text-primary">12 (15%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Insights */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-text mb-4">Insights Patients</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-text-secondary text-sm mb-2">Patient le Plus Fréquent</p>
            <p className="text-lg font-semibold text-text">Jean Dupont</p>
            <p className="text-xs text-text-light mt-1">8 consultations</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-text-secondary text-sm mb-2">Heure de Pointe</p>
            <p className="text-lg font-semibold text-text">14:00 - 16:00</p>
            <p className="text-xs text-text-light mt-1">45% des rendez-vous</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-text-secondary text-sm mb-2">Taux de No-Show</p>
            <p className="text-lg font-semibold text-text">4%</p>
            <p className="text-xs text-text-light mt-1">↓ 2% vs mois précédent</p>
          </div>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-text">Performances Détaillées</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Métrique</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Ce Mois</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Mois Précédent</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Variation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-background transition">
                <td className="px-6 py-4 text-text">Consultations totales</td>
                <td className="px-6 py-4 font-semibold text-text">{stats.appointmentCount}</td>
                <td className="px-6 py-4 text-text-secondary">72</td>
                <td className="px-6 py-4">
                  <span className="text-success font-semibold">↑ 12%</span>
                </td>
              </tr>
              <tr className="hover:bg-background transition">
                <td className="px-6 py-4 text-text">Durée moyenne (min)</td>
                <td className="px-6 py-4 font-semibold text-text">28</td>
                <td className="px-6 py-4 text-text-secondary">25</td>
                <td className="px-6 py-4">
                  <span className="text-warning font-semibold">↑ 12%</span>
                </td>
              </tr>
              <tr className="hover:bg-background transition">
                <td className="px-6 py-4 text-text">Patients uniques</td>
                <td className="px-6 py-4 font-semibold text-text">18</td>
                <td className="px-6 py-4 text-text-secondary">16</td>
                <td className="px-6 py-4">
                  <span className="text-success font-semibold">↑ 12%</span>
                </td>
              </tr>
              <tr className="hover:bg-background transition">
                <td className="px-6 py-4 text-text">Prescriptions</td>
                <td className="px-6 py-4 font-semibold text-text">24</td>
                <td className="px-6 py-4 text-text-secondary">20</td>
                <td className="px-6 py-4">
                  <span className="text-success font-semibold">↑ 20%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
