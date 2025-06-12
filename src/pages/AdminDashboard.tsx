
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MobileAdminHeader } from '@/components/admin/components/MobileAdminHeader';
import { AdminDashboardOverview } from '@/components/admin/panels/AdminDashboardOverview';
import { AdminAnalyticsPanel } from '@/components/admin/panels/AdminAnalyticsPanel';
import { AdminUsersPanel } from '@/components/admin/panels/AdminUsersPanel';
import { AdminChatbotPanel } from '@/components/admin/panels/AdminChatbotPanel';
import { AdminAPIPanel } from '@/components/admin/panels/AdminAPIPanel';
import { AdminSystemPanel } from '@/components/admin/panels/AdminSystemPanel';
import { AdminSecurityPanel } from '@/components/admin/panels/AdminSecurityPanel';
import SEO from '@/components/SEO';

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getTabTitle = (tab: string) => {
    const titles = {
      overview: 'Dashboard Overview',
      analytics: 'Analytics & Insights',
      users: 'User Management',
      chatbot: 'Chatbot Management',
      api: 'API & Secrets',
      system: 'System Settings',
      security: 'Security Center'
    };
    return titles[tab as keyof typeof titles] || 'Admin Dashboard';
  };

  const getTabSubtitle = (tab: string) => {
    const subtitles = {
      overview: 'Centralized management console',
      analytics: 'Track performance and usage',
      users: 'Manage user accounts and roles',
      chatbot: 'Configure AI assistant',
      api: 'Manage API keys and secrets',
      system: 'System configuration and settings',
      security: 'Security monitoring and controls'
    };
    return subtitles[tab as keyof typeof subtitles];
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminDashboardOverview key={refreshKey} onRefresh={handleRefresh} />;
      case 'analytics':
        return <AdminAnalyticsPanel />;
      case 'users':
        return <AdminUsersPanel />;
      case 'chatbot':
        return <AdminChatbotPanel />;
      case 'api':
        return <AdminAPIPanel />;
      case 'system':
        return <AdminSystemPanel />;
      case 'security':
        return <AdminSecurityPanel />;
      default:
        return <AdminDashboardOverview key={refreshKey} onRefresh={handleRefresh} />;
    }
  };

  return (
    <>
      <SEO 
        title="Admin Dashboard - Management Console" 
        description="Secure admin dashboard for managing all application features and settings"
      />
      <AdminGuard>
        <AdminLayout>
          <MobileAdminHeader
            title={getTabTitle(activeTab)}
            subtitle={getTabSubtitle(activeTab)}
            onRefresh={activeTab === 'overview' ? handleRefresh : undefined}
          />
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </AdminLayout>
      </AdminGuard>
    </>
  );
};

export default AdminDashboard;
