'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/lib/context';
import { departments } from '@/data/mockData';
import type { AuditCycle } from '@/lib/types';

const statusConfig: Record<string, { color: string; bg: string }> = {
  'Planning': { color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30' },
  'In Progress': { color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30' },
  'Completed': { color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30' },
};

const itemStatusConfig: Record<string, { icon: string; color: string }> = {
  'Verified': { icon: '✅', color: 'text-emerald-400' },
  'Missing': { icon: '❌', color: 'text-red-400' },
  'Damaged': { icon: '⚠️', color: 'text-amber-400' },
  'Mislocated': { icon: '📍', color: 'text-violet-400' },
  'Pending': { icon: '⏳', color: 'text-slate-400' },
};

export default function AuditsPage() {
  const { auditCycles, auditItems, addAuditCycle, currentUser } = useApp();
  const [showModal, setShowModal] = useState(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newCycle: AuditCycle = {
      id: `audit-${Date.now()}`,
      name: fd.get('name') as string,
      scope: fd.get('scope') as string,
      departmentId: fd.get('department') as string,
      department: departments.find(d => d.id === fd.get('department'))?.name || null,
      status: 'Planning',
      assignedAuditors: [currentUser?.name || 'Admin'],
      totalAssets: 0,
      verifiedCount: 0,
      discrepancyCount: 0,
      complianceScore: 100,
      startDate: new Date().toISOString(),
      endDate: null,
      createdAt: new Date().toISOString(),
    };
    addAuditCycle(newCycle);
    setShowModal(false);
  };

  return (
    <>
      <Header title="Audits" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between opacity-0 animate-fadeInUp">
          <div>
            <h2 className="text-2xl font-bold text-white">📋 Audit Management</h2>
            <p className="text-sm text-slate-500">{auditCycles.length} audit cycles · {auditItems.length} items</p>
          </div>
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            + Create Audit Cycle
          </button>
        </div>

        {/* Audit Cycles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 opacity-0 animate-fadeInUp delay-100">
          {auditCycles.map(cycle => {
            const cfg = statusConfig[cycle.status];
            const items = auditItems.filter(i => i.auditCycleId === cycle.id);
            const verified = items.filter(i => i.status === 'Verified').length;
            const missing = items.filter(i => i.status === 'Missing').length;
            const damaged = items.filter(i => i.status === 'Damaged').length;
            const mislocated = items.filter(i => i.status === 'Mislocated').length;
            const pending = items.filter(i => i.status === 'Pending').length;
            const progress = cycle.totalAssets > 0 ? ((cycle.totalAssets - pending) / cycle.totalAssets) * 100 : 0;

            return (
              <div key={cycle.id} className={`glass-card p-6 border ${cfg.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-white">{cycle.name}</h3>
                  <span className={`badge border ${cfg.bg} ${cfg.color}`}>{cycle.status}</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Scope: {cycle.scope}{cycle.department ? ` — ${cycle.department}` : ''}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className={cfg.color}>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${
                      cycle.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`} style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-5 gap-1 mb-4">
                  {[
                    { label: '✅', count: verified, color: 'text-emerald-400' },
                    { label: '❌', count: missing, color: 'text-red-400' },
                    { label: '⚠️', count: damaged, color: 'text-amber-400' },
                    { label: '📍', count: mislocated, color: 'text-violet-400' },
                    { label: '⏳', count: pending, color: 'text-slate-400' },
                  ].map(s => (
                    <div key={s.label} className="text-center bg-white/3 rounded-lg py-1.5">
                      <span className="text-sm">{s.label}</span>
                      <p className={`text-xs font-bold ${s.color}`}>{s.count}</p>
                    </div>
                  ))}
                </div>

                {/* Compliance Score */}
                <div className="flex items-center justify-between py-2 border-t border-white/5">
                  <span className="text-xs text-slate-500">Compliance Score</span>
                  <span className={`text-lg font-bold ${
                    cycle.complianceScore >= 90 ? 'text-emerald-400' :
                    cycle.complianceScore >= 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>{cycle.complianceScore}%</span>
                </div>
                <p className="text-[10px] text-slate-600">Started: {new Date(cycle.startDate).toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>

        {/* Department Compliance */}
        <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-300">
          <h3 className="text-base font-semibold text-white mb-4">Department Compliance Scores</h3>
          <div className="space-y-3">
            {departments.map((dept, i) => {
              const score = Math.max(60, Math.min(100, 95 - i * 5 + Math.floor(Math.random() * 10)));
              return (
                <div key={dept.id} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-24">{dept.name}</span>
                  <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      score >= 90 ? 'bg-emerald-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} style={{ width: `${score}%` }} />
                  </div>
                  <span className={`text-xs w-10 text-right font-semibold ${
                    score >= 90 ? 'text-emerald-400' : score >= 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>{score}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Items Table */}
        <div className="glass-card overflow-hidden opacity-0 animate-fadeInUp delay-400">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-base font-semibold text-white">Recent Audit Items</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-white/5 bg-white/[0.02]">
                  <th className="px-4 py-3 font-medium">Asset</th>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Auditor</th>
                  <th className="px-4 py-3 font-medium">Scanned</th>
                </tr>
              </thead>
              <tbody>
                {auditItems.slice(0, 15).map(item => {
                  const cfg = itemStatusConfig[item.status];
                  return (
                    <tr key={item.id} className="border-b border-white/3 table-row-hover">
                      <td className="px-4 py-3 text-sm text-white">
                        <Link href={`/assets/${item.assetId}`} className="hover:text-blue-400 transition-colors">{item.assetName}</Link>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-blue-400">
                        <Link href={`/assets/${item.assetId}`} className="hover:text-blue-300 transition-colors">{item.assetAssetId}</Link>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{item.expectedLocation}</td>
                      <td className="px-4 py-3">
                        <span className={cfg.color}>{cfg.icon} {item.status}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{item.auditorName || '—'}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{item.scannedAt ? new Date(item.scannedAt).toLocaleDateString() : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Audit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleCreate} className="glass-card p-6 w-full max-w-md animate-fadeIn">
              <h3 className="text-lg font-semibold text-white mb-4">Create Audit Cycle</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Cycle Name</label>
                  <input name="name" type="text" placeholder="e.g. Q3 IT Hardware Audit" required className="glass-input w-full px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Scope</label>
                  <select name="scope" required className="glass-input w-full px-3 py-2 text-sm">
                    <option value="Department">Department Specific</option>
                    <option value="Location">Location Specific</option>
                    <option value="Category">Category Specific</option>
                    <option value="Full">Full Organization</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Target Department (if applicable)</label>
                  <select name="department" className="glass-input w-full px-3 py-2 text-sm">
                    <option value="">None</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl">Create Cycle</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
