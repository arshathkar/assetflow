'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/lib/context';

const navItems = [
  { label: 'Dashboard', icon: '📊', href: '/' },
  { label: 'Assets', icon: '📦', href: '/assets' },
  { label: 'People', icon: '👥', href: '/people' },
  { label: 'Maintenance', icon: '🔧', href: '/maintenance' },
  { label: 'Bookings', icon: '📅', href: '/bookings' },
  { label: 'Audits', icon: '📋', href: '/audits' },
  { label: 'AI Hub', icon: '🤖', href: '/ai' },
  { label: 'Analytics', icon: '📈', href: '/analytics' },
  { label: 'Settings', icon: '⚙️', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser, logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
      style={{
        background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo + Collapse toggle */}
      <div className={`flex items-center h-16 border-b border-white/5 ${collapsed ? 'justify-center px-2' : 'px-4'}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all flex-shrink-0 border border-white/5"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
            <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2 ml-3">
            <span className="text-xl">⚡</span>
            <span className="text-base font-bold gradient-text whitespace-nowrap">AssetFlow AI</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                active
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-500 rounded-r-full" />}
              <span className={`text-lg flex-shrink-0 ${active ? 'drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]' : 'group-hover:scale-110 transition-transform'}`}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl border border-white/10">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={`border-t border-white/5 p-3 ${collapsed ? 'px-2' : ''}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-2'}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20 flex-shrink-0">
            {currentUser?.avatar || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentUser?.name || 'User'}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser?.role || 'Guest'}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={logout}
              className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
