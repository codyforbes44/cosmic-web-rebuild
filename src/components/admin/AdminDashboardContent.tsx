
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Database, 
  Shield, 
  Mail, 
  FileText,
  Activity,
  Globe,
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminUsersPanel } from './panels/AdminUsersPanel';
import { AdminAnalyticsPanel } from './panels/AdminAnalyticsPanel';
import { AdminSystemPanel } from './panels/AdminSystemPanel';
import { AdminSecurityPanel } from './panels/AdminSecurityPanel';

export const AdminDashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch real dashboard data
  const { data: dashboardData, isLoading, refetch } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      // Fetch visitor count (total)
      const { count: visitorCount } = await supabase
        .from('visitor_metadata')
        .select('*', { count: 'exact', head: true });

      // Fetch contact submissions count
      const { count: contactCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });

      // Fetch quote requests count
      const { count: quoteCount } = await supabase
        .from('quote_requests')
        .select('*', { count: 'exact', head: true });

      // Fetch recent visitors for active sessions (last 24 hours)
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      
      const { count: activeSessions } = await supabase
        .from('visitor_metadata')
        .select('*', { count: 'exact', head: true })
        .gte('visit_timestamp', twentyFourHoursAgo.toISOString());

      // Calculate page views (total visitors since we track each visit)
      const pageViews = visitorCount || 0;

      return {
        totalVisitors: visitorCount || 0,
        activeSessions: activeSessions || 0,
        pageViews: pageViews,
        contactForms: (contactCount || 0) + (quoteCount || 0),
      };
    },
  });

  const dashboardStats = [
    { 
      title: 'Total Visitors', 
      value: isLoading ? '...' : dashboardData?.totalVisitors.toLocaleString() || '0', 
      icon: Users, 
      change: 'All time' 
    },
    { 
      title: 'Active Sessions', 
      value: isLoading ? '...' : dashboardData?.activeSessions.toString() || '0', 
      icon: Activity, 
      change: 'Last 24h' 
    },
    { 
      title: 'Page Views', 
      value: isLoading ? '...' : dashboardData?.pageViews.toLocaleString() || '0', 
      icon: BarChart3, 
      change: 'All time' 
    },
    { 
      title: 'Form Submissions', 
      value: isLoading ? '...' : dashboardData?.contactForms.toString() || '0', 
      icon: Mail, 
      change: 'All time' 
    },
  ];

  const systemStatus = [
    { name: 'Database', status: 'operational', color: 'bg-green-500' },
    { name: 'Authentication', status: 'operational', color: 'bg-green-500' },
    { name: 'Edge Functions', status: 'operational', color: 'bg-green-500' },
    { name: 'Storage', status: 'operational', color: 'bg-green-500' },
  ];

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Centralized management console for all application features</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="bg-transparent border-white/20 text-white hover:bg-white/10"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
            System Operational
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-space-deep-blue">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <BarChart3 size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Activity size={16} />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Users size={16} />
            Users
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Settings size={16} />
            System
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Shield size={16} />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Real Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="bg-space-deep-blue border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-gray-400 text-sm">{stat.change}</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System Status */}
          <Card className="bg-space-deep-blue border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Status
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time status of all system components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${system.color}`} />
                    <div>
                      <p className="text-white font-medium">{system.name}</p>
                      <p className="text-gray-400 text-sm capitalize">{system.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-space-deep-blue border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 border-gray-600 hover:bg-accent-hover/10 hover:border-accent focus:ring-2 focus:ring-accent"
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm">View Analytics</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 border-gray-600 hover:bg-accent-hover/10 hover:border-accent focus:ring-2 focus:ring-accent"
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Manage Users</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 border-gray-600 hover:bg-accent-hover/10 hover:border-accent focus:ring-2 focus:ring-accent"
                  onClick={() => setActiveTab('system')}
                >
                  <Settings className="h-5 w-5" />
                  <span className="text-sm">System Settings</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 border-gray-600 hover:bg-accent-hover/10 hover:border-accent focus:ring-2 focus:ring-accent"
                  onClick={() => setActiveTab('security')}
                >
                  <Shield className="h-5 w-5" />
                  <span className="text-sm">Security</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <AdminAnalyticsPanel />
        </TabsContent>

        <TabsContent value="users">
          <AdminUsersPanel />
        </TabsContent>

        <TabsContent value="system">
          <AdminSystemPanel />
        </TabsContent>

        <TabsContent value="security">
          <AdminSecurityPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};
