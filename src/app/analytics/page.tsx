'use client';

import Header from '@/components/layout/Header';
import { assets, departments, maintenanceRequests, employees, bookings, auditCycles, aiPredictions, assetRequests, categories, notifications } from '@/data/mockData';

export default function AnalyticsPage() {
  const totalAssets = assets.length;
  const totalValue = assets.reduce((sum, a) => sum + a.purchasePrice, 0);
  const avgHealth = Math.round(assets.reduce((sum, a) => sum + a.healthScore, 0) / totalAssets);
  const maintenanceCost = maintenanceRequests.reduce((sum, m) => sum + m.totalCost, 0);

  // Category distribution
  const categoryDist = categories.map(c => ({
    name: c.name, icon: c.icon,
    count: assets.filter(a => a.categoryId === c.id).length,
    value: assets.filter(a => a.categoryId === c.id).reduce((s, a) => s + a.purchasePrice, 0),
  }));

  // Department distribution
  const deptDist = departments.map(d => ({
    name: d.name,
    assets: assets.filter(a => a.departmentId === d.id).length,
    employees: employees.filter(e => e.departmentId === d.id).length,
    value: assets.filter(a => a.departmentId === d.id).reduce((s, a) => s + a.purchasePrice, 0),
  }));

  // Status distribution
  const statuses = ['Available', 'Allocated', 'Under Maintenance', 'Reserved', 'Lost', 'Retired'];
  const statusDist = statuses.map(s => ({ status: s, count: assets.filter(a => a.status === s).length }));

  // Monthly cost trend (simulated)
  const monthlyTrend = [
    { month: 'Jan', cost: 25000, assets: 4 },
    { month: 'Feb', cost: 45000, assets: 6 },
    { month: 'Mar', cost: 15000, assets: 2 },
    { month: 'Apr', cost: 78000, assets: 8 },
    { month: 'May', cost: 35000, assets: 5 },
    { month: 'Jun', cost: 62000, assets: 7 },
  ];
  const maxCost = Math.max(...monthlyTrend.map(m => m.cost));

  // Condition distribution
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const conditionDist = conditions.map(c => ({ condition: c, count: assets.filter(a => a.condition === c).length }));

  return (
    <>
      <Header title="Analytics" notificationCount={notifications.filter(n => !n.isRead).length} />
      <div className="p-6 space-y-6">
        <div className="opacity-0 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-white">📈 Analytics Dashboard</h2>
          <p className="text-sm text-slate-500">Comprehensive overview of asset performance and utilization</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 opacity-0 animate-fadeInUp delay-100">
          {[
            { label: 'Total Asset Value', value: `₹${(totalValue / 100000).toFixed(1)}L`, icon: '💰', color: 'from-blue-500 to-cyan-400' },
            { label: 'Average Health', value: `${avgHealth}/100`, icon: '💚', color: 'from-emerald-500 to-green-400' },
            { label: 'Maintenance Cost', value: `₹${(maintenanceCost / 1000).toFixed(0)}K`, icon: '🔧', color: 'from-amber-500 to-orange-400' },
            { label: 'Utilization Rate', value: `${((assets.filter(a => a.status === 'Allocated').length / totalAssets) * 100).toFixed(0)}%`, icon: '📊', color: 'from-violet-500 to-purple-400' },
          ].map((kpi, i) => (
            <div key={kpi.label} className="glass-card-hover p-5 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${kpi.color} opacity-5 rounded-full -mr-5 -mt-5`} />
              <span className="text-2xl">{kpi.icon}</span>
              <p className="text-2xl font-bold text-white mt-2">{kpi.value}</p>
              <p className="text-xs text-slate-500 mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By Category */}
          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-200">
            <h3 className="text-base font-semibold text-white mb-4">Assets by Category</h3>
            <div className="space-y-3">
              {categoryDist.sort((a, b) => b.count - a.count).map(cat => (
                <div key={cat.name} className="flex items-center gap-3">
                  <span className="text-lg w-8">{cat.icon}</span>
                  <span className="text-xs text-slate-400 w-20">{cat.name}</span>
                  <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-80" style={{ width: `${(cat.count / totalAssets) * 100}%` }} />
                  </div>
                  <span className="text-xs text-slate-300 w-12 text-right">{cat.count}</span>
                  <span className="text-[10px] text-slate-500 w-16 text-right">₹{(cat.value / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>

          {/* By Status */}
          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-300">
            <h3 className="text-base font-semibold text-white mb-4">Asset Status Distribution</h3>
            <div className="space-y-3">
              {statusDist.map(s => {
                const colors: Record<string, string> = {
                  'Available': 'bg-emerald-500', 'Allocated': 'bg-amber-500', 'Under Maintenance': 'bg-rose-500',
                  'Reserved': 'bg-violet-500', 'Lost': 'bg-slate-500', 'Retired': 'bg-gray-600',
                };
                return (
                  <div key={s.status} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-32">{s.status}</span>
                    <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[s.status]} rounded-full opacity-80`} style={{ width: `${(s.count / totalAssets) * 100}%` }} />
                    </div>
                    <span className="text-xs text-slate-300 w-12 text-right">{s.count}</span>
                    <span className="text-[10px] text-slate-500 w-10 text-right">{((s.count / totalAssets) * 100).toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Maintenance Cost Trend */}
        <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-300">
          <h3 className="text-base font-semibold text-white mb-4">Monthly Maintenance Cost Trend</h3>
          <div className="flex items-end gap-4 h-48">
            {monthlyTrend.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-slate-400">₹{(m.cost / 1000).toFixed(0)}K</span>
                <div className="w-full bg-white/5 rounded-t-lg overflow-hidden" style={{ height: '140px' }}>
                  <div className="w-full bg-gradient-to-t from-rose-600 to-amber-400 rounded-t-lg" style={{ height: `${(m.cost / maxCost) * 100}%`, marginTop: `${100 - (m.cost / maxCost) * 100}%` }} />
                </div>
                <span className="text-[10px] text-slate-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-400">
          <h3 className="text-base font-semibold text-white mb-4">Department Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-white/5">
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium text-right">Employees</th>
                  <th className="px-4 py-3 font-medium text-right">Assets</th>
                  <th className="px-4 py-3 font-medium text-right">Asset Value</th>
                  <th className="px-4 py-3 font-medium text-right">Ratio</th>
                </tr>
              </thead>
              <tbody>
                {deptDist.map(d => (
                  <tr key={d.name} className="border-b border-white/3 table-row-hover">
                    <td className="px-4 py-3 text-sm text-white font-medium">{d.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 text-right">{d.employees}</td>
                    <td className="px-4 py-3 text-sm text-slate-300 text-right font-semibold">{d.assets}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 text-right">₹{(d.value / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-sm text-blue-400 text-right">{d.employees > 0 ? (d.assets / d.employees).toFixed(1) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Condition */}
        <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-500">
          <h3 className="text-base font-semibold text-white mb-4">Asset Condition Distribution</h3>
          <div className="grid grid-cols-4 gap-3">
            {conditionDist.map(c => {
              const colors: Record<string, string> = { 'Excellent': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', 'Good': 'text-green-400 bg-green-500/10 border-green-500/20', 'Fair': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', 'Poor': 'text-orange-400 bg-orange-500/10 border-orange-500/20' };
              return (
                <div key={c.condition} className={`rounded-xl p-4 text-center border ${colors[c.condition]}`}>
                  <p className="text-2xl font-bold">{c.count}</p>
                  <p className="text-xs mt-1">{c.condition}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{((c.count / totalAssets) * 100).toFixed(0)}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
