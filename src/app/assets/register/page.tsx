'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import { categories, departments, locations, notifications } from '@/data/mockData';

export default function RegisterAssetPage() {
  const [formData, setFormData] = useState({
    name: '', serialNumber: '', categoryId: '', departmentId: '', locationId: '',
    purchaseDate: '', purchasePrice: '', warrantyExpiry: '', condition: 'Excellent',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const generatedId = `AF-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Header title="Register New Asset" notificationCount={notifications.filter(n => !n.isRead).length} />
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="opacity-0 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-white mb-1">Register New Asset</h2>
          <p className="text-sm text-slate-500">Auto-generated ID: <span className="text-blue-400 font-mono">{generatedId}</span></p>
        </div>

        {submitted && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-sm animate-fadeIn">
            ✅ Asset registered successfully! QR code has been generated.
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6 opacity-0 animate-fadeInUp delay-200">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><span>📝</span> Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Asset Name *</label>
                <input type="text" placeholder="e.g. Dell Latitude 7440" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" required />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Serial Number *</label>
                <input type="text" placeholder="e.g. SN-DELL-7440-001" value={formData.serialNumber} onChange={e => setFormData({...formData, serialNumber: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" required />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Category *</label>
                <select value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" required>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Condition *</label>
                <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm">
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Department */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><span>📍</span> Assignment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Department *</label>
                <select value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" required>
                  <option value="">Select department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Location *</label>
                <select value={formData.locationId} onChange={e => setFormData({...formData, locationId: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" required>
                  <option value="">Select location</option>
                  {locations.map(l => <option key={l.id} value={l.id}>{l.fullPath}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Purchase & Warranty */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><span>💰</span> Purchase & Warranty</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Purchase Date *</label>
                <input type="date" value={formData.purchaseDate} onChange={e => setFormData({...formData, purchaseDate: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" required />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Purchase Price (₹)</label>
                <input type="number" placeholder="75000" value={formData.purchasePrice} onChange={e => setFormData({...formData, purchasePrice: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Warranty Expiry</label>
                <input type="date" value={formData.warrantyExpiry} onChange={e => setFormData({...formData, warrantyExpiry: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Notes</label>
            <textarea rows={3} placeholder="Additional notes..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" />
          </div>

          {/* Document Upload */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><span>📎</span> Documents</h3>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-blue-500/30 transition-colors cursor-pointer">
              <span className="text-3xl block mb-2">📁</span>
              <p className="text-sm text-slate-400">Drop files here or click to upload</p>
              <p className="text-xs text-slate-600 mt-1">Max 10 files, 25 MB each (images, PDFs, invoices)</p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button type="button" className="px-6 py-2.5 glass-card text-sm text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              Register Asset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
