'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { employees, assets, bookings, currentUser, updateEmployee, deleteEmployee } = useApp();
  const employeeId = params.id as string;
  
  const employee = employees.find(e => e.id === employeeId || e.employeeId === employeeId);
  const isAdmin = currentUser?.role === 'Admin';
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(employee || {} as any);

  if (!employee) {
    return (
      <>
        <Header title="Employee Details" />
        <div className="p-6">
          <div className="glass-card p-12 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Employee Not Found</h2>
            <p className="text-slate-500 mb-6">The employee you are looking for does not exist.</p>
            <Link href="/people" className="text-blue-400 hover:text-blue-300">← Back to Directory</Link>
          </div>
        </div>
      </>
    );
  }

  const allocatedAssets = assets.filter(a => a.currentOwnerId === employee.id);
  const employeeBookings = bookings.filter(b => b.bookedBy === employee.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployee(employee.id, formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employee.id);
      router.push('/people');
    }
  };

  return (
    <>
      <Header title="Employee Profile" />
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header Profile */}
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
          {isAdmin && !isEditing && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => setIsEditing(true)} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors">Edit Profile</button>
              <button onClick={handleDelete} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors">Delete</button>
            </div>
          )}
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-500/20">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSave} className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="glass-input w-full px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="glass-input w-full px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Department</label>
                  <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="glass-input w-full px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Role</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="glass-input w-full px-3 py-2 text-sm">
                    <option value="Employee">Employee</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Asset Manager">Asset Manager</option>
                    <option value="Admin">Admin</option>
                    <option value="Auditor">Auditor</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="flex-1 text-center sm:text-left mt-2">
              <h2 className="text-2xl font-bold text-white mb-1">{employee.name}</h2>
              <p className="text-sm text-blue-400 font-mono mb-3">{employee.employeeId}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-left">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Role</p>
                  <p className="text-sm text-slate-300">{employee.role}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Department</p>
                  <p className="text-sm text-slate-300">{employee.department}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Email</p>
                  <p className="text-sm text-slate-300 truncate">{employee.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Joined</p>
                  <p className="text-sm text-slate-300">{new Date(employee.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Allocated Assets */}
          <div className="glass-card p-6">
            <h3 className="text-base font-semibold text-white mb-4">Allocated Assets ({allocatedAssets.length})</h3>
            <div className="space-y-3">
              {allocatedAssets.length > 0 ? allocatedAssets.map(asset => (
                <Link key={asset.id} href={`/assets/${asset.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                  <span className="text-2xl">{asset.categoryIcon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{asset.name}</p>
                    <p className="text-[10px] text-blue-400 font-mono">{asset.assetId}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    asset.healthScore >= 70 ? 'bg-emerald-500/10 text-emerald-400' : 
                    asset.healthScore >= 40 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                  }`}>Health {asset.healthScore}%</span>
                </Link>
              )) : (
                <p className="text-sm text-slate-500 text-center py-4">No assets currently allocated.</p>
              )}
            </div>
          </div>

          {/* Booking History */}
          <div className="glass-card p-6">
            <h3 className="text-base font-semibold text-white mb-4">Resource Bookings ({employeeBookings.length})</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {employeeBookings.length > 0 ? employeeBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
                  <div>
                    <p className="text-sm font-medium text-white">{booking.title}</p>
                    <p className="text-xs text-slate-500">{booking.resourceName} ({booking.resourceType})</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-300">{booking.date}</p>
                    <p className="text-[10px] text-slate-500">{booking.startTime} - {booking.endTime}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-500 text-center py-4">No booking history.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
