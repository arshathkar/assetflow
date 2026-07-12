'use client';

import { AppProvider, useApp } from '@/lib/context';
import Sidebar from '@/components/layout/Sidebar';
import LoginScreen from '@/components/auth/LoginScreen';
import { useEffect } from 'react';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}

function ThemeManager() {
  const { darkMode } = useApp();
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return null;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemeManager />
      <AuthGate>{children}</AuthGate>
    </AppProvider>
  );
}
