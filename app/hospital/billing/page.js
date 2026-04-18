'use client';

import { useState } from 'react';
import { DollarSign, Search, Filter, Eye, Download, Plus } from 'lucide-react';

export default function HospitalBilling() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const bills = [
    { id: 1, patient: 'Jean Dupont', amount: 2500, date: '2026-01-15', status: 'paid', invoice: 'INV-001' },
    { id: 2, patient: 'Marie Laurent', amount: 1800, date: '2026-01-16', status: 'pending', invoice: 'INV-002' },
    { id: 3, patient: 'Paul Martin', amount: 3200, date: '2026-01-10', status: 'paid', invoice: 'INV-003' },
    { id: 4, patient: 'Sophie Moreau', amount: 950, date: '2026-01-12', status: 'overdue', invoice: 'INV-004' },
    { id: 5, patient: 'Luc Bernard', amount: 2100, date: '2026-01-08', status: 'pending', invoice: 'INV-005' },
  ];

  const filteredBills = bills.filter((bill) => {
    const matchSearch = bill.patient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'all' || bill.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = bills.filter((b) => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0);
  const pendingAmount = bills.filter((b) => b.status === 'pending').reduce((sum, b) => sum + b.amount, 0);
  const overdueAmount = bills.filter((b) => b.status === 'overdue').reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Facturation</h1>
          <p className="text-text-secondary">Gérez les factures et paiements</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Nouvelle Facture
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Total Factures</p>
              <p className="text-3xl font-bold text-primary">${totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">Payées</p>
              <p className="text-3xl font-bold text-success">${paidAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-success" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">En Attente</p>
              <p className="text-3xl font-bold text-warning">${pendingAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-warning" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-2">En Retard</p>
              <p className="text-3xl font-bold text-error">${overdueAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-error" />
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Chercher une facture..."
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
              <option value="all">Tous les statuts</option>
              <option value="paid">Payées</option>
              <option value="pending">En Attente</option>
              <option value="overdue">En Retard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Facture</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Patient</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Montant</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-background transition">
                  <td className="px-6 py-4 font-semibold text-text">{bill.invoice}</td>
                  <td className="px-6 py-4 text-text">{bill.patient}</td>
                  <td className="px-6 py-4 text-text">{new Date(bill.date).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 font-semibold text-text">${bill.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        bill.status === 'paid'
                          ? 'bg-green-100 text-success'
                          : bill.status === 'pending'
                          ? 'bg-yellow-100 text-warning'
                          : 'bg-red-100 text-error'
                      }`}
                    >
                      {bill.status === 'paid' ? 'Payée' : bill.status === 'pending' ? 'En Attente' : 'En Retard'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary hover:text-primary-dark transition">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-primary hover:text-primary-dark transition">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
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
