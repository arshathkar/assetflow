'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Employee, Asset, Booking, MaintenanceRequest, AssetRequest, AuditCycle, AuditItem, Notification, UserRole } from '@/lib/types';
import { employees as initialEmployees, assets as initialAssets, bookings as initialBookings, maintenanceRequests as initialMaintenance, assetRequests as initialRequests, auditCycles as initialAuditCycles, auditItems as initialAuditItems, notifications as initialNotifications } from '@/data/mockData';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AppState {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  employees: Employee[];
  assets: Asset[];
  bookings: Booking[];
  maintenanceRequests: MaintenanceRequest[];
  assetRequests: AssetRequest[];
  auditCycles: AuditCycle[];
  auditItems: AuditItem[];
  notifications: Notification[];
  darkMode: boolean;
}

interface AppContextType extends AppState {
  login: (employeeId: string, role: UserRole) => void;
  logout: () => void;
  toggleDarkMode: () => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  addAsset: (asset: Asset) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addEmployee: (employee: Employee) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  addBooking: (booking: Booking) => void;
  addAuditCycle: (cycle: AuditCycle) => void;
  updateAuditCycle: (id: string, updates: Partial<AuditCycle>) => void;
  addMaintenanceRequest: (request: MaintenanceRequest) => void;
  updateMaintenanceRequest: (id: string, updates: Partial<MaintenanceRequest>) => void;
  markNotificationRead: (id: string) => void;
  resetBookings: () => void;
  resetData: () => void;
  searchGlobal: (query: string) => { assets: Asset[]; employees: Employee[]; maintenance: MaintenanceRequest[] };
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    isAuthenticated: false,
    currentUser: null,
    employees: initialEmployees,
    assets: initialAssets,
    bookings: initialBookings,
    maintenanceRequests: initialMaintenance,
    assetRequests: initialRequests,
    auditCycles: initialAuditCycles,
    auditItems: initialAuditItems,
    notifications: initialNotifications,
    darkMode: true,
  });

  const login = (employeeId: string, role: UserRole) => {
    const emp = state.employees.find(e => e.id === employeeId);
    if (emp) {
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        currentUser: {
          id: emp.id,
          name: emp.name,
          email: emp.email,
          role: role,
          avatar: emp.name.split(' ').map(n => n[0]).join(''),
        },
      }));
    }
  };

  const logout = () => {
    setState(prev => ({ ...prev, isAuthenticated: false, currentUser: null }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setState(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a),
    }));
  };

  const deleteAsset = (id: string) => {
    setState(prev => ({ ...prev, assets: prev.assets.filter(a => a.id !== id) }));
  };

  const addAsset = (asset: Asset) => {
    setState(prev => ({ ...prev, assets: [...prev.assets, asset] }));
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setState(prev => ({
      ...prev,
      employees: prev.employees.map(e => e.id === id ? { ...e, ...updates } : e),
    }));
  };

  const deleteEmployee = (id: string) => {
    setState(prev => ({ ...prev, employees: prev.employees.filter(e => e.id !== id) }));
  };

  const addEmployee = (employee: Employee) => {
    setState(prev => ({ ...prev, employees: [...prev.employees, employee] }));
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setState(prev => ({
      ...prev,
      bookings: prev.bookings.map(b => b.id === id ? { ...b, ...updates } : b),
    }));
  };

  const addBooking = (booking: Booking) => {
    setState(prev => ({ ...prev, bookings: [...prev.bookings, booking] }));
  };

  const addAuditCycle = (cycle: AuditCycle) => {
    setState(prev => ({ ...prev, auditCycles: [...prev.auditCycles, cycle] }));
  };

  const resetData = () => {
    setState(prev => ({
      ...prev,
      bookings: [],
      maintenanceRequests: [],
      assetRequests: [],
      auditCycles: [],
      auditItems: [],
      notifications: [],
    }));
  };

  const updateAuditCycle = (id: string, updates: Partial<AuditCycle>) => {
    setState(prev => ({
      ...prev,
      auditCycles: prev.auditCycles.map(c => c.id === id ? { ...c, ...updates } : c),
    }));
  };

  const addMaintenanceRequest = (request: MaintenanceRequest) => {
    setState(prev => ({ ...prev, maintenanceRequests: [...prev.maintenanceRequests, request] }));
  };

  const updateMaintenanceRequest = (id: string, updates: Partial<MaintenanceRequest>) => {
    setState(prev => ({
      ...prev,
      maintenanceRequests: prev.maintenanceRequests.map(m => m.id === id ? { ...m, ...updates } : m),
    }));
  };

  const markNotificationRead = (id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, isRead: true } : n),
    }));
  };

  const resetBookings = () => {
    setState(prev => ({ ...prev, bookings: [] }));
  };

  const searchGlobal = (query: string) => {
    const q = query.toLowerCase();
    return {
      assets: state.assets.filter(a => a.name.toLowerCase().includes(q) || a.assetId.toLowerCase().includes(q) || a.serialNumber.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)),
      employees: state.employees.filter(e => e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.employeeId.toLowerCase().includes(q)),
      maintenance: state.maintenanceRequests.filter(m => m.requestId.toLowerCase().includes(q) || m.assetName.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)),
    };
  };

  return (
    <AppContext.Provider value={{ ...state, login, logout, toggleDarkMode, updateAsset, deleteAsset, addAsset, updateEmployee, deleteEmployee, addEmployee, updateBooking, addBooking, addAuditCycle, updateAuditCycle, addMaintenanceRequest, updateMaintenanceRequest, markNotificationRead, resetBookings, searchGlobal }}>
      {children}
    </AppContext.Provider>
  );
}
