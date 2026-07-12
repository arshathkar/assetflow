'use client';

import Header from '@/components/layout/Header';
import { notifications } from '@/data/mockData';

const roles = [
  { name: 'Admin', desc: 'Full system access, configuration, and user management', count: 3 },
  { name: 'Asset Manager', desc: 'Asset CRUD, approve requests, manage maintenance', count: 4 },
  { name: 'Department Head', desc: 'Approve requests for department, view dept analytics', count: 6 },
  { name: 'Employee', desc: 'Request assets, book resources, raise maintenance', count: 15 },
  { name: 'Auditor', desc: 'Create audits, scan QR codes, generate reports', count: 2 },
];

const modules = ['Dashboard', 'Asset Registry', 'Register Asset', 'QR Manager', 'Employee Dir.', 'Requests', 'Maintenance', 'Predictions', 'Bookings', 'Audits', 'AI Chatbot', 'Analytics', 'Settings'];

const permissions: Record<string, Record<string, string>> = {
  'Admin':           { 'Dashboard': '✅ Full', 'Asset Registry': '✅ CRUD', 'Register Asset': '✅', 'QR Manager': '✅', 'Employee Dir.': '✅ CRUD', 'Requests': '✅', 'Maintenance': '✅', 'Predictions': '✅', 'Bookings': '✅', 'Audits': '✅', 'AI Chatbot': '✅', 'Analytics': '✅ Full', 'Settings': '✅' },
  'Asset Manager':   { 'Dashboard': '✅ Full', 'Asset Registry': '✅ CRUD', 'Register Asset': '✅', 'QR Manager': '✅', 'Employee Dir.': '👁️', 'Requests': '✅ Approve', 'Maintenance': '✅ Full', 'Predictions': '✅', 'Bookings': '✅', 'Audits': '✅', 'AI Chatbot': '✅', 'Analytics': '✅ Full', 'Settings': '❌' },
  'Department Head': { 'Dashboard': '✅ Dept', 'Asset Registry': '👁️', 'Register Asset': '❌', 'QR Manager': '👁️ Scan', 'Employee Dir.': '👁️ Dept', 'Requests': '✅ Approve', 'Maintenance': '✅ Approve', 'Predictions': '👁️ Dept', 'Bookings': '✅', 'Audits': '👁️', 'AI Chatbot': '✅', 'Analytics': '✅ Dept', 'Settings': '❌' },
  'Employee':        { 'Dashboard': '✅ Self', 'Asset Registry': '👁️', 'Register Asset': '❌', 'QR Manager': '👁️ Scan', 'Employee Dir.': '👁️ Self', 'Requests': '✅ Create', 'Maintenance': '✅ Raise', 'Predictions': '❌', 'Bookings': '✅', 'Audits': '❌', 'AI Chatbot': '✅', 'Analytics': '✅ Self', 'Settings': '❌' },
  'Auditor':         { 'Dashboard': '✅ Audit', 'Asset Registry': '👁️', 'Register Asset': '❌', 'QR Manager': '✅ Scan', 'Employee Dir.': '❌', 'Requests': '❌', 'Maintenance': '❌', 'Predictions': '❌', 'Bookings': '❌', 'Audits': '✅ Full', 'AI Chatbot': '✅', 'Analytics': '✅ Audit', 'Settings': '❌' },
};

export default function RolesPage() {
  return (
    <>
      <Header title="Roles & Permissions" notificationCount={notifications.filter(n => !n.isRead).length} />
      <div className="p-6 space-y-6">
        <div className="opacity-0 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-white">Roles & Permissions</h2>
          <p className="text-sm text-slate-500">RBAC access matrix for all modules</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 opacity-0 animate-fadeInUp delay-100">
          {roles.map((role, i) => {
            const colors = ['bg-red-500/10 border-red-500/20 text-red-400', 'bg-blue-500/10 border-blue-500/20 text-blue-400', 'bg-violet-500/10 border-violet-500/20 text-violet-400', 'bg-slate-500/10 border-slate-500/20 text-slate-400', 'bg-amber-500/10 border-amber-500/20 text-amber-400'];
            return (
              <div key={role.name} className={`glass-card p-4 border ${colors[i]}`}>
                <h4 className="text-sm font-semibold mb-1">{role.name}</h4>
                <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">{role.desc}</p>
                <p className="text-lg font-bold">{role.count}</p>
                <p className="text-[10px] text-slate-600">users</p>
              </div>
            );
          })}
        </div>

        {/* Permission Matrix */}
        <div className="glass-card overflow-hidden opacity-0 animate-fadeInUp delay-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-white/5 bg-white/[0.02]">
                  <th className="px-4 py-3 font-medium sticky left-0 bg-slate-950 z-10">Module</th>
                  {roles.map(r => (
                    <th key={r.name} className="px-4 py-3 font-medium text-center">{r.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map(mod => (
                  <tr key={mod} className="border-b border-white/3 table-row-hover">
                    <td className="px-4 py-3 text-sm text-white font-medium sticky left-0 bg-slate-950/90 backdrop-blur z-10">{mod}</td>
                    {roles.map(r => (
                      <td key={r.name} className="px-4 py-3 text-center text-xs">
                        <span className={`${
                          permissions[r.name]?.[mod]?.includes('✅') ? 'text-emerald-400' :
                          permissions[r.name]?.[mod]?.includes('👁️') ? 'text-blue-400' :
                          'text-slate-600'
                        }`}>
                          {permissions[r.name]?.[mod] || '❌'}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
