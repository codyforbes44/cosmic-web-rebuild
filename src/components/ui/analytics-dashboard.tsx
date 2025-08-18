import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EnhancedCard, StatCard } from './enhanced-card';
import { useRealtimeAnalytics } from '@/hooks/use-realtime';
import { Progress } from './progress';
import { Badge } from './badge';

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  format?: 'number' | 'percentage' | 'currency' | 'duration';
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

interface AnalyticsDashboardProps {
  className?: string;
  showRealtime?: boolean;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  className,
  showRealtime = true
}) => {
  const { analyticsData, trackEvent, updateMetric } = useRealtimeAnalytics();

  // Sample metrics data
  const [metrics, setMetrics] = React.useState<AnalyticsMetric[]>([
    {
      id: 'page_views',
      name: 'Page Views',
      value: 12547,
      previousValue: 11200,
      format: 'number',
      trend: 'up',
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: 'unique_visitors',
      name: 'Unique Visitors',
      value: 3421,
      previousValue: 3120,
      format: 'number',
      trend: 'up',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'conversion_rate',
      name: 'Conversion Rate',
      value: 3.2,
      previousValue: 2.8,
      format: 'percentage',
      trend: 'up',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: 'avg_session_duration',
      name: 'Avg. Session Duration',
      value: 245,
      previousValue: 220,
      format: 'duration',
      trend: 'up',
      icon: <Clock className="h-4 w-4" />
    }
  ]);

  // Update metrics from realtime data
  React.useEffect(() => {
    if (Object.keys(analyticsData).length > 0) {
      setMetrics(prev =>
        prev.map(metric => ({
          ...metric,
          value: analyticsData[metric.id] || metric.value
        }))
      );
    }
  }, [analyticsData]);

  const formatValue = (value: number, format: AnalyticsMetric['format']) => {
    switch (format) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'duration':
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      case 'number':
      default:
        return new Intl.NumberFormat('en-US').format(value);
    }
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getTrendIcon = (trend: AnalyticsMetric['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-success" />;
      case 'down':
        return <TrendingUp className="h-3 w-3 text-destructive rotate-180" />;
      default:
        return <Activity className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time insights into your website performance
          </p>
        </div>
        
        {showRealtime && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
            <Badge variant="success" size="sm">
              Live
            </Badge>
          </div>
        )}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const growth = metric.previousValue 
            ? calculateGrowth(metric.value, metric.previousValue)
            : 0;

          return (
            <StatCard
              key={metric.id}
              title={metric.name}
              value={formatValue(metric.value, metric.format)}
              subtitle={
                metric.previousValue ? (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={cn(
                      "text-xs",
                      metric.trend === 'up' && "text-success",
                      metric.trend === 'down' && "text-destructive"
                    )}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </span>
                  </div>
                ) : undefined
              }
              icon={metric.icon}
              trend={metric.trend}
            />
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Traffic Sources */}
        <EnhancedCard variant="elevated">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Traffic Sources
            </h3>
            
            <div className="space-y-3">
              {[
                { source: 'Organic Search', percentage: 45, visits: 5420 },
                { source: 'Direct', percentage: 28, visits: 3380 },
                { source: 'Social Media', percentage: 15, visits: 1810 },
                { source: 'Email', percentage: 8, visits: 965 },
                { source: 'Referral', percentage: 4, visits: 482 }
              ].map((item) => (
                <div key={item.source} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.source}</span>
                    <span className="text-muted-foreground">
                      {item.visits.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </EnhancedCard>

        {/* Top Pages */}
        <EnhancedCard variant="elevated">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Top Pages
            </h3>
            
            <div className="space-y-3">
              {[
                { page: '/', title: 'Home', views: 4250, bounce: 35 },
                { page: '/services', title: 'Services', views: 2180, bounce: 42 },
                { page: '/portfolio', title: 'Portfolio', views: 1890, bounce: 28 },
                { page: '/contact', title: 'Contact', views: 1320, bounce: 38 },
                { page: '/weather', title: 'Weather', views: 980, bounce: 45 }
              ].map((item) => (
                <div key={item.page} className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.page}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {item.views.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.bounce}% bounce
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </EnhancedCard>
      </div>

      {/* Recent Activity */}
      <EnhancedCard variant="elevated">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </h3>
          
          <div className="space-y-3">
            {[
              {
                action: 'Page View',
                page: '/services',
                time: '2 minutes ago',
                location: 'San Francisco, CA'
              },
              {
                action: 'Form Submission',
                page: '/contact',
                time: '5 minutes ago',
                location: 'New York, NY'
              },
              {
                action: 'Newsletter Signup',
                page: '/',
                time: '8 minutes ago',
                location: 'London, UK'
              },
              {
                action: 'Page View',
                page: '/portfolio',
                time: '12 minutes ago',
                location: 'Tokyo, JP'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-accent rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.page} • {activity.location}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </EnhancedCard>
    </div>
  );
};