'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import { departments, assetHistory, aiPredictions } from '@/data/mockData';
import { useState, useEffect } from 'react';

function formatDate(dateStr: string) {
  // Stable date format that won't cause hydration mismatch
  const d = new Date(dateStr);
  const day = d.getUTCDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const mon = months[d.getUTCMonth()];
  const yr = d.getUTCFullYear();
  return `${day} ${mon} ${yr}`;
}

// Monthly maintenance trends (simulated)
const maintenanceTrends = [
  { month: 'Jan', count: 8 },
  { month: 'Feb', count: 12 },
  { month: 'Mar', count: 6 },
  { month: 'Apr', count: 15 },
  { month: 'May', count: 10 },
  { month: 'Jun', count: 18 },
  { month: 'Jul', count: 7 },
];

// Overdue returns (simulated)
const overdueReturns = [
  { asset: 'Laptop AF-000012', assetId: 'asset-12', owner: 'Vikram Patel', days: 5, urgency: 'high' as const },
  { asset: 'Projector AF-000031', assetId: 'asset-31', owner: 'Sneha Iyer', days: 3, urgency: 'medium' as const },
  { asset: 'Monitor AF-000019', assetId: 'asset-19', owner: 'Arjun Mehta', days: 1, urgency: 'low' as const },
];

function KpiCard({ label, value, icon, color, percentage, delay }: { label: string; value: number; icon: string; color: string; percentage: string; delay: string }) {
  return (
    <div className={`glass-card-hover p-6 opacity-0 animate-fadeInUp ${delay}`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`text-3xl p-2 rounded-xl ${color}`}>{icon}</span>
        <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full">{percentage}</span>
      </div>
      <div className="text-3xl font-bold text-white mb-1 animate-countUp">{value.toLocaleString()}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { assets, notifications } = useApp();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const totalAssets = assets.length;
  const availableCount = assets.filter(a => a.status === 'Available').length;
  const allocatedCount = assets.filter(a => a.status === 'Allocated').length;
  const maintenanceCount = assets.filter(a => a.status === 'Under Maintenance').length;
  const reservedCount = assets.filter(a => a.status === 'Reserved').length;
  const retiredCount = assets.filter(a => a.status === 'Retired').length;

  const healthExcellent = assets.filter(a => a.healthScore >= 90).length;
  const healthGood = assets.filter(a => a.healthScore >= 70 && a.healthScore < 90).length;
  const healthFair = assets.filter(a => a.healthScore >= 50 && a.healthScore < 70).length;
  const healthPoor = assets.filter(a => a.healthScore >= 30 && a.healthScore < 50).length;
  const healthCritical = assets.filter(a => a.healthScore < 30).length;

  const criticalPredictions = aiPredictions.filter(p => p.riskTier === 'Critical').length;
  const highPredictions = aiPredictions.filter(p => p.riskTier === 'High').length;
  const mediumPredictions = aiPredictions.filter(p => p.riskTier === 'Medium').length;
  const lowPredictions = aiPredictions.filter(p => p.riskTier === 'Low').length;

  const deptDistribution = departments.map(d => ({
    name: d.name,
    count: assets.filter(a => a.departmentId === d.id).length,
  }));

  const recentActivity = assetHistory.slice(0, 6);
  const maxTrend = Math.max(...maintenanceTrends.map(t => t.count));
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  if (!mounted) return <div className="p-6"><Header title="Dashboard" /></div>;

  return (
    <>
      <Header title="Dashboard" />
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Total Assets" value={totalAssets} icon="📦" color="bg-blue-500/10" percentage={`${totalAssets} total`} delay="delay-100" />
          <KpiCard label="Available" value={availableCount} icon="✅" color="bg-emerald-500/10" percentage={`${totalAssets > 0 ? ((availableCount / totalAssets) * 100).toFixed(1) : 0}%`} delay="delay-200" />
          <KpiCard label="Allocated" value={allocatedCount} icon="👤" color="bg-amber-500/10" percentage={`${totalAssets > 0 ? ((allocatedCount / totalAssets) * 100).toFixed(1) : 0}%`} delay="delay-300" />
          <KpiCard label="Under Maintenance" value={maintenanceCount} icon="🔧" color="bg-rose-500/10" percentage={`${totalAssets > 0 ? ((maintenanceCount / totalAssets) * 100).toFixed(1) : 0}%`} delay="delay-400" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-300">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-lg">💚</span> Asset Health Distribution
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Excellent', count: healthExcellent, color: 'bg-emerald-500', pct: totalAssets > 0 ? (healthExcellent / totalAssets) * 100 : 0 },
                { label: 'Good', count: healthGood, color: 'bg-green-400', pct: totalAssets > 0 ? (healthGood / totalAssets) * 100 : 0 },
                { label: 'Fair', count: healthFair, color: 'bg-yellow-400', pct: totalAssets > 0 ? (healthFair / totalAssets) * 100 : 0 },
                { label: 'Poor', count: healthPoor, color: 'bg-orange-500', pct: totalAssets > 0 ? (healthPoor / totalAssets) * 100 : 0 },
                { label: 'Critical', count: healthCritical, color: 'bg-red-500', pct: totalAssets > 0 ? (healthCritical / totalAssets) * 100 : 0 },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-16">{item.label}</span>
                  <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full animate-progressBar`}
                      style={{ '--target-width': `${Math.max(item.pct, 2)}%`, animationDelay: `${i * 150 + 500}ms` } as React.CSSProperties} />
                  </div>
                  <span className="text-xs text-slate-300 w-16 text-right">{item.count} ({item.pct.toFixed(0)}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-400">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-lg">📈</span> Maintenance Trends
            </h3>
            <div className="flex items-end gap-3 h-40">
              {maintenanceTrends.map((item, i) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-slate-400">{item.count}</span>
                  <div className="w-full bg-white/5 rounded-t-lg overflow-hidden" style={{ height: '120px' }}>
                    <div className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-700"
                      style={{ height: `${(item.count / maxTrend) * 100}%`, marginTop: `${100 - (item.count / maxTrend) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Predictions & Overdue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-500">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-lg">🤖</span> AI Predictions Summary
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { count: criticalPredictions, label: '🔴 Critical', color: 'bg-red-500/10 border-red-500/20', textColor: 'text-red-400', textSub: 'text-red-300/70' },
                { count: highPredictions, label: '🟠 High Risk', color: 'bg-orange-500/10 border-orange-500/20', textColor: 'text-orange-400', textSub: 'text-orange-300/70' },
                { count: mediumPredictions, label: '🟡 Medium', color: 'bg-yellow-500/10 border-yellow-500/20', textColor: 'text-yellow-400', textSub: 'text-yellow-300/70' },
                { count: lowPredictions, label: '🟢 Low Risk', color: 'bg-emerald-500/10 border-emerald-500/20', textColor: 'text-emerald-400', textSub: 'text-emerald-300/70' },
              ].map(p => (
                <div key={p.label} className={`${p.color} border rounded-xl p-4 text-center`}>
                  <div className={`text-2xl font-bold ${p.textColor}`}>{p.count}</div>
                  <div className={`text-xs ${p.textSub} mt-1`}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-600">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-lg">⚠️</span> Overdue Returns
            </h3>
            <div className="space-y-3">
              {overdueReturns.map((item, i) => (
                <Link key={i} href={`/assets/${item.assetId}`} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white hover:text-blue-400 transition-colors">{item.asset}</p>
                    <p className="text-xs text-slate-500">{item.owner}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    item.urgency === 'high' ? 'bg-red-500/15 text-red-400' :
                    item.urgency === 'medium' ? 'bg-amber-500/15 text-amber-400' :
                    'bg-blue-500/15 text-blue-400'
                  }`}>+{item.days} days</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Department & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-500">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-lg">🏢</span> Assets by Department
            </h3>
            <div className="space-y-3">
              {deptDistribution.map((dept, i) => {
                const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-cyan-500', 'bg-rose-500'];
                return (
                  <div key={dept.name} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-20">{dept.name}</span>
                    <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[i % colors.length]} rounded-full opacity-80 animate-progressBar`}
                        style={{ '--target-width': `${totalAssets > 0 ? (dept.count / totalAssets) * 100 : 0}%`, animationDelay: `${i * 100 + 700}ms` } as React.CSSProperties} />
                    </div>
                    <span className="text-xs text-slate-300 w-8 text-right">{dept.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-600">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-lg">🕐</span> Recent Activity
            </h3>
            <div className="space-y-0">
              {recentActivity.map((event) => (
                <div key={event.id} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {event.action === 'Registered' ? '📦' : event.action === 'Allocated' ? '👤' : event.action === 'Maintenance' ? '🔧' : event.action === 'Returned' ? '↩️' : '📝'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 truncate">{event.description}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{event.performedBy} · {formatDate(event.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Donut & Warranty */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-700">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-lg">🎯</span> Status Breakdown
            </h3>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  {totalAssets > 0 && [
                    { pct: (availableCount / totalAssets) * 100, color: '#10b981', offset: 0 },
                    { pct: (allocatedCount / totalAssets) * 100, color: '#f59e0b', offset: (availableCount / totalAssets) * 100 },
                    { pct: (maintenanceCount / totalAssets) * 100, color: '#f43f5e', offset: ((availableCount + allocatedCount) / totalAssets) * 100 },
                    { pct: (reservedCount / totalAssets) * 100, color: '#8b5cf6', offset: ((availableCount + allocatedCount + maintenanceCount) / totalAssets) * 100 },
                    { pct: (retiredCount / totalAssets) * 100, color: '#475569', offset: ((availableCount + allocatedCount + maintenanceCount + reservedCount) / totalAssets) * 100 },
                  ].map((seg, i) => (
                    <circle key={i} r="15.9155" cx="18" cy="18" fill="none" stroke={seg.color} strokeWidth="3"
                      strokeDasharray={`${seg.pct} ${100 - seg.pct}`} strokeDashoffset={`${-seg.offset}`} />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">{totalAssets}</span>
                  <span className="text-[10px] text-slate-500">total</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { label: 'Available', count: availableCount, color: 'bg-emerald-500' },
                { label: 'Allocated', count: allocatedCount, color: 'bg-amber-500' },
                { label: 'Maintenance', count: maintenanceCount, color: 'bg-rose-500' },
                { label: 'Reserved', count: reservedCount, color: 'bg-violet-500' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className={`w-2 h-2 rounded-full ${s.color}`} />{s.label}: {s.count}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 col-span-1 lg:col-span-2 opacity-0 animate-fadeInUp delay-800">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-lg">🛡️</span> Upcoming Warranty Expiries
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-white/5">
                    <th className="pb-3 font-medium">Asset</th>
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Expiry Date</th>
                    <th className="pb-3 font-medium text-right">Days Left</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.filter(a => {
                    const exp = new Date(a.warrantyExpiry);
                    const diff = (exp.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                    return diff > 0 && diff < 120;
                  }).slice(0, 5).map(w => {
                    const daysLeft = Math.ceil((new Date(w.warrantyExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={w.id} className="border-b border-white/[0.03] table-row-hover">
                        <td className="py-3 text-sm"><Link href={`/assets/${w.id}`} className="text-slate-300 hover:text-blue-400 transition-colors">{w.name}</Link></td>
                        <td className="py-3 text-sm"><Link href={`/assets/${w.id}`} className="font-mono text-blue-400 hover:text-blue-300">{w.assetId}</Link></td>
                        <td className="py-3 text-sm text-slate-400">{formatDate(w.warrantyExpiry)}</td>
                        <td className="py-3 text-right">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            daysLeft <= 7 ? 'bg-red-500/15 text-red-400' : daysLeft <= 30 ? 'bg-amber-500/15 text-amber-400' : 'bg-blue-500/15 text-blue-400'
                          }`}>{daysLeft}d</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
