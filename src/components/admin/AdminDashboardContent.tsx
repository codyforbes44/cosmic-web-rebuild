
import React from 'react';
import { AdminDashboardOverview } from './panels/AdminDashboardOverview';

export const AdminDashboardContent: React.FC = () => {
  const handleRefresh = () => {
    // This component is now deprecated - functionality moved to individual panels
    window.location.reload();
  };

  return <AdminDashboardOverview onRefresh={handleRefresh} />;
};
