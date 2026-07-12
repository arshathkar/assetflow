'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import { employees } from '@/data/mockData';
import type { UserRole } from '@/lib/types';

const roleDescriptions: Record<UserRole, { icon: string; desc: string; color: string }> = {
  'Admin': { icon: '🛡️', desc: 'Full system access, manage users & assets', color: 'from-red-500 to-rose-600' },
  'Asset Manager': { icon: '📦', desc: 'Manage assets, approve requests', color: 'from-blue-500 to-indigo-600' },
  'Department Head': { icon: '👔', desc: 'Approve department requests, view analytics', color: 'from-violet-500 to-purple-600' },
  'Employee': { icon: '👤', desc: 'Request assets, book resources', color: 'from-emerald-500 to-teal-600' },
  'Auditor': { icon: '📋', desc: 'Conduct audits, scan QR codes', color: 'from-amber-500 to-orange-600' },
};

export default function LoginScreen() {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [step, setStep] = useState<'role' | 'user' | 'password'>('role');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const filteredEmployees = selectedRole
    ? employees.filter(e => e.role === selectedRole)
    : [];

  const handleLogin = () => {
    if (selectedEmployee && selectedRole) {
      if (selectedRole === 'Admin' && step !== 'password') {
        setStep('password');
        return;
      }
      if (selectedRole === 'Admin' && password !== '12345') {
        setError('Incorrect password. Default is 12345');
        return;
      }
      login(selectedEmployee, selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative w-full max-w-lg animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30 mb-4">
            <span className="text-3xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">AssetFlow AI</h1>
          <p className="text-sm text-slate-500">Intelligent Enterprise Asset Management</p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 'role' && (
          <div className="glass-card p-6 animate-fadeInUp">
            <h2 className="text-lg font-semibold text-white mb-1">Select Your Role</h2>
            <p className="text-xs text-slate-500 mb-5">Choose a role to experience the platform</p>

            <div className="space-y-2">
              {(Object.keys(roleDescriptions) as UserRole[]).map(role => {
                const cfg = roleDescriptions[role];
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => { setSelectedRole(role); setSelectedEmployee(''); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10'
                        : 'border-white/5 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.color} flex items-center justify-center text-lg shadow-lg`}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${isSelected ? 'text-blue-400' : 'text-white'}`}>{role}</p>
                      <p className="text-[11px] text-slate-500">{cfg.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-blue-500 bg-blue-500' : 'border-white/20'
                    }`}>
                      {isSelected && <span className="text-white text-[10px]">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => selectedRole && setStep('user')}
              disabled={!selectedRole}
              className={`w-full mt-5 py-3 rounded-xl text-sm font-medium transition-all ${
                selectedRole
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/20'
                  : 'bg-white/5 text-slate-600 cursor-not-allowed'
              }`}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: User Selection */}
        {step === 'user' && selectedRole && (
          <div className="glass-card p-6 animate-fadeInUp">
            <button onClick={() => setStep('role')} className="text-xs text-slate-500 hover:text-blue-400 transition-colors mb-3 block">
              ← Back to roles
            </button>
            <h2 className="text-lg font-semibold text-white mb-1">Select User</h2>
            <p className="text-xs text-slate-500 mb-5">Logging in as <span className="text-blue-400">{selectedRole}</span></p>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredEmployees.map(emp => {
                const isSelected = selectedEmployee === emp.id;
                return (
                  <button
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : 'border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isSelected ? 'text-blue-400' : 'text-white'}`}>{emp.name}</p>
                      <p className="text-[10px] text-slate-500">{emp.department} · {emp.email}</p>
                    </div>
                    {isSelected && <span className="text-blue-400 text-sm">✓</span>}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleLogin}
              disabled={!selectedEmployee}
              className={`w-full mt-5 py-3 rounded-xl text-sm font-medium transition-all ${
                selectedEmployee
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/20'
                  : 'bg-white/5 text-slate-600 cursor-not-allowed'
              }`}
            >
              {selectedRole === 'Admin' ? 'Continue to Password →' : 'Login securely'}
            </button>
          </div>
        )}

        {/* Step 3: Password for Admin */}
        {step === 'password' && (
          <div className="glass-card p-6 animate-fadeInUp">
            <button onClick={() => setStep('user')} className="text-xs text-slate-500 hover:text-blue-400 transition-colors mb-3 block">
              ← Back to users
            </button>
            <h2 className="text-lg font-semibold text-white mb-1">Enter Admin Password</h2>
            <p className="text-xs text-slate-500 mb-5">Admin privileges require authentication.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter password..."
                  className="glass-input w-full px-4 py-3 text-sm"
                  autoFocus
                />
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={!password}
              className={`w-full mt-5 py-3 rounded-xl text-sm font-medium transition-all ${
                password
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/20'
                  : 'bg-white/5 text-slate-600 cursor-not-allowed'
              }`}
            >
              Login securely
            </button>
          </div>
        )}

        <p className="text-center text-[10px] text-slate-700 mt-6">v2.0.0 · Demo Mode · No actual authentication</p>
      </div>
    </div>
  );
}
