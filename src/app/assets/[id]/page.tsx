'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { assetHistory, maintenanceRequests, notifications } from '@/data/mockData';
import { useApp } from '@/lib/context';

const statusColors: Record<string, string> = {
  'Available': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Allocated': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Under Maintenance': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  'Reserved': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  'Lost': 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  'Retired': 'bg-gray-500/15 text-gray-500 border-gray-500/30',
};

const healthGradeConfig: Record<string, { color: string; bg: string }> = {
  'Excellent': { color: 'text-emerald-400', bg: 'from-emerald-500 to-emerald-600' },
  'Good': { color: 'text-green-400', bg: 'from-green-500 to-green-600' },
  'Fair': { color: 'text-yellow-400', bg: 'from-yellow-500 to-yellow-600' },
  'Poor': { color: 'text-orange-400', bg: 'from-orange-500 to-orange-600' },
  'Critical': { color: 'text-red-400', bg: 'from-red-500 to-red-600' },
};

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { assets, updateAsset, deleteAsset, currentUser } = useApp();
  const assetId = params.id as string;
  const asset = assets.find(a => a.id === assetId || a.assetId === assetId);
  const isAdmin = currentUser?.role === 'Admin';

  if (!asset) {
    return (
      <>
        <Header title="Asset Not Found" />
        <div className="p-6">
          <div className="glass-card p-12 text-center">
            <span className="text-5xl mb-4 block">🔍</span>
            <h2 className="text-xl font-semibold text-white mb-2">Asset Not Found</h2>
            <p className="text-slate-500 mb-4">The asset you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/assets" className="text-blue-400 hover:text-blue-300 text-sm">← Back to Assets</Link>
          </div>
        </div>
      </>
    );
  }

  const history = assetHistory.filter(h => h.assetId === asset.id);
  const maintenance = maintenanceRequests.filter(m => m.assetId === asset.id);
  const grade = healthGradeConfig[asset.healthGrade] || healthGradeConfig['Good'];
  const warrantyValid = new Date(asset.warrantyExpiry) > new Date();
  const warrantyDays = Math.ceil((new Date(asset.warrantyExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <>
      <Header title={`Asset: ${asset.assetId}`} notificationCount={notifications.filter(n => !n.isRead).length} />
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 opacity-0 animate-fadeInUp">
          <Link href="/assets" className="hover:text-blue-400 transition-colors">Assets</Link>
          <span>›</span>
          <span className="text-slate-300">{asset.assetId}</span>
        </div>

        {/* Top Card */}
        <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-100">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Asset Icon & Basic Info */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl flex-shrink-0">
                {asset.categoryIcon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-white">{asset.name}</h2>
                  <span className={`badge border ${statusColors[asset.status]}`}>{asset.status}</span>
                </div>
                <p className="text-sm font-mono text-blue-400 mb-2">{asset.assetId}</p>
                <p className="text-xs text-slate-500">Serial: {asset.serialNumber}</p>
              </div>
            </div>

            {/* Health Score Gauge */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle r="15.9155" cx="18" cy="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle
                      r="15.9155" cx="18" cy="18" fill="none"
                      stroke={asset.healthScore >= 70 ? '#10b981' : asset.healthScore >= 50 ? '#eab308' : asset.healthScore >= 30 ? '#f97316' : '#ef4444'}
                      strokeWidth="3"
                      strokeDasharray={`${asset.healthScore} ${100 - asset.healthScore}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-2xl font-bold ${grade.color}`}>{asset.healthScore}</span>
                  </div>
                </div>
                <span className={`text-xs font-medium ${grade.color}`}>{asset.healthGrade}</span>
              </div>

              {/* QR Code Placeholder */}
              <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center p-2">
                <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center text-xs text-white font-mono">
                  QR<br/>{asset.assetId}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info Panel */}
          <div className="glass-card p-6 lg:col-span-2 opacity-0 animate-fadeInUp delay-200">
            <h3 className="text-base font-semibold text-white mb-4">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Category', value: `${asset.categoryIcon} ${asset.category}` },
                { label: 'Department', value: `🏢 ${asset.department}` },
                { label: 'Location', value: `📍 ${asset.location}` },
                { label: 'Current Owner', value: asset.currentOwner ? `👤 ${asset.currentOwner}` : '— Unassigned' },
                { label: 'Purchase Date', value: new Date(asset.purchaseDate).toLocaleDateString() },
                { label: 'Purchase Price', value: `₹${asset.purchasePrice.toLocaleString()}` },
                { label: 'Condition', value: asset.condition },
                { label: 'Warranty', value: warrantyValid ? `✅ Valid (${warrantyDays}d left)` : `❌ Expired` },
              ].map(item => (
                <div key={item.label} className="py-2 border-b border-white/5">
                  <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                  <p className="text-sm text-slate-300">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Specs */}
            {Object.keys(asset.specs).length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-white mb-3">Specifications</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(asset.specs).map(([key, value]) => (
                    <div key={key} className="bg-white/3 rounded-lg px-3 py-2">
                      <p className="text-[10px] text-slate-500 uppercase">{key}</p>
                      <p className="text-xs text-slate-300">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions Panel */}
          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-300">
            <h3 className="text-base font-semibold text-white mb-4">Actions</h3>
            <div className="space-y-2">
              <button onClick={() => updateAsset(asset.id, { status: 'Under Maintenance' })} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 text-sm transition-all hover:bg-amber-500/10 hover:border-amber-500/20 ${asset.status === 'Under Maintenance' ? 'text-amber-400 bg-amber-500/5' : 'text-slate-300'}`}>
                <span>🔧</span> Send for Maintenance
              </button>
              <button onClick={() => updateAsset(asset.id, { status: 'Available', currentOwner: null, currentOwnerId: null })} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 text-sm transition-all hover:bg-emerald-500/10 hover:border-emerald-500/20 text-slate-300`}>
                <span>↩️</span> Return Asset
              </button>
              <button onClick={() => alert('QR Code downloaded!')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 text-sm text-slate-300 transition-all hover:bg-violet-500/10 hover:border-violet-500/20`}>
                <span>📥</span> Download QR Code
              </button>
              <button onClick={() => updateAsset(asset.id, { status: 'Lost' })} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 text-sm transition-all hover:bg-slate-500/10 hover:border-slate-500/20 ${asset.status === 'Lost' ? 'text-slate-400 bg-slate-500/5' : 'text-slate-300'}`}>
                <span>❓</span> Mark as Lost
              </button>
              
              {isAdmin && (
                <>
                  <div className="h-px bg-white/5 my-2" />
                  <button onClick={() => updateAsset(asset.id, { status: 'Retired' })} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 text-sm transition-all hover:bg-red-500/10 hover:border-red-500/20 ${asset.status === 'Retired' ? 'text-red-400 bg-red-500/5' : 'text-slate-300'}`}>
                    <span>🗑️</span> Retire Asset
                  </button>
                  <button onClick={() => { if (confirm('Are you sure you want to delete this asset?')) { deleteAsset(asset.id); router.push('/assets'); } }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/10 bg-red-500/5 text-sm text-red-400 transition-all hover:bg-red-500/20 hover:border-red-500/30`}>
                    <span>⚠️</span> Delete Permanently
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-400">
          <h3 className="text-base font-semibold text-white mb-4">📜 Asset History</h3>
          {history.length > 0 ? (
            <div className="relative pl-6 space-y-0">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-white/10" />
              {history.map((event) => (
                <div key={event.id} className="relative pb-6 last:pb-0">
                  <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-900" />
                  <div className="ml-4">
                    <p className="text-sm text-slate-300">{event.description}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{event.performedBy} · {new Date(event.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No history available for this asset.</p>
          )}
        </div>

        {/* Maintenance History */}
        {maintenance.length > 0 && (
          <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-500">
            <h3 className="text-base font-semibold text-white mb-4">🔧 Maintenance Records</h3>
            <div className="space-y-3">
              {maintenance.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                  <div>
                    <p className="text-sm text-white">{m.requestId} — {m.issueType}</p>
                    <p className="text-xs text-slate-500">{m.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      m.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400' :
                      m.status === 'In Progress' ? 'bg-blue-500/15 text-blue-400' :
                      'bg-amber-500/15 text-amber-400'
                    }`}>{m.status}</span>
                    {m.totalCost > 0 && <p className="text-xs text-slate-500 mt-1">₹{m.totalCost.toLocaleString()}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
