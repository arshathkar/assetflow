'use client';

import Header from '@/components/layout/Header';
import { departments, employees, assets, notifications } from '@/data/mockData';

export default function DepartmentsPage() {
  return (
    <>
      <Header title="Departments" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between opacity-0 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-white">Departments</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">+ Add Department</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-0 animate-fadeInUp delay-200">
          {departments.map((dept, i) => {
            const deptEmployees = employees.filter(e => e.departmentId === dept.id);
            const deptAssets = assets.filter(a => a.departmentId === dept.id);
            const head = employees.find(e => e.id === dept.headId);
            const colors = ['from-blue-600 to-cyan-500', 'from-emerald-600 to-teal-500', 'from-violet-600 to-purple-500', 'from-amber-600 to-orange-500', 'from-rose-600 to-pink-500', 'from-indigo-600 to-blue-500'];
            return (
              <div key={dept.id} className="glass-card-hover p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white text-lg font-bold mb-4 shadow-lg`}>
                  {dept.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{dept.name}</h3>
                {head && <p className="text-xs text-slate-500 mb-4">Head: {head.name}</p>}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/3 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-white">{deptEmployees.length}</p>
                    <p className="text-[10px] text-slate-500">Employees</p>
                  </div>
                  <div className="bg-white/3 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-white">{deptAssets.length}</p>
                    <p className="text-[10px] text-slate-500">Assets</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4 pt-3 border-t border-white/5">
                  {deptEmployees.slice(0, 5).map(emp => (
                    <div key={emp.id} className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-[9px] text-white font-medium border-2 border-slate-900 -ml-1 first:ml-0" title={emp.name}>
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                  {deptEmployees.length > 5 && (
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[9px] text-slate-400 border-2 border-slate-900 -ml-1">
                      +{deptEmployees.length - 5}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
