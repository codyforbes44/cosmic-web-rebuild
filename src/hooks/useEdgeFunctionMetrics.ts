import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface EdgeFunctionMetric {
  id: string;
  function_name: string;
  execution_time_ms: number;
  status_code: number;
  error_message: string | null;
  request_timestamp: string;
  user_id: string | null;
  metadata: Record<string, unknown>;
}

export interface FunctionStats {
  functionName: string;
  totalRequests: number;
  successCount: number;
  errorCount: number;
  avgExecutionTime: number;
  p95ExecutionTime: number;
  errorRate: number;
  lastRequest: string;
}

export interface PerformanceOverview {
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  errorCount: number;
  functionStats: FunctionStats[];
  recentErrors: EdgeFunctionMetric[];
  hourlyStats: { hour: string; requests: number; errors: number }[];
}

/**
 * Hook to fetch edge function performance metrics for the admin dashboard
 */
export function useEdgeFunctionMetrics(timeRange: '1h' | '24h' | '7d' | '30d' = '24h') {
  return useQuery({
    queryKey: ['edge-function-metrics', timeRange],
    queryFn: async (): Promise<PerformanceOverview> => {
      const timeRangeMap = {
        '1h': 1,
        '24h': 24,
        '7d': 24 * 7,
        '30d': 24 * 30,
      };
      
      const hoursAgo = timeRangeMap[timeRange];
      const startDate = new Date();
      startDate.setHours(startDate.getHours() - hoursAgo);

      // Fetch metrics from database
      const { data: metrics, error } = await supabase
        .from('edge_function_metrics')
        .select('*')
        .gte('request_timestamp', startDate.toISOString())
        .order('request_timestamp', { ascending: false })
        .limit(5000);

      if (error) {
        console.error('Error fetching edge function metrics:', error);
        throw error;
      }

      const typedMetrics = (metrics || []) as EdgeFunctionMetric[];

      // Calculate function-level stats
      const functionGroups = typedMetrics.reduce((acc, metric) => {
        if (!acc[metric.function_name]) {
          acc[metric.function_name] = [];
        }
        acc[metric.function_name].push(metric);
        return acc;
      }, {} as Record<string, EdgeFunctionMetric[]>);

      const functionStats: FunctionStats[] = Object.entries(functionGroups).map(
        ([functionName, fnMetrics]) => {
          const successCount = fnMetrics.filter((m) => m.status_code >= 200 && m.status_code < 400).length;
          const errorCount = fnMetrics.filter((m) => m.status_code >= 400).length;
          const executionTimes = fnMetrics.map((m) => m.execution_time_ms).sort((a, b) => a - b);
          const p95Index = Math.floor(executionTimes.length * 0.95);

          return {
            functionName,
            totalRequests: fnMetrics.length,
            successCount,
            errorCount,
            avgExecutionTime: Math.round(
              fnMetrics.reduce((sum, m) => sum + m.execution_time_ms, 0) / fnMetrics.length
            ),
            p95ExecutionTime: executionTimes[p95Index] || 0,
            errorRate: fnMetrics.length > 0 ? (errorCount / fnMetrics.length) * 100 : 0,
            lastRequest: fnMetrics[0]?.request_timestamp || '',
          };
        }
      );

      // Calculate hourly stats for chart
      const hourlyGroups = typedMetrics.reduce((acc, metric) => {
        const hour = new Date(metric.request_timestamp).toISOString().slice(0, 13) + ':00';
        if (!acc[hour]) {
          acc[hour] = { requests: 0, errors: 0 };
        }
        acc[hour].requests++;
        if (metric.status_code >= 400) {
          acc[hour].errors++;
        }
        return acc;
      }, {} as Record<string, { requests: number; errors: number }>);

      const hourlyStats = Object.entries(hourlyGroups)
        .map(([hour, stats]) => ({ hour, ...stats }))
        .sort((a, b) => a.hour.localeCompare(b.hour))
        .slice(-24);

      // Get recent errors
      const recentErrors = typedMetrics
        .filter((m) => m.status_code >= 400)
        .slice(0, 10);

      const totalRequests = typedMetrics.length;
      const successfulRequests = typedMetrics.filter(
        (m) => m.status_code >= 200 && m.status_code < 400
      ).length;

      return {
        totalRequests,
        successRate: totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 100,
        avgResponseTime: totalRequests > 0
          ? Math.round(typedMetrics.reduce((sum, m) => sum + m.execution_time_ms, 0) / totalRequests)
          : 0,
        errorCount: typedMetrics.filter((m) => m.status_code >= 400).length,
        functionStats: functionStats.sort((a, b) => b.totalRequests - a.totalRequests),
        recentErrors,
        hourlyStats,
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

/**
 * Utility to log metrics from edge functions
 * Call this at the end of each edge function
 */
export async function logEdgeFunctionMetric(
  functionName: string,
  executionTimeMs: number,
  statusCode: number,
  errorMessage?: string,
  userId?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const { error } = await supabase.from('edge_function_metrics').insert({
      function_name: functionName,
      execution_time_ms: executionTimeMs,
      status_code: statusCode,
      error_message: errorMessage || null,
      user_id: userId || null,
      metadata: metadata || {},
    });

    if (error) {
      console.error('Failed to log edge function metric:', error);
    }
  } catch (e) {
    console.error('Error logging edge function metric:', e);
  }
}
