
import React from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminDashboardContent } from '@/components/admin/AdminDashboardContent';
import SEO from '@/components/SEO';

const AdminDashboard = () => {
  return (
    <>
      <SEO 
        title="Admin Dashboard - Management Console" 
        description="Secure admin dashboard for managing all application features and settings"
      />
      <div className="min-h-screen bg-space-dark-blue">
        <AdminGuard>
          <AdminDashboardContent />
        </AdminGuard>
      </div>
    </>
  );
};

export default AdminDashboard;
