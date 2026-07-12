'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import { notifications } from '@/data/mockData';
import { useApp } from '@/lib/context';
import { ConfirmDialog, AlertDialog } from '@/components/ui/Dialogs';

export default function SettingsPage() {
  const { resetData } = useApp();
  const [activeSection, setActiveSection] = useState('general');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [settings, setSettings] = useState({
    orgName: 'Acme Corporation',
    orgEmail: 'admin@acmecorp.in',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    autoHealthRecalc: true,
    predictiveAlerts: true,
    slaEnforcement: true,
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    auditReminders: true,
    warrantyAlerts: true,
    maintenanceSla: 48,
    approvalLevels: 2,
    autoRetireYears: 10,
    depreciationMethod: 'straight-line',
    qrFormat: 'svg',
    idPrefix: 'AF-',
    idDigits: 6,
  });

  const sections = [
    { key: 'general', label: '🏢 General', desc: 'Organization settings' },
    { key: 'ai', label: '🤖 AI Configuration', desc: 'AI engine settings' },
    { key: 'notifications', label: '🔔 Notifications', desc: 'Alert preferences' },
    { key: 'asset-policy', label: '📋 Asset Policies', desc: 'Rules & automation' },
    { key: 'integrations', label: '🔌 Integrations', desc: 'Third-party connections' },
    { key: 'data', label: '💾 Data Management', desc: 'Database tools & reset' },
    { key: 'about', label: 'ℹ️ About', desc: 'System information' },
  ];

  return (
    <>
      <Header title="Settings" />
      <div className="p-6">
        <div className="opacity-0 animate-fadeInUp mb-6">
          <h2 className="text-2xl font-bold text-white">⚙️ Settings</h2>
          <p className="text-sm text-slate-500">Manage your organization and system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Nav */}
          <div className="glass-card p-3 h-fit opacity-0 animate-fadeInUp delay-100">
            <nav className="space-y-1">
              {sections.map(s => (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeSection === s.key
                      ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-500'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-medium">{s.label}</span>
                  <p className="text-[10px] text-slate-600 mt-0.5">{s.desc}</p>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6 opacity-0 animate-fadeInUp delay-200">
            {/* General */}
            {activeSection === 'general' && (
              <div className="glass-card p-6 space-y-6">
                <h3 className="text-base font-semibold text-white">General Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Organization Name</label>
                    <input type="text" value={settings.orgName} onChange={e => setSettings({...settings, orgName: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Admin Email</label>
                    <input type="email" value={settings.orgEmail} onChange={e => setSettings({...settings, orgEmail: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Timezone</label>
                    <select value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm">
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Currency</label>
                    <select value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm">
                      <option value="INR">₹ INR</option>
                      <option value="USD">$ USD</option>
                      <option value="EUR">€ EUR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Date Format</label>
                    <select value={settings.dateFormat} onChange={e => setSettings({...settings, dateFormat: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Asset ID Format</label>
                    <div className="flex gap-2">
                      <input type="text" value={settings.idPrefix} className="glass-input w-20 px-3 py-2.5 text-sm" readOnly />
                      <input type="number" value={settings.idDigits} className="glass-input w-16 px-3 py-2.5 text-sm" readOnly />
                      <span className="text-xs text-slate-500 self-center">→ AF-000001</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all">Save Changes</button>
                </div>
              </div>
            )}

            {/* AI Configuration */}
            {activeSection === 'ai' && (
              <div className="glass-card p-6 space-y-6">
                <h3 className="text-base font-semibold text-white">AI Configuration</h3>
                <div className="space-y-4">
                  {[
                    { key: 'autoHealthRecalc', label: 'Auto Health Score Recalculation', desc: 'Recalculate health scores automatically when maintenance is completed' },
                    { key: 'predictiveAlerts', label: 'Predictive Maintenance Alerts', desc: 'Generate AI-powered failure predictions and proactive alerts' },
                    { key: 'slaEnforcement', label: 'SLA Enforcement', desc: 'Auto-escalate maintenance requests that breach SLA deadlines' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/3">
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, [item.key]: !(settings as Record<string, unknown>)[item.key]})}
                        className={`relative w-12 h-6 rounded-full transition-all ${(settings as Record<string, unknown>)[item.key] ? 'bg-blue-500' : 'bg-white/10'}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${(settings as Record<string, unknown>)[item.key] ? 'left-6' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                  <p className="text-xs text-blue-400 font-medium mb-2">Health Score Formula</p>
                  <code className="text-[10px] text-slate-400 block leading-relaxed font-mono">
                    Score = 100 − AgePenalty(30%) − RepairPenalty(25%) − CostPenalty(15%)<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;− ConditionPenalty − WarrantyPenalty(10%) − UtilizationPenalty(15%)
                  </code>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="glass-card p-6 space-y-6">
                <h3 className="text-base font-semibold text-white">Notification Preferences</h3>
                <div className="space-y-3">
                  {[
                    { key: 'emailNotifications', label: '📧 Email Notifications' },
                    { key: 'pushNotifications', label: '🔔 Push Notifications' },
                    { key: 'weeklyReport', label: '📊 Weekly Summary Report' },
                    { key: 'auditReminders', label: '📋 Audit Reminders' },
                    { key: 'warrantyAlerts', label: '🛡️ Warranty Expiry Alerts' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                      <span className="text-sm text-white">{item.label}</span>
                      <button
                        onClick={() => setSettings({...settings, [item.key]: !(settings as Record<string, unknown>)[item.key]})}
                        className={`relative w-12 h-6 rounded-full transition-all ${(settings as Record<string, unknown>)[item.key] ? 'bg-blue-500' : 'bg-white/10'}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${(settings as Record<string, unknown>)[item.key] ? 'left-6' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Asset Policies */}
            {activeSection === 'asset-policy' && (
              <div className="glass-card p-6 space-y-6">
                <h3 className="text-base font-semibold text-white">Asset Policies</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Maintenance SLA (hours)</label>
                    <input type="number" value={settings.maintenanceSla} onChange={e => setSettings({...settings, maintenanceSla: parseInt(e.target.value)})} className="glass-input w-full px-3 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Approval Levels</label>
                    <select value={settings.approvalLevels} onChange={e => setSettings({...settings, approvalLevels: parseInt(e.target.value)})} className="glass-input w-full px-3 py-2.5 text-sm">
                      <option value={1}>Single Approval</option>
                      <option value={2}>Two-Level (Dept Head → Admin)</option>
                      <option value={3}>Three-Level</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Auto-Retire After (years)</label>
                    <input type="number" value={settings.autoRetireYears} onChange={e => setSettings({...settings, autoRetireYears: parseInt(e.target.value)})} className="glass-input w-full px-3 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Depreciation Method</label>
                    <select value={settings.depreciationMethod} onChange={e => setSettings({...settings, depreciationMethod: e.target.value})} className="glass-input w-full px-3 py-2.5 text-sm">
                      <option value="straight-line">Straight-Line</option>
                      <option value="declining-balance">Declining Balance</option>
                      <option value="sum-of-years">Sum of Years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeSection === 'integrations' && (
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">Integrations</h3>
                {[
                  { name: 'Odoo ERP', icon: '🔗', status: 'connected', desc: 'Sync assets, employees, and departments' },
                  { name: 'Google Workspace', icon: '📧', status: 'connected', desc: 'SSO and calendar integration' },
                  { name: 'Jira', icon: '📋', status: 'disconnected', desc: 'Create tickets for maintenance tasks' },
                ].map(int => (
                  <div key={int.name} className="flex items-center justify-between p-4 rounded-xl bg-white/3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{int.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{int.name}</p>
                        <p className="text-xs text-slate-500">{int.desc}</p>
                      </div>
                    </div>
                    <button className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      int.status === 'connected'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                    }`}>
                      {int.status === 'connected' ? '✓ Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* About */}
            {activeSection === 'about' && (
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">About AssetFlow AI</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Version', value: '2.0.0-beta' },
                    { label: 'Build', value: '2026.07.12' },
                    { label: 'Framework', value: 'Next.js 15 + TypeScript' },
                    { label: 'AI Engine', value: 'Client-side deterministic algorithms' },
                    { label: 'License', value: 'Enterprise License' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-slate-300 font-mono text-xs">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/10 rounded-xl">
                  <p className="text-xs text-blue-400 font-medium">⚡ AssetFlow AI</p>
                  <p className="text-[10px] text-slate-400 mt-1">Built for Next-Gen Asset Management.</p>
                </div>
              </div>
            )}

            {/* Data Management */}
            {activeSection === 'data' && (
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">Data Management</h3>
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <h4 className="text-sm font-semibold text-red-400 mb-1">Danger Zone</h4>
                  <p className="text-xs text-slate-400 mb-4">Reset all system data to zero. Employees and Assets will be preserved. This action cannot be undone.</p>
                  <button onClick={() => setShowResetConfirm(true)} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-xl border border-red-500/20 transition-all">
                    Reset All Operational Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Operational Data"
        message="Are you absolutely sure you want to reset all operational data? Employees and Assets will be preserved. This action cannot be undone."
        confirmText="Reset Data"
        isDanger={true}
        onConfirm={() => {
          resetData();
          setShowResetConfirm(false);
          setShowResetSuccess(true);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />

      <AlertDialog
        isOpen={showResetSuccess}
        title="Success"
        message="Data reset successfully."
        onClose={() => setShowResetSuccess(false)}
      />
    </>
  );
}
