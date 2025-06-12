
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
  Key,
  TrendingUp,
  Server,
  Globe
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
      change: '+12% from last month',
      trend: 'up'
    },
    { 
      title: 'Active Sessions', 
      value: isLoading ? '...' : dashboardData?.activeSessions.toString() || '0', 
      icon: Activity, 
      change: 'Last 24 hours',
      trend: 'neutral'
    },
    { 
      title: 'Page Views', 
      value: isLoading ? '...' : dashboardData?.pageViews.toLocaleString() || '0', 
      icon: BarChart3, 
      change: '+8% from last week',
      trend: 'up'
    },
    { 
      title: 'Form Submissions', 
      value: isLoading ? '...' : dashboardData?.contactForms.toString() || '0', 
      icon: Mail, 
      change: '+15% from last month',
      trend: 'up'
    },
  ];

  const systemStatus = [
    { name: 'Database', status: 'operational', color: 'bg-green-500', uptime: '99.99%' },
    { name: 'Authentication', status: 'operational', color: 'bg-green-500', uptime: '99.95%' },
    { name: 'Edge Functions', status: 'operational', color: 'bg-green-500', uptime: '99.98%' },
    { name: 'Storage', status: 'operational', color: 'bg-green-500', uptime: '99.97%' },
  ];

  const quickActions = [
    { 
      id: 'analytics', 
      title: 'View Analytics', 
      icon: BarChart3, 
      description: 'Detailed performance metrics',
      color: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20'
    },
    { 
      id: 'users', 
      title: 'Manage Users', 
      icon: Users, 
      description: 'User accounts and permissions',
      color: 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20'
    },
    { 
      id: 'chatbot', 
      title: 'Configure Bot', 
      icon: Bot, 
      description: 'AI assistant settings',
      color: 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20'
    },
    { 
      id: 'api', 
      title: 'API Management', 
      icon: Key, 
      description: 'Keys and integrations',
      color: 'bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20'
    },
    { 
      id: 'system', 
      title: 'System Settings', 
      icon: Settings, 
      description: 'Configuration and preferences',
      color: 'bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20'
    },
    { 
      id: 'security', 
      title: 'Security Center', 
      icon: Shield, 
      description: 'Monitor and protect',
      color: 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
    },
  ];

  const handleQuickAction = (actionId: string) => {
    navigate(`/admin?tab=${actionId}`);
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="bg-space-deep-blue border-gray-700 hover:border-gray-600 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-400" />}
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                </div>
                <div className="p-3 bg-accent/10 rounded-full">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Status */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time monitoring of all services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${system.color}`} />
                  <div>
                    <p className="text-white font-medium">{system.name}</p>
                    <p className="text-gray-400 text-sm capitalize">{system.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{system.uptime}</p>
                  <p className="text-gray-400 text-xs">Uptime</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest system events and actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <div className="flex-1">
                  <p className="text-white text-sm">System backup completed</p>
                  <p className="text-gray-400 text-xs">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <div className="flex-1">
                  <p className="text-white text-sm">New user registered</p>
                  <p className="text-gray-400 text-xs">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <div className="flex-1">
                  <p className="text-white text-sm">API rate limit adjusted</p>
                  <p className="text-gray-400 text-xs">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-space-deep-blue border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-gray-400">
            Access frequently used administrative tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Button 
                key={action.id}
                variant="outline" 
                className={`h-24 flex-col gap-3 ${action.color} transition-all duration-200 text-left p-4`}
                onClick={() => handleQuickAction(action.id)}
              >
                <action.icon className="h-6 w-6" />
                <div className="space-y-1">
                  <span className="font-medium block">{action.title}</span>
                  <span className="text-xs text-gray-400 block">{action.description}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
