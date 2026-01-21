import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Activity, Gauge, Clock, Eye, MousePointer, LayoutGrid, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface WebVitalsData {
  id: string;
  request_timestamp: string;
  metadata: {
    type: string;
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    fcp: number | null;
    ttfb: number | null;
    inp: number | null;
    url: string;
    userAgent: string;
    connectionType?: string;
    deviceMemory?: number;
  };
}

interface VitalStats {
  name: string;
  label: string;
  value: number | null;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  icon: React.ReactNode;
  description: string;
  goodThreshold: number;
  poorThreshold: number;
}

const getVitalRating = (name: string, value: number | null): 'good' | 'needs-improvement' | 'poor' => {
  if (value === null) return 'good';
  
  const thresholds: Record<string, { good: number; poor: number }> = {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 },
    inp: { good: 200, poor: 500 },
  };

  const threshold = thresholds[name];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor') => {
  switch (rating) {
    case 'good': return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'needs-improvement': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'poor': return 'bg-red-500/20 text-red-400 border-red-500/50';
  }
};

export const AdminPerformancePanel: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  
  const { data: vitalsData, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['web-vitals', timeRange],
    queryFn: async () => {
      const hoursMap = { '24h': 24, '7d': 24 * 7, '30d': 24 * 30 };
      const startDate = new Date();
      startDate.setHours(startDate.getHours() - hoursMap[timeRange]);

      const { data, error } = await supabase
        .from('edge_function_metrics')
        .select('*')
        .eq('function_name', 'web-vitals')
        .gte('request_timestamp', startDate.toISOString())
        .order('request_timestamp', { ascending: false })
        .limit(1000);

      if (error) throw error;
      return (data || []) as WebVitalsData[];
    },
    refetchInterval: 60000,
  });

  // Calculate averages
  const calculateAverages = (data: WebVitalsData[]) => {
    if (!data?.length) return null;

    const validData = data.filter(d => d.metadata?.type === 'web-vitals');
    if (!validData.length) return null;

    const sum = validData.reduce(
      (acc, d) => ({
        lcp: acc.lcp + (d.metadata.lcp || 0),
        fid: acc.fid + (d.metadata.fid || 0),
        cls: acc.cls + (d.metadata.cls || 0),
        fcp: acc.fcp + (d.metadata.fcp || 0),
        ttfb: acc.ttfb + (d.metadata.ttfb || 0),
        inp: acc.inp + (d.metadata.inp || 0),
        count: acc.count + 1,
      }),
      { lcp: 0, fid: 0, cls: 0, fcp: 0, ttfb: 0, inp: 0, count: 0 }
    );

    return {
      lcp: Math.round(sum.lcp / sum.count),
      fid: Math.round(sum.fid / sum.count),
      cls: Number((sum.cls / sum.count).toFixed(3)),
      fcp: Math.round(sum.fcp / sum.count),
      ttfb: Math.round(sum.ttfb / sum.count),
      inp: Math.round(sum.inp / sum.count),
      totalSamples: sum.count,
    };
  };

  const averages = calculateAverages(vitalsData || []);

  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (!vitalsData?.length) return [];

    const grouped = vitalsData.reduce((acc, item) => {
      const date = new Date(item.request_timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, lcp: [], fcp: [], ttfb: [], cls: [] };
      }
      if (item.metadata.lcp) acc[date].lcp.push(item.metadata.lcp);
      if (item.metadata.fcp) acc[date].fcp.push(item.metadata.fcp);
      if (item.metadata.ttfb) acc[date].ttfb.push(item.metadata.ttfb);
      if (item.metadata.cls) acc[date].cls.push(item.metadata.cls);
      return acc;
    }, {} as Record<string, { date: string; lcp: number[]; fcp: number[]; ttfb: number[]; cls: number[] }>);

    return Object.values(grouped)
      .map(g => ({
        date: g.date,
        LCP: g.lcp.length ? Math.round(g.lcp.reduce((a, b) => a + b, 0) / g.lcp.length) : 0,
        FCP: g.fcp.length ? Math.round(g.fcp.reduce((a, b) => a + b, 0) / g.fcp.length) : 0,
        TTFB: g.ttfb.length ? Math.round(g.ttfb.reduce((a, b) => a + b, 0) / g.ttfb.length) : 0,
      }))
      .reverse()
      .slice(-14);
  }, [vitalsData]);

  // Page distribution data
  const pageDistribution = React.useMemo(() => {
    if (!vitalsData?.length) return [];

    const pages = vitalsData.reduce((acc, item) => {
      const url = item.metadata.url || 'Unknown';
      if (!acc[url]) acc[url] = 0;
      acc[url]++;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(pages)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [vitalsData]);

  const vitalStats: VitalStats[] = [
    {
      name: 'lcp',
      label: 'LCP',
      value: averages?.lcp ?? null,
      unit: 'ms',
      rating: getVitalRating('lcp', averages?.lcp ?? null),
      icon: <Eye className="h-4 w-4" />,
      description: 'Largest Contentful Paint - Loading performance',
      goodThreshold: 2500,
      poorThreshold: 4000,
    },
    {
      name: 'fid',
      label: 'FID',
      value: averages?.fid ?? null,
      unit: 'ms',
      rating: getVitalRating('fid', averages?.fid ?? null),
      icon: <MousePointer className="h-4 w-4" />,
      description: 'First Input Delay - Interactivity',
      goodThreshold: 100,
      poorThreshold: 300,
    },
    {
      name: 'cls',
      label: 'CLS',
      value: averages?.cls ?? null,
      unit: '',
      rating: getVitalRating('cls', averages?.cls ?? null),
      icon: <LayoutGrid className="h-4 w-4" />,
      description: 'Cumulative Layout Shift - Visual stability',
      goodThreshold: 0.1,
      poorThreshold: 0.25,
    },
    {
      name: 'fcp',
      label: 'FCP',
      value: averages?.fcp ?? null,
      unit: 'ms',
      rating: getVitalRating('fcp', averages?.fcp ?? null),
      icon: <Zap className="h-4 w-4" />,
      description: 'First Contentful Paint - First visual',
      goodThreshold: 1800,
      poorThreshold: 3000,
    },
    {
      name: 'ttfb',
      label: 'TTFB',
      value: averages?.ttfb ?? null,
      unit: 'ms',
      rating: getVitalRating('ttfb', averages?.ttfb ?? null),
      icon: <Clock className="h-4 w-4" />,
      description: 'Time to First Byte - Server response',
      goodThreshold: 800,
      poorThreshold: 1800,
    },
    {
      name: 'inp',
      label: 'INP',
      value: averages?.inp ?? null,
      unit: 'ms',
      rating: getVitalRating('inp', averages?.inp ?? null),
      icon: <Activity className="h-4 w-4" />,
      description: 'Interaction to Next Paint - Responsiveness',
      goodThreshold: 200,
      poorThreshold: 500,
    },
  ];

  // Calculate overall score (0-100)
  const overallScore = React.useMemo(() => {
    if (!averages) return null;

    const scores = vitalStats.map(v => {
      if (v.rating === 'good') return 100;
      if (v.rating === 'needs-improvement') return 50;
      return 0;
    });

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [averages, vitalStats]);

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-400';
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="24h" className="text-white">Last 24h</SelectItem>
              <SelectItem value="7d" className="text-white">Last 7 days</SelectItem>
              <SelectItem value="30d" className="text-white">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {averages?.totalSamples || 0} samples collected
          </span>
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-gray-400" />
            <span className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore ?? '--'}
            </span>
            <span className="text-sm text-gray-400">/100</span>
          </div>
        </div>
      </div>

      {/* Core Web Vitals Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {vitalStats.map((vital) => (
          <Card key={vital.name} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-gray-400">
                  {vital.icon}
                  <span className="font-medium">{vital.label}</span>
                </div>
                <Badge className={getRatingColor(vital.rating)}>
                  {vital.rating === 'good' ? 'Good' : vital.rating === 'needs-improvement' ? 'Needs Work' : 'Poor'}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white">
                {vital.value !== null ? `${vital.value}${vital.unit}` : '--'}
              </div>
              <p className="text-xs text-gray-500 mt-1">{vital.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="bg-gray-800/50 border border-gray-700">
          <TabsTrigger value="trends" className="data-[state=active]:bg-gray-700">
            Trends
          </TabsTrigger>
          <TabsTrigger value="pages" className="data-[state=active]:bg-gray-700">
            By Page
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-gray-700">
            Recent Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Trends</CardTitle>
              <CardDescription className="text-gray-400">
                Core Web Vitals over time (in milliseconds)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="LCP" stroke="#EF4444" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="FCP" stroke="#F59E0B" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="TTFB" stroke="#10B981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  {isLoading ? 'Loading...' : 'No performance data collected yet'}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance by Page</CardTitle>
              <CardDescription className="text-gray-400">
                Number of page views tracked
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pageDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={pageDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                    <YAxis dataKey="page" type="category" stroke="#9CA3AF" fontSize={12} width={150} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Bar dataKey="count" fill="#6366F1" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  {isLoading ? 'Loading...' : 'No page data collected yet'}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Measurements</CardTitle>
              <CardDescription className="text-gray-400">
                Latest performance samples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Page</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">LCP</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">FCP</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">CLS</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">TTFB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vitalsData?.slice(0, 15).map((item) => (
                      <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(item.request_timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-gray-300 max-w-[200px] truncate">
                          {item.metadata.url || '--'}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-300">
                          {item.metadata.lcp ? `${Math.round(item.metadata.lcp)}ms` : '--'}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-300">
                          {item.metadata.fcp ? `${Math.round(item.metadata.fcp)}ms` : '--'}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-300">
                          {item.metadata.cls?.toFixed(3) || '--'}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-300">
                          {item.metadata.ttfb ? `${Math.round(item.metadata.ttfb)}ms` : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!vitalsData?.length && (
                  <div className="text-center py-8 text-gray-400">
                    {isLoading ? 'Loading...' : 'No data collected yet'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPerformancePanel;
