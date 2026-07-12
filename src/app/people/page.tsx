'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { departments } from '@/data/mockData';
import { useApp } from '@/lib/context';

const roleColors: Record<string, string> = {
  'Admin': 'bg-red-500/15 text-red-400 border-red-500/30',
  'Asset Manager': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Department Head': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  'Employee': 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  'Auditor': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

export default function PeoplePage() {
  const { employees, currentUser, deleteEmployee, addEmployee } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  const isAdmin = currentUser?.role === 'Admin';

  const filtered = useMemo(() => {
    return employees.filter(e => {
      const matchSearch = search === '' || e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.employeeId.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === 'all' || e.departmentId === deptFilter;
      const matchRole = roleFilter === 'all' || e.role === roleFilter;
      return matchSearch && matchDept && matchRole;
    });
  }, [search, deptFilter, roleFilter, employees]);

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newEmp = {
      id: `emp-${Date.now()}`,
      employeeId: fd.get('employeeId') as string,
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      avatar: '',
      departmentId: fd.get('department') as string,
      department: departments.find(d => d.id === fd.get('department'))?.name || 'Unknown',
      roleId: 'role-x',
      role: fd.get('role') as any,
      locationId: 'loc-x',
      location: 'HQ',
      isActive: true,
      phone: '',
      joinDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    addEmployee(newEmp);
    setShowAddModal(false);
  };

  return (
    <>
      <Header title="People" />
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-0 animate-fadeInUp">
          <div>
            <h2 className="text-2xl font-bold text-white">Employee Directory</h2>
            <p className="text-sm text-slate-500">{filtered.length} of {employees.length} employees</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/people/departments" className="px-4 py-2 glass-card-hover text-sm text-slate-300">🏢 Departments</Link>
            <Link href="/people/roles" className="px-4 py-2 glass-card-hover text-sm text-slate-300">🔐 Roles</Link>
            {isAdmin && (
              <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all">
                + Add Employee
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 flex flex-wrap items-center gap-3 opacity-0 animate-fadeInUp delay-100">
          <input type="text" placeholder="Search by name, email, ID..." value={search} onChange={e => setSearch(e.target.value)} className="glass-input px-4 py-2 text-sm flex-1 min-w-[200px]" />
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="glass-input px-3 py-2 text-sm">
            <option value="all">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="glass-input px-3 py-2 text-sm">
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Asset Manager">Asset Manager</option>
            <option value="Department Head">Dept Head</option>
            <option value="Employee">Employee</option>
            <option value="Auditor">Auditor</option>
          </select>
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
            <button onClick={() => setViewMode('grid')} className={`px-2 py-1 rounded text-xs ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500'}`}>⊞</button>
            <button onClick={() => setViewMode('table')} className={`px-2 py-1 rounded text-xs ${viewMode === 'table' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500'}`}>☰</button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 opacity-0 animate-fadeInUp delay-200">
            {filtered.map(emp => (
              <div key={emp.id} className="glass-card p-5 group relative">
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => deleteEmployee(emp.id)} className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Delete">🗑️</button>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <Link href={`/people/${emp.id}`}>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/people/${emp.id}`} className="text-sm font-semibold text-white truncate hover:text-blue-400 transition-colors block">{emp.name}</Link>
                    <p className="text-xs text-slate-500 truncate">{emp.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Department</span>
                    <span className="text-xs text-slate-300">{emp.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Role</span>
                    <span className={`badge border ${roleColors[emp.role] || ''}`}>{emp.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">ID</span>
                    <Link href={`/people/${emp.id}`} className="text-xs font-mono text-blue-400 hover:text-blue-300">{emp.employeeId}</Link>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/5">
                  <span className={`w-2 h-2 rounded-full ${emp.isActive ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                  <span className="text-[10px] text-slate-500">{emp.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="glass-card overflow-hidden opacity-0 animate-fadeInUp delay-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-white/5 bg-white/[0.02]">
                    <th className="px-4 py-3 font-medium">Employee</th>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Department</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    {isAdmin && <th className="px-4 py-3 font-medium text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(emp => (
                    <tr key={emp.id} className="border-b border-white/3 table-row-hover">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link href={`/people/${emp.id}`}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold hover:scale-105 transition-transform">
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </Link>
                          <div>
                            <Link href={`/people/${emp.id}`} className="text-sm text-white hover:text-blue-400 transition-colors block">{emp.name}</Link>
                            <p className="text-xs text-slate-500">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-blue-400"><Link href={`/people/${emp.id}`} className="hover:text-blue-300">{emp.employeeId}</Link></td>
                      <td className="px-4 py-3 text-sm text-slate-400">{emp.department}</td>
                      <td className="px-4 py-3"><span className={`badge border ${roleColors[emp.role]}`}>{emp.role}</span></td>
                      <td className="px-4 py-3">
                        <span className={`w-2 h-2 rounded-full inline-block ${emp.isActive ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => deleteEmployee(emp.id)} className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors">Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleAddEmployee} className="glass-card p-6 w-full max-w-md animate-fadeIn">
              <h3 className="text-lg font-semibold text-white mb-4">Add New Employee</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Name</label>
                  <input name="name" type="text" required className="glass-input w-full px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Employee ID</label>
                  <input name="employeeId" type="text" required className="glass-input w-full px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Email</label>
                  <input name="email" type="email" required className="glass-input w-full px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Department</label>
                  <select name="department" required className="glass-input w-full px-3 py-2 text-sm">
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Role</label>
                  <select name="role" required className="glass-input w-full px-3 py-2 text-sm">
                    <option value="Employee">Employee</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Asset Manager">Asset Manager</option>
                    <option value="Admin">Admin</option>
                    <option value="Auditor">Auditor</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-white/10">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl">Add Employee</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
