import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SystemMetric {
  name: string;
  value: number | string | boolean;
  status: 'active' | 'warning' | 'error' | 'offline';
  lastUpdated: Date;
}

export const useZephelMetrics = () => {
  const [metrics, setMetrics] = useState<Record<string, SystemMetric>>({
    'Sovereign.Logic': {
      name: 'Sovereign.Logic',
      value: 'ACTIVE',
      status: 'active',
      lastUpdated: new Date()
    },
    'QuantaZest.Design': {
      name: 'QuantaZest.Design',
      value: 'ACTIVE',
      status: 'active',
      lastUpdated: new Date()
    },
    'Mentor.Akadelight': {
      name: 'Mentor.Akadelight',
      value: 'ACTIVE',
      status: 'active',
      lastUpdated: new Date()
    },
    'Omniview.Futurecast': {
      name: 'Omniview.Futurecast',
      value: 'ACTIVE',
      status: 'active',
      lastUpdated: new Date()
    },
    'ZEPHEL.NEURONET': {
      name: 'ZEPHEL.NEURONET',
      value: 'ACTIVE',
      status: 'active',
      lastUpdated: new Date()
    }
  });

  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkLatency, setNetworkLatency] = useState(0);
  const [responseTime, setResponseTime] = useState(0);

  // Simulate system metrics
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate CPU usage
      setCpuUsage(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(100, prev + change));
      });

      // Simulate memory usage
      setMemoryUsage(prev => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(0, Math.min(100, prev + change));
      });

      // Simulate network latency
      setNetworkLatency(Math.random() * 50 + 10);

      // Simulate response time
      setResponseTime(Math.random() * 500 + 100);

      // Update system status based on performance
      setMetrics(prev => {
        const updated = { ...prev };
        
        Object.keys(updated).forEach(key => {
          const random = Math.random();
          if (random > 0.95) {
            updated[key] = {
              ...updated[key],
              status: 'warning',
              value: 'DEGRADED',
              lastUpdated: new Date()
            };
          } else if (random > 0.98) {
            updated[key] = {
              ...updated[key],
              status: 'error',
              value: 'ERROR',
              lastUpdated: new Date()
            };
          } else {
            updated[key] = {
              ...updated[key],
              status: 'active',
              value: 'ACTIVE',
              lastUpdated: new Date()
            };
          }
        });
        
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const recordMetric = useCallback(async (metricName: string, value: any) => {
    try {
      await supabase
        .from('zephel_metrics')
        .insert([{
          metric_name: metricName,
          metric_value: { value, timestamp: new Date().toISOString() }
        }]);
    } catch (error) {
      console.error('Error recording metric:', error);
    }
  }, []);

  const getMetricHistory = useCallback(async (metricName: string, hours: number = 24) => {
    try {
      const { data, error } = await supabase
        .from('zephel_metrics')
        .select('*')
        .eq('metric_name', metricName)
        .gte('recorded_at', new Date(Date.now() - hours * 60 * 60 * 1000).toISOString())
        .order('recorded_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching metric history:', error);
      return [];
    }
  }, []);

  const getSystemHealth = useCallback(() => {
    const activeCount = Object.values(metrics).filter(m => m.status === 'active').length;
    const totalCount = Object.values(metrics).length;
    const healthPercentage = (activeCount / totalCount) * 100;
    
    if (healthPercentage >= 90) return 'optimal';
    if (healthPercentage >= 70) return 'degraded';
    if (healthPercentage >= 50) return 'critical';
    return 'offline';
  }, [metrics]);

  return {
    metrics,
    cpuUsage,
    memoryUsage,
    networkLatency,
    responseTime,
    systemHealth: getSystemHealth(),
    recordMetric,
    getMetricHistory
  };
};