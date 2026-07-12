'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import { useApp } from '@/lib/context';
import { sharedResources } from '@/data/mockData';
import { ConfirmDialog } from '@/components/ui/Dialogs';
import type { Booking } from '@/lib/types';

const resourceTypeIcons: Record<string, string> = {
  'Room': '🏢',
  'Vehicle': '🚗',
  'Equipment': '📽️',
};

// Generate time slots from 8 AM to 6 PM
const timeSlots = Array.from({ length: 21 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const min = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${min}`;
});

function timeToMinutes(timeStr: string) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export default function BookingsPage() {
  const { bookings, addBooking, deleteBooking, currentUser } = useApp();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const filteredResources = sharedResources.filter(r => selectedType === 'all' || r.type === selectedType);
  const todaysBookings = bookings.filter(b => b.date === selectedDate);

  const handleCreateBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const resourceId = fd.get('resource') as string;
    const resource = sharedResources.find(r => r.id === resourceId)!;
    
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      resourceId,
      resourceName: resource.name,
      resourceType: resource.type,
      bookedBy: currentUser?.id || 'emp-1',
      bookedByName: currentUser?.name || 'Admin',
      title: fd.get('title') as string,
      date: fd.get('date') as string,
      startTime: fd.get('startTime') as string,
      endTime: fd.get('endTime') as string,
      status: 'Confirmed',
      isRecurring: false,
      createdAt: new Date().toISOString(),
    };
    
    addBooking(newBooking);
    setShowModal(false);
  };

  return (
    <>
      <Header title="Resource Bookings" />
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-0 animate-fadeInUp">
          <div>
            <h2 className="text-2xl font-bold text-white">📅 Bookings & Scheduling</h2>
            <p className="text-sm text-slate-500">Manage shared rooms, vehicles, and equipment</p>
          </div>
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            + New Booking
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 flex flex-wrap items-center gap-3 opacity-0 animate-fadeInUp delay-100">
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="glass-input px-4 py-2 text-sm text-white"
          />
          <div className="flex gap-2">
            {['all', 'Room', 'Vehicle', 'Equipment'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedType === type ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All Resources' : `${resourceTypeIcons[type]} ${type}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid - Visual Upgrade */}
        <div className="glass-card overflow-hidden opacity-0 animate-fadeInUp delay-200">
          <div className="p-4 border-b border-white/5 bg-slate-900/50">
            <h3 className="text-sm font-semibold text-white text-center">{new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-[800px] relative">
              {/* Header Row (Resources) */}
              <div className="flex border-b border-white/10 bg-white/[0.02]">
                <div className="w-20 flex-shrink-0 border-r border-white/10 p-3 text-center text-xs font-semibold text-slate-500 sticky left-0 bg-slate-950 z-20">Time</div>
                {filteredResources.map(r => (
                  <div key={r.id} className="flex-1 min-w-[120px] p-3 text-center border-r border-white/5 last:border-r-0">
                    <span className="text-lg block mb-1">{resourceTypeIcons[r.type]}</span>
                    <span className="text-xs font-medium text-white block truncate">{r.name}</span>
                    <span className="text-[9px] text-slate-500">Cap: {r.capacity || 'N/A'}</span>
                  </div>
                ))}
              </div>
              
              {/* Time Slots */}
              <div className="relative">
                {timeSlots.map(time => (
                  <div key={time} className="flex border-b border-white/5 group h-12">
                    <div className="w-20 flex-shrink-0 border-r border-white/10 p-2 text-right text-[10px] text-slate-500 sticky left-0 bg-slate-950 z-10 font-mono flex flex-col justify-center">
                      {time}
                    </div>
                    {filteredResources.map(r => (
                      <div key={r.id} className="flex-1 min-w-[120px] border-r border-white/5 last:border-r-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors relative" />
                    ))}
                  </div>
                ))}

                {/* Absolutely Positioned Booking Blocks */}
                <div className="absolute top-0 left-20 right-0 bottom-0 pointer-events-none">
                  {filteredResources.map((r, colIdx) => {
                    const rBookings = todaysBookings.filter(b => b.resourceId === r.id && b.status === 'Confirmed');
                    return rBookings.map(b => {
                      const startMins = timeToMinutes(b.startTime) - 480; // offset from 8:00 AM (480 mins)
                      const endMins = timeToMinutes(b.endTime) - 480;
                      if (startMins < 0 || endMins > 630 || startMins >= endMins) return null; // Outside grid bounds

                      const topPct = (startMins / 600) * 100; // 600 total minutes (8am to 6pm)
                      const heightPct = ((endMins - startMins) / 600) * 100;
                      const colWidth = 100 / filteredResources.length;

                      return (
                        <div
                          key={b.id}
                          className="absolute pointer-events-auto group"
                          style={{
                            top: `${topPct}%`,
                            height: `${heightPct}%`,
                            left: `${colIdx * colWidth}%`,
                            width: `${colWidth}%`,
                            padding: '2px 4px'
                          }}
                        >
                          <div className="w-full h-full bg-blue-500/20 border-l-4 border-blue-500 rounded-md p-1.5 flex flex-col overflow-hidden backdrop-blur-md shadow-lg shadow-black/20 hover:bg-blue-500/30 transition-colors">
                            <p className="text-xs font-bold text-white truncate">{b.title}</p>
                            <p className="text-[9px] text-blue-200 mt-0.5 truncate">{b.startTime} - {b.endTime}</p>
                            <p className="text-[9px] text-slate-300 mt-0.5 truncate">{b.bookedByName.split(' ')[0]}</p>
                          </div>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs text-slate-500 opacity-0 animate-fadeInUp delay-300">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500/20 border-l-2 border-blue-500 rounded-sm" /> Booked</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-white/5 rounded-sm" /> Available</span>
        </div>

        {/* Upcoming Bookings */}
        <div className="glass-card p-6 opacity-0 animate-fadeInUp delay-300">
          <h3 className="text-base font-semibold text-white mb-4">Upcoming Bookings</h3>
          <div className="space-y-2">
            {bookings.filter(b => b.status === 'Confirmed').slice(0, 8).map(b => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{resourceTypeIcons[b.resourceType] || '📅'}</span>
                  <div>
                    <p className="text-sm text-white">{b.title}</p>
                    <p className="text-xs text-slate-500">{b.resourceName} · {b.bookedByName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="text-xs text-slate-300">{b.date}</p>
                    <p className="text-xs text-slate-500">{b.startTime} — {b.endTime}</p>
                  </div>
                  <button onClick={() => setBookingToDelete(b.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Cancel Booking">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleCreateBooking} className="glass-card p-6 w-full max-w-md animate-fadeIn">
              <h3 className="text-lg font-semibold text-white mb-4">New Booking</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Resource</label>
                  <select name="resource" required className="glass-input w-full px-3 py-2.5 text-sm">
                    {sharedResources.map(r => <option key={r.id} value={r.id}>{resourceTypeIcons[r.type]} {r.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Title</label>
                  <input name="title" type="text" placeholder="Meeting title" required className="glass-input w-full px-3 py-2.5 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs text-slate-500 mb-1.5">Date</label>
                    <input name="date" type="date" defaultValue={selectedDate} required className="glass-input w-full px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Start Time</label>
                    <select name="startTime" required className="glass-input w-full px-3 py-2 text-sm">
                      {timeSlots.slice(0, -1).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">End Time</label>
                    <select name="endTime" required className="glass-input w-full px-3 py-2 text-sm">
                      {timeSlots.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">Book Resource</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!bookingToDelete}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Cancel Booking"
        isDanger={true}
        onConfirm={() => {
          if (bookingToDelete) deleteBooking(bookingToDelete);
          setBookingToDelete(null);
        }}
        onCancel={() => setBookingToDelete(null)}
      />
    </>
  );
}
