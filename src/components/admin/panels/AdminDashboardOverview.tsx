
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BarChart3, 
  Mail, 
  Activity,
  Settings,
  Shield,
  Bot,
  Key
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MobileStatsGrid } from '../components/MobileStatsGrid';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardOverviewProps {
  onRefresh: () => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ onRefresh }) => {
  const navigate = useNavigate();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const { count: visitorCount } = await supabase
        .from('visitor_metadata')
        .select('*', { count: 'exact', head: true });

      const { count: contactCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });

      const { count: quoteCount } = await supabase
        .from('quote_requests')
        .select('*', { count: 'exact', head: true });

      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      
      const { count: activeSessions } = await supabase
        .from('visitor_metadata')
        .select('*', { count: 'exact', head: true })
        .gte('visit_timestamp', twentyFourHoursAgo.toISOString());

      return {
        totalVisitors: visitorCount || 0,
        activeSessions: activeSessions || 0,
        pageViews: visitorCount || 0,
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

  const quickActions = [
    { id: 'analytics', title: 'Analytics', icon: BarChart3, description: 'View detailed analytics' },
    { id: 'users', title: 'Users', icon: Users, description: 'Manage user accounts' },
    { id: 'chatbot', title: 'Chatbot', icon: Bot, description: 'Configure AI assistant' },
    { id: 'api', title: 'API Keys', icon: Key, description: 'Manage API access' },
    { id: 'system', title: 'Settings', icon: Settings, description: 'System configuration' },
    { id: 'security', title: 'Security', icon: Shield, description: 'Security monitoring' },
  ];

  const handleQuickAction = (actionId: string) => {
    navigate(`/admin?tab=${actionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <MobileStatsGrid stats={dashboardStats} />

      {/* System Status */}
      <div className="p-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {systemStatus.map((system, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${system.color}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium truncate">{system.name}</p>
                    <p className="text-gray-400 text-sm capitalize">{system.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-400">
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action) => (
                <Button 
                  key={action.id}
                  variant="outline" 
                  className="h-20 flex-col gap-2 border-gray-600 hover:bg-accent-hover/10 hover:border-accent focus:ring-2 focus:ring-accent p-4"
                  onClick={() => handleQuickAction(action.id)}
                >
                  <action.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="text-center min-w-0">
                    <span className="text-sm font-medium block truncate">{action.title}</span>
                    <span className="text-xs text-gray-400 hidden md:block">{action.description}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
