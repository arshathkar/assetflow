'use client';

import Header from '@/components/layout/Header';
import { useApp } from '@/lib/context';

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useApp();
  const sortedNotifications = [...notifications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <>
      <Header title="All Notifications" />
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between opacity-0 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-white">Notifications</h2>
          <div className="text-sm text-slate-400">
            {notifications.filter(n => !n.isRead).length} unread
          </div>
        </div>

        <div className="glass-card p-2 opacity-0 animate-fadeInUp delay-100">
          {sortedNotifications.length > 0 ? (
            <div className="divide-y divide-white/5">
              {sortedNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 transition-colors ${
                    !n.isRead ? 'bg-blue-500/5' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl mt-0.5 flex-shrink-0">
                      {n.priority === 'Urgent' ? '🔴' : n.priority === 'High' ? '🟠' : '🔵'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <p className={`text-sm font-medium ${!n.isRead ? 'text-white' : 'text-slate-300'}`}>
                          {n.title}
                        </p>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {new Date(n.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 justify-end">
                    {!n.isRead && (
                      <button
                        onClick={() => markNotificationRead(n.id)}
                        className="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-medium rounded-lg border border-blue-500/20 transition-all"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              <span className="text-4xl mb-3 block">📭</span>
              <p>You have no notifications yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
