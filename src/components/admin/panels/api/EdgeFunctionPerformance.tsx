import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  Zap,
  XCircle,
} from 'lucide-react';
import { useEdgeFunctionMetrics, FunctionStats } from '@/hooks/useEdgeFunctionMetrics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import UnifiedLoading from '@/components/ui/UnifiedLoading';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, trend, trendValue }) => (
  <Card className="bg-card/30 backdrop-blur-sm border-border/50">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trendValue && (
            <div className={`flex items-center gap-1 mt-1 text-xs ${
              trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-muted-foreground'
            }`}>
              {trend === 'up' && <TrendingUp className="h-3 w-3" />}
              {trend === 'down' && <TrendingUp className="h-3 w-3 rotate-180" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const FunctionRow: React.FC<{ stat: FunctionStats }> = ({ stat }) => {
  const getStatusColor = (errorRate: number) => {
    if (errorRate === 0) return 'bg-green-500';
    if (errorRate < 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getResponseTimeColor = (avgTime: number) => {
    if (avgTime < 500) return 'text-green-400';
    if (avgTime < 2000) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`h-2 w-2 rounded-full ${getStatusColor(stat.errorRate)}`} />
        <div>
          <p className="font-medium text-foreground">{stat.functionName}</p>
          <p className="text-xs text-muted-foreground">
            Last: {stat.lastRequest ? new Date(stat.lastRequest).toLocaleTimeString() : 'N/A'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="text-right">
          <p className="font-medium text-foreground">{stat.totalRequests}</p>
          <p className="text-xs text-muted-foreground">requests</p>
        </div>
        <div className="text-right">
          <p className={`font-medium ${getResponseTimeColor(stat.avgExecutionTime)}`}>
            {stat.avgExecutionTime}ms
          </p>
          <p className="text-xs text-muted-foreground">avg</p>
        </div>
        <div className="text-right">
          <p className={`font-medium ${stat.errorRate > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {stat.errorRate.toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">errors</p>
        </div>
      </div>
    </div>
  );
};

export const EdgeFunctionPerformance: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const { data, isLoading, error, refetch, isFetching } = useEdgeFunctionMetrics(timeRange);

  if (isLoading) {
    return (
      <Card className="bg-card/30 backdrop-blur-sm border-border/50">
        <CardContent className="py-12">
          <UnifiedLoading variant="spinner" message="Loading performance metrics..." />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card/30 backdrop-blur-sm border-destructive/50">
        <CardContent className="py-6">
          <div className="text-center">
            <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-destructive">Failed to load metrics</p>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const overview = data || {
    totalRequests: 0,
    successRate: 100,
    avgResponseTime: 0,
    errorCount: 0,
    functionStats: [],
    recentErrors: [],
    hourlyStats: [],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Edge Function Performance</h3>
          <p className="text-sm text-muted-foreground">Monitor API response times and error rates</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
            <SelectTrigger className="w-32 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={overview.totalRequests.toLocaleString()}
          subtitle={`in the last ${timeRange}`}
          icon={<Activity className="h-5 w-5 text-accent" />}
        />
        <StatCard
          title="Success Rate"
          value={`${overview.successRate.toFixed(1)}%`}
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
          trend={overview.successRate >= 99 ? 'up' : overview.successRate >= 95 ? 'neutral' : 'down'}
        />
        <StatCard
          title="Avg Response Time"
          value={`${overview.avgResponseTime}ms`}
          icon={<Clock className="h-5 w-5 text-blue-400" />}
          trend={overview.avgResponseTime < 500 ? 'up' : overview.avgResponseTime < 2000 ? 'neutral' : 'down'}
        />
        <StatCard
          title="Errors"
          value={overview.errorCount}
          subtitle={`${timeRange} period`}
          icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
        />
      </div>

      {/* Charts and Details */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-background/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Request Volume</CardTitle>
              <CardDescription>Requests and errors over time</CardDescription>
            </CardHeader>
            <CardContent>
              {overview.hourlyStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={overview.hourlyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="hour"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit' })}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                    />
                    <Bar dataKey="requests" fill="hsl(var(--accent))" name="Requests" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="errors" fill="hsl(var(--destructive))" name="Errors" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No metrics recorded yet</p>
                    <p className="text-sm">Metrics will appear as edge functions are called</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="functions">
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Function Performance</CardTitle>
              <CardDescription>Individual edge function metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {overview.functionStats.length > 0 ? (
                <div className="divide-y divide-border/30">
                  {overview.functionStats.map((stat) => (
                    <FunctionRow key={stat.functionName} stat={stat} />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No function metrics recorded</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Recent Errors</CardTitle>
              <CardDescription>Last 10 errors across all functions</CardDescription>
            </CardHeader>
            <CardContent>
              {overview.recentErrors.length > 0 ? (
                <div className="space-y-3">
                  {overview.recentErrors.map((error) => (
                    <div
                      key={error.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                    >
                      <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {error.function_name}
                          </Badge>
                          <Badge variant="destructive" className="text-xs">
                            {error.status_code}
                          </Badge>
                        </div>
                        {error.error_message && (
                          <p className="text-sm text-destructive/80 mt-1 truncate">
                            {error.error_message}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(error.request_timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400 opacity-50" />
                  <p>No errors in this time period</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
