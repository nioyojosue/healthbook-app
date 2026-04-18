'use client';

import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@/lib/data-context';
import { BarChart3, TrendingUp, Bed, Users, Download } from 'lucide-react';

export default function HospitalStatistics() {
  const { hospitals } = useContext(DataContext);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Statistiques Hôpital</h1>
          <p className="text-text-secondary">Analysez les performances de votre hôpital</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Download className="w-5 h-5" />
          Exporter
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

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Taux d'Occupation</p>
              <p className="text-4xl font-bold text-primary">78%</p>
              <p className="text-xs text-success mt-2">↑ 5% vs semaine précédente</p>
            </div>
            <Bed className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Admissions</p>
              <p className="text-4xl font-bold text-warning">24</p>
              <p className="text-xs text-text-secondary mt-2">Ce mois</p>
            </div>
            <Users className="w-8 h-8 text-warning" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Sorties</p>
              <p className="text-4xl font-bold text-success">18</p>
              <p className="text-xs text-text-secondary mt-2">Ce mois</p>
            </div>
            <TrendingUp className="w-8 h-8 text-success" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Lits Disponibles</p>
              <p className="text-4xl font-bold text-primary">22</p>
              <p className="text-xs text-text-secondary mt-2">Sur 100</p>
            </div>
            <Bed className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Occupation par Département</h3>
          <div className="space-y-4">
            {['Urgences', 'Cardiologie', 'Neurologie', 'Orthopédie'].map((dept, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-text-secondary">{dept}</span>
                  <span className="font-semibold text-text">{75 + idx * 3}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full"
                    style={{ width: `${75 + idx * 3}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Tendance Mensuelle</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {[65, 72, 78, 75, 82, 88, 85, 90, 87, 92, 89, 94].map((value, idx) => (
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
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-text">Statistiques Détaillées</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Département</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Patients</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Lits</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Occupation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Taux Satisf.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {['Urgences', 'Cardiologie', 'Neurologie', 'Orthopédie'].map((dept, idx) => (
                <tr key={idx} className="hover:bg-background transition">
                  <td className="px-6 py-4 font-semibold text-text">{dept}</td>
                  <td className="px-6 py-4 text-text">{18 + idx * 2}</td>
                  <td className="px-6 py-4 text-text">24</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-primary">{78 + idx * 2}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-success">92%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
