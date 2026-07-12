'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  const { currentUser, notifications, markNotificationRead, darkMode, toggleDarkMode, searchGlobal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 6);

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return null;
    return searchGlobal(searchQuery);
  }, [searchQuery, searchGlobal]);

  const hasResults = searchResults && (searchResults.assets.length > 0 || searchResults.employees.length > 0 || searchResults.maintenance.length > 0);

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-6 gap-4"
      style={{
        background: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-white whitespace-nowrap">{title}</h1>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4 relative">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search assets, people, requests..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            className="glass-input w-full pl-9 pr-4 py-2 text-sm"
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearch && searchQuery.length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
            style={{ background: 'rgba(15, 23, 42, 0.98)', backdropFilter: 'blur(20px)' }}>
            {hasResults ? (
              <div className="max-h-80 overflow-y-auto p-2">
                {searchResults!.assets.length > 0 && (
                  <div className="mb-2">
                    <p className="text-[10px] text-slate-500 uppercase px-2 py-1 font-semibold">Assets ({searchResults!.assets.length})</p>
                    {searchResults!.assets.slice(0, 5).map(a => (
                      <Link key={a.id} href={`/assets/${a.id}`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-base">{a.categoryIcon}</span>
                        <div>
                          <p className="text-sm text-white">{a.name}</p>
                          <p className="text-[10px] text-blue-400 font-mono">{a.assetId}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults!.employees.length > 0 && (
                  <div className="mb-2">
                    <p className="text-[10px] text-slate-500 uppercase px-2 py-1 font-semibold">People ({searchResults!.employees.length})</p>
                    {searchResults!.employees.slice(0, 5).map(e => (
                      <Link key={e.id} href={`/people/${e.id}`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-[9px] font-bold">
                          {e.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm text-white">{e.name}</p>
                          <p className="text-[10px] text-slate-500">{e.department}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults!.maintenance.length > 0 && (
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase px-2 py-1 font-semibold">Maintenance ({searchResults!.maintenance.length})</p>
                    {searchResults!.maintenance.slice(0, 3).map(m => (
                      <Link key={m.id} href="/maintenance" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-base">🔧</span>
                        <div>
                          <p className="text-sm text-white">{m.requestId}</p>
                          <p className="text-[10px] text-slate-500">{m.assetName}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-slate-500">No results found for &quot;{searchQuery}&quot;</div>
            )}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowSearch(false); }}
            className="relative p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-lg">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl shadow-2xl border border-white/10 animate-fadeIn z-50"
                style={{ background: 'rgba(15, 23, 42, 0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                <div className="p-4 border-b border-white/5">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <p className="text-[10px] text-slate-500">{unreadCount} unread</p>
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                  {recentNotifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors text-left ${
                        !n.isRead ? 'bg-blue-500/5' : ''
                      }`}
                    >
                      <span className="text-lg mt-0.5">
                        {n.priority === 'Urgent' ? '🔴' : n.priority === 'High' ? '🟠' : '🔵'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white">{n.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                        <p className="text-[9px] text-slate-600 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                      </div>
                      {!n.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-white/5">
                  <Link href="/settings" className="block text-center text-xs text-blue-400 hover:text-blue-300 py-1.5">
                    View all notifications →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleDarkMode} className="p-2 rounded-xl hover:bg-white/5 transition-colors text-lg" title="Toggle theme">
          {darkMode ? '🌙' : '☀️'}
        </button>

        {/* User */}
        <div className="flex items-center gap-2 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
            {currentUser?.avatar || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-white">{currentUser?.name?.split(' ')[0] || 'User'}</p>
            <p className="text-[10px] text-slate-500">{currentUser?.role || 'Guest'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
