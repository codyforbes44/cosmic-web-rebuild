
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, TestTube, Calendar, TrendingUp, Users, Globe, MousePointer, BarChart3 } from 'lucide-react';
import { useAnalytics } from '@/hooks/use-analytics';
import OverviewCards from '@/components/analytics/OverviewCards';
import AnalyticsTabs from '@/components/analytics/AnalyticsTabs';
import FormSubmissionsCard from '@/components/analytics/FormSubmissionsCard';
import { trackVisitor } from '@/utils/visitorTracking';
import { toast } from '@/hooks/use-toast';

export const AdminAnalyticsPanel: React.FC = () => {
  const { data, loading, error } = useAnalytics();
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  const handleTestTracking = async () => {
    console.log('Manual tracking test initiated from admin panel');
    await trackVisitor();
    toast({
      title: "Tracking Test",
      description: "Manual visitor tracking triggered from admin panel.",
      duration: 3000,
    });
  };

  const quickStats = [
    { 
      title: 'Total Visitors', 
      value: data?.totalVisitors?.toLocaleString() || '0', 
      change: '+12%', 
      icon: Users,
      color: 'text-blue-400' 
    },
    { 
      title: 'Countries', 
      value: data?.totalCountries?.toString() || '0', 
      change: '+3%', 
      icon: Globe,
      color: 'text-green-400' 
    },
    { 
      title: 'Avg. Time on Page', 
      value: data?.avgTimeOnPage ? `${Math.floor(data.avgTimeOnPage / 60)}:${(data.avgTimeOnPage % 60).toString().padStart(2, '0')}` : '0:00', 
      change: '+8%', 
      icon: MousePointer,
      color: 'text-purple-400' 
    },
    { 
      title: 'Top Page', 
      value: data?.topPage || '/', 
      change: data?.topPage === '/' ? 'Homepage' : 'Other', 
      icon: BarChart3,
      color: 'text-orange-400' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">App Analytics</h2>
          <p className="text-gray-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            90-day visitor insights and website performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleTestTracking}
            variant="outline"
            size="sm"
            className="bg-transparent border-accent/50 text-accent hover:bg-accent-hover/10 focus:ring-2 focus:ring-accent"
          >
            <TestTube className="w-4 h-4 mr-2" />
            Test Tracking
          </Button>
          <Button 
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="bg-transparent border-white/20 text-white hover:bg-white/10 focus:ring-2 focus:ring-accent"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <Card className="bg-space-deep-blue border-gray-700">
          <CardContent className="flex justify-center items-center h-64">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mr-4"></div>
              <p className="text-white">Loading analytics data...</p>
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="bg-space-deep-blue border-red-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Analytics Error</h3>
              <p className="text-red-300 mb-4">{error}</p>
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="bg-transparent border-red-500/50 text-red-300 hover:bg-red-500/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="bg-space-deep-blue border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-green-400 text-sm">{stat.change}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Form Submissions Overview */}
          <FormSubmissionsCard />

          {/* Detailed Analytics */}
          {data && (
            <Card className="bg-space-deep-blue border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Detailed Analytics
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Comprehensive visitor data and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <AnalyticsTabs analyticsData={data} loading={loading} />
              </CardContent>
            </Card>
          )}

          {/* No Data State */}
          {data && data.totalVisitors === 0 && (
            <Card className="bg-space-deep-blue border-yellow-500/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">No Analytics Data</h3>
                  <p className="text-yellow-300 mb-2">
                    No visitor data has been collected in the last 90 days.
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Use the "Test Tracking" button to manually trigger visitor tracking.
                  </p>
                  <Button 
                    onClick={handleTestTracking}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10"
                  >
                    <TestTube className="w-4 h-4 mr-2" />
                    Test Visitor Tracking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
