'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { departments, categories } from '@/data/mockData';
import { useApp } from '@/lib/context';

const statusColors: Record<string, string> = {
  'Available': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Allocated': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Under Maintenance': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  'Reserved': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  'Lost': 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  'Retired': 'bg-gray-500/15 text-gray-500 border-gray-500/30',
};

const healthColors: Record<string, string> = {
  'Excellent': 'text-emerald-400',
  'Good': 'text-green-400',
  'Fair': 'text-yellow-400',
  'Poor': 'text-orange-400',
  'Critical': 'text-red-400',
};

export default function AssetsPage() {
  const { assets, currentUser, deleteAsset } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const isAdmin = currentUser?.role === 'Admin';

  const filtered = useMemo(() => {
    return assets.filter(a => {
      const matchSearch = search === '' ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.assetId.toLowerCase().includes(search.toLowerCase()) ||
        a.serialNumber.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      const matchCategory = categoryFilter === 'all' || a.categoryId === categoryFilter;
      const matchDept = deptFilter === 'all' || a.departmentId === deptFilter;
      return matchSearch && matchStatus && matchCategory && matchDept;
    });
  }, [search, statusFilter, categoryFilter, deptFilter, assets]);

  return (
    <>
      <Header title="Asset Registry" />
      <div className="p-6 space-y-6">
        {/* Top Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-0 animate-fadeInUp delay-100">
          <div>
            <h2 className="text-2xl font-bold text-white">Assets</h2>
            <p className="text-sm text-slate-500">{filtered.length} of {assets.length} assets</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/assets/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              + Register Asset
            </Link>
            <Link href="/assets/qr" className="px-4 py-2 glass-card-hover text-sm text-slate-300">
              📷 QR Manager
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 flex flex-wrap items-center gap-3 opacity-0 animate-fadeInUp delay-200">
          <input
            type="text"
            placeholder="Search by name, ID, serial..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="glass-input px-4 py-2 text-sm flex-1 min-w-[200px]"
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="glass-input px-3 py-2 text-sm">
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Allocated">Allocated</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Reserved">Reserved</option>
            <option value="Lost">Lost</option>
            <option value="Retired">Retired</option>
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="glass-input px-3 py-2 text-sm">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="glass-input px-3 py-2 text-sm">
            <option value="all">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
            <button onClick={() => setViewMode('table')} className={`px-2 py-1 rounded text-xs ${viewMode === 'table' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500'}`}>☰</button>
            <button onClick={() => setViewMode('grid')} className={`px-2 py-1 rounded text-xs ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500'}`}>⊞</button>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="glass-card overflow-hidden opacity-0 animate-fadeInUp delay-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-white/5 bg-white/[0.02]">
                    <th className="px-4 py-3 font-medium">Asset ID</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Department</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Health</th>
                    <th className="px-4 py-3 font-medium">Owner</th>
                    {isAdmin && <th className="px-4 py-3 font-medium text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((asset) => (
                    <tr key={asset.id} className="border-b border-white/3 table-row-hover transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/assets/${asset.id}`} className="text-sm font-mono text-blue-400 hover:text-blue-300">
                          {asset.assetId}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/assets/${asset.id}`} className="flex items-center gap-2 hover:opacity-80">
                          <span className="text-lg">{asset.categoryIcon}</span>
                          <span className="text-sm text-white">{asset.name}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{asset.category}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{asset.department}</td>
                      <td className="px-4 py-3">
                        <span className={`badge border ${statusColors[asset.status]}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${healthColors[asset.healthGrade]}`}>{asset.healthScore}%</span>
                          <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${asset.healthScore >= 70 ? 'bg-emerald-500' : asset.healthScore >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${asset.healthScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {asset.currentOwner ? (
                          <Link href={`/people/${asset.currentOwnerId}`} className="hover:text-blue-400">{asset.currentOwner}</Link>
                        ) : '-'}
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3 text-right">
                          <button onClick={(e) => { e.preventDefault(); deleteAsset(asset.id); }} className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors">Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 opacity-0 animate-fadeInUp delay-300">
            {filtered.map((asset) => (
              <div key={asset.id} className="glass-card p-5 group relative block transition-all hover:border-blue-500/30 hover:bg-white/[0.04]">
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.preventDefault(); deleteAsset(asset.id); }} className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Delete">🗑️</button>
                  </div>
                )}
                <Link href={`/assets/${asset.id}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center text-2xl border border-blue-500/20 shadow-lg shadow-blue-500/5 group-hover:scale-110 transition-transform">
                      {asset.categoryIcon}
                    </div>
                    <span className={`badge border ${statusColors[asset.status]}`}>
                      {asset.status}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{asset.name}</h3>
                  <p className="text-xs font-mono text-blue-400 mb-4">{asset.assetId}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Category</span>
                      <span className="text-slate-300">{asset.category}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Department</span>
                      <span className="text-slate-300 truncate max-w-[120px]">{asset.department}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Owner</span>
                      <span className="text-slate-300 truncate max-w-[120px]">{asset.currentOwner || '-'}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-1">Health</span>
                      <span className={`text-sm font-bold ${healthColors[asset.healthGrade]}`}>{asset.healthScore}%</span>
                    </div>
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${asset.healthScore >= 70 ? 'bg-emerald-500' : asset.healthScore >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${asset.healthScore}%` }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
