'use client';

import { useContext, useState } from 'react';
import { DataContext } from '@/lib/data-context';
import { BarChart3, TrendingUp, Users, Building2, Download } from 'lucide-react';

export default function AdminAnalytics() {
  const { patients, doctors, hospitals, appointments } = useContext(DataContext);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Analytiques Système</h1>
          <p className="text-text-secondary">Analysez les performances globales du système</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Download className="w-5 h-5" />
          Exporter Rapport
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {['week', 'month', 'year'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              selectedPeriod === period ? 'bg-primary text-white' : 'bg-background text-text'
            }`}
          >
            {period === 'week' ? 'Semaine' : period === 'month' ? 'Mois' : 'Année'}
          </button>
        ))}
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Total Utilisateurs</p>
              <p className="text-4xl font-bold text-primary">{patients.length + doctors.length}</p>
              <p className="text-xs text-success mt-2">↑ 12% ce mois</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Total Consultations</p>
              <p className="text-4xl font-bold text-warning">{appointments.length}</p>
              <p className="text-xs text-text-secondary mt-2">Ce mois</p>
            </div>
            <BarChart3 className="w-8 h-8 text-warning" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Hôpitaux Actifs</p>
              <p className="text-4xl font-bold text-success">{hospitals.length}</p>
              <p className="text-xs text-text-secondary mt-2">Dans le réseau</p>
            </div>
            <Building2 className="w-8 h-8 text-success" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Taux d'Activité</p>
              <p className="text-4xl font-bold text-primary">87%</p>
              <p className="text-xs text-success mt-2">↑ 5%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Croissance des Utilisateurs</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {[45, 52, 48, 65, 73, 58, 72, 81, 76, 88, 92, 95].map((value, idx) => (
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

        {/* User Breakdown */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Distribution des Utilisateurs</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary">Patients</span>
                <span className="font-semibold text-primary">{patients.length} ({Math.round((patients.length / (patients.length + doctors.length)) * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-success h-3 rounded-full" style={{ width: `${(patients.length / (patients.length + doctors.length)) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary">Médecins</span>
                <span className="font-semibold text-primary">{doctors.length} ({Math.round((doctors.length / (patients.length + doctors.length)) * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-primary h-3 rounded-full" style={{ width: `${(doctors.length / (patients.length + doctors.length)) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-text">Métriques Globales</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Métrique</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Valeur</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Variation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-background transition">
                <td className="px-6 py-4 font-semibold text-text">Patients Actifs</td>
                <td className="px-6 py-4 text-3xl font-bold text-primary">{patients.filter((p) => p.status === 'active').length}</td>
                <td className="px-6 py-4">
                  <span className="text-success font-semibold">↑ 8%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-semibold">Excellent</span>
                </td>
              </tr>
              <tr className="hover:bg-background transition">
                <td className="px-6 py-4 font-semibold text-text">Consultations Ce Mois</td>
                <td className="px-6 py-4 text-3xl font-bold text-primary">{appointments.length}</td>
                <td className="px-6 py-4">
                  <span className="text-success font-semibold">↑ 15%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-semibold">En croissance</span>
                </td>
              </tr>
              <tr className="hover:bg-background transition">
                <td className="px-6 py-4 font-semibold text-text">Médecins Certifiés</td>
                <td className="px-6 py-4 text-3xl font-bold text-primary">{doctors.filter((d) => d.status === 'active').length}</td>
                <td className="px-6 py-4">
                  <span className="text-success font-semibold">↑ 3%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-semibold">Stable</span>
                </td>
              </tr>
              <tr className="hover:bg-background transition">
                <td className="px-6 py-4 font-semibold text-text">Hôpitaux Partenaires</td>
                <td className="px-6 py-4 text-3xl font-bold text-primary">{hospitals.length}</td>
                <td className="px-6 py-4">
                  <span className="text-text-secondary">–</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-semibold">Normal</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-text mb-4">Activité Récente du Système</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-3 hover:bg-background rounded-lg transition">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-text">Nouveau patient enregistré</p>
              <p className="text-xs text-text-secondary">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 hover:bg-background rounded-lg transition">
            <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-text">Consultation complétée</p>
              <p className="text-xs text-text-secondary">Il y a 45 minutes</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 hover:bg-background rounded-lg transition">
            <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-text">Nouvelle prescription créée</p>
              <p className="text-xs text-text-secondary">Il y a 30 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
