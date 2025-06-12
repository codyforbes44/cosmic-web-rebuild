
import React from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-space-dark-blue">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
