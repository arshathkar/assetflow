'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { maintenanceRequests, aiPredictions, notifications } from '@/data/mockData';

const statusColumns = ['Pending', 'Approved', 'Diagnosed', 'In Progress', 'Completed'] as const;

const priorityColors: Record<string, string> = {
  'Critical': 'bg-red-500/15 text-red-400 border-red-500/30',
  'High': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'Medium': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Low': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
};

const statusColumnColors: Record<string, string> = {
  'Pending': 'border-amber-500/30',
  'Approved': 'border-blue-500/30',
  'Diagnosed': 'border-violet-500/30',
  'In Progress': 'border-cyan-500/30',
  'Completed': 'border-emerald-500/30',
};

export default function MaintenancePage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filtered = useMemo(() => {
    return maintenanceRequests.filter(m => {
      return priorityFilter === 'all' || m.priority === priorityFilter;
    });
  }, [priorityFilter]);

  return (
    <>
      <Header title="Maintenance" notificationCount={notifications.filter(n => !n.isRead).length} />
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-0 animate-fadeInUp">
          <div>
            <h2 className="text-2xl font-bold text-white">Maintenance Requests</h2>
            <p className="text-sm text-slate-500">{maintenanceRequests.length} requests · {aiPredictions.length} AI predictions</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/maintenance/predictions" className="px-4 py-2 glass-card-hover text-sm text-slate-300">🔮 Predictive Alerts ({aiPredictions.length})</Link>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl">+ New Request</button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 flex items-center gap-3 opacity-0 animate-fadeInUp delay-100">
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="glass-input px-3 py-2 text-sm">
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5 ml-auto">
            <button onClick={() => setViewMode('kanban')} className={`px-3 py-1 rounded text-xs ${viewMode === 'kanban' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500'}`}>Kanban</button>
            <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded text-xs ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500'}`}>List</button>
          </div>
        </div>

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 opacity-0 animate-fadeInUp delay-200">
            {statusColumns.map(status => {
              const items = filtered.filter(m => m.status === status);
              return (
                <div key={status} className={`kanban-column p-3 border-t-2 ${statusColumnColors[status]}`}>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h4 className="text-sm font-semibold text-white">{status}</h4>
                    <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map(req => (
                      <div key={req.id} className="glass-card-hover p-3 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-blue-400">{req.requestId}</span>
                          <span className={`badge border text-[10px] ${priorityColors[req.priority]}`}>{req.priority}</span>
                        </div>
                        <p className="text-xs text-white font-medium mb-1 truncate">{req.assetName}</p>
                        <p className="text-[10px] text-slate-500 truncate">{req.description}</p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                          <span className="text-[10px] text-slate-600">{req.issueType}</span>
                          {req.assignedToName && <span className="text-[10px] text-slate-500">👤 {req.assignedToName.split(' ')[0]}</span>}
                        </div>
                        {req.isAiPredicted && <span className="text-[10px] text-cyan-400 mt-1 block">🤖 AI Predicted</span>}
                      </div>
                    ))}
                    {items.length === 0 && <p className="text-xs text-slate-600 text-center py-4">No requests</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="glass-card overflow-hidden opacity-0 animate-fadeInUp delay-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-white/5 bg-white/[0.02]">
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Asset</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Assigned To</th>
                    <th className="px-4 py-3 font-medium">Cost</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(req => (
                    <tr key={req.id} className="border-b border-white/3 table-row-hover">
                      <td className="px-4 py-3 text-sm font-mono text-blue-400">{req.requestId}</td>
                      <td className="px-4 py-3 text-sm text-white">{req.assetName} <span className="text-slate-500 text-xs">({req.assetAssetId})</span></td>
                      <td className="px-4 py-3 text-sm text-slate-400">{req.issueType}</td>
                      <td className="px-4 py-3"><span className={`badge border ${priorityColors[req.priority]}`}>{req.priority}</span></td>
                      <td className="px-4 py-3 text-sm text-slate-300">{req.status}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{req.assignedToName || '—'}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{req.totalCost > 0 ? `₹${req.totalCost.toLocaleString()}` : '—'}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{new Date(req.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
