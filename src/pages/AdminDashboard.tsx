
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboardOverview } from '@/components/admin/panels/AdminDashboardOverview';
import { AdminAnalyticsPanel } from '@/components/admin/panels/AdminAnalyticsPanel';
import { AdminUsersPanel } from '@/components/admin/panels/AdminUsersPanel';
import { AdminUserVerificationPanel } from '@/components/admin/panels/AdminUserVerificationPanel';
import { AdminSecurePagesPanel } from '@/components/admin/panels/AdminSecurePagesPanel';
import { AdminChatbotPanel } from '@/components/admin/panels/AdminChatbotPanel';
import { AdminAPIPanel } from '@/components/admin/panels/AdminAPIPanel';
import { AdminSystemPanel } from '@/components/admin/panels/AdminSystemPanel';
import { AdminSecurityPanel } from '@/components/admin/panels/AdminSecurityPanel';
import { AdminDesktopHeader } from '@/components/admin/components/AdminDesktopHeader';
import SEO from '@/components/SEO';

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getTabInfo = (tab: string) => {
    const tabInfo = {
      overview: { 
        title: 'Dashboard Overview', 
        subtitle: 'Centralized management console',
        icon: 'BarChart3'
      },
      analytics: { 
        title: 'Analytics & Insights', 
        subtitle: 'Track performance and usage',
        icon: 'Activity'
      },
      users: { 
        title: 'User Management', 
        subtitle: 'Manage user accounts and roles',
        icon: 'Users'
      },
      verification: { 
        title: 'Admin Verification', 
        subtitle: 'Verify admin user access',
        icon: 'Shield'
      },
      'secure-pages': {
        title: 'Secure Pages',
        subtitle: 'Manage protected content and access controls',
        icon: 'FileText'
      },
      chatbot: { 
        title: 'Chatbot Management', 
        subtitle: 'Configure AI assistant',
        icon: 'Bot'
      },
      api: { 
        title: 'API & Secrets', 
        subtitle: 'Manage API keys and secrets',
        icon: 'Key'
      },
      system: { 
        title: 'System Settings', 
        subtitle: 'System configuration and settings',
        icon: 'Settings'
      },
      security: { 
        title: 'Security Center', 
        subtitle: 'Security monitoring and controls',
        icon: 'Shield'
      }
    };
    return tabInfo[tab as keyof typeof tabInfo] || tabInfo.overview;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminDashboardOverview key={refreshKey} onRefresh={handleRefresh} />;
      case 'analytics':
        return <AdminAnalyticsPanel />;
      case 'users':
        return <AdminUsersPanel />;
      case 'verification':
        return <AdminUserVerificationPanel />;
      case 'secure-pages':
        return <AdminSecurePagesPanel />;
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

  const currentTabInfo = getTabInfo(activeTab);

  return (
    <>
      <SEO 
        title={`${currentTabInfo.title} - Admin Dashboard`}
        description={`Admin dashboard - ${currentTabInfo.subtitle}`}
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&crop=center"
      />
      <AdminGuard>
        <AdminLayout>
          <div className="flex flex-col h-full bg-space-dark-blue">
            <AdminDesktopHeader
              title={currentTabInfo.title}
              subtitle={currentTabInfo.subtitle}
              onRefresh={activeTab === 'overview' ? handleRefresh : undefined}
              activeTab={activeTab}
            />
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </AdminLayout>
      </AdminGuard>
    </>
  );
};

export default AdminDashboard;
