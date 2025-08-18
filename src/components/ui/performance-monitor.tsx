import React from 'react';
import { Monitor, Zap, Activity, TrendingUp, Users, Globe, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EnhancedCard, StatCard } from './enhanced-card';
import { Progress } from './progress';
import { Badge } from './badge';
import { usePerformanceMonitoring } from '@/hooks/use-performance-monitoring';

interface PerformanceMonitorProps {
  className?: string;
  autoStart?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  className,
  autoStart = true
}) => {
  const { metrics, errors, isMonitoring, refreshMetrics } = usePerformanceMonitoring({
    enableAutoReporting: autoStart,
    sampleRate: 1.0
  });

  const getPerformanceGrade = (metric: number, thresholds: number[]) => {
    if (metric <= thresholds[0]) return { grade: 'A', color: 'text-success' };
    if (metric <= thresholds[1]) return { grade: 'B', color: 'text-warning' };
    if (metric <= thresholds[2]) return { grade: 'C', color: 'text-warning' };
    return { grade: 'F', color: 'text-destructive' };
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Monitor className="h-6 w-6 text-accent" />
            Performance Monitor
          </h2>
          <p className="text-muted-foreground">
            Real-time application performance metrics and insights
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {isMonitoring && (
            <Badge variant="success" className="gap-1">
              <Activity className="h-3 w-3" />
              Live
            </Badge>
          )}
          <button
            onClick={refreshMetrics}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Refresh metrics"
          >
            <Zap className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Core Web Vitals */}
      {metrics && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="First Contentful Paint"
              value={formatDuration(metrics.fcp)}
              subtitle={
                <div className="flex items-center gap-1">
                  <span className={getPerformanceGrade(metrics.fcp, [1800, 3000, 4500]).color}>
                    {getPerformanceGrade(metrics.fcp, [1800, 3000, 4500]).grade}
                  </span>
                </div>
              }
              icon={<TrendingUp className="h-4 w-4" />}
            />

            <StatCard
              title="Largest Contentful Paint"
              value={formatDuration(metrics.lcp)}
              subtitle={
                <div className="flex items-center gap-1">
                  <span className={getPerformanceGrade(metrics.lcp, [2500, 4000, 6000]).color}>
                    {getPerformanceGrade(metrics.lcp, [2500, 4000, 6000]).grade}
                  </span>
                </div>
              }
              icon={<Globe className="h-4 w-4" />}
            />

            <StatCard
              title="First Input Delay"
              value={formatDuration(metrics.fid)}
              subtitle={
                <div className="flex items-center gap-1">
                  <span className={getPerformanceGrade(metrics.fid, [100, 300, 500]).color}>
                    {getPerformanceGrade(metrics.fid, [100, 300, 500]).grade}
                  </span>
                </div>
              }
              icon={<Clock className="h-4 w-4" />}
            />

            <StatCard
              title="Cumulative Layout Shift"
              value={metrics.cls.toFixed(3)}
              subtitle={
                <div className="flex items-center gap-1">
                  <span className={getPerformanceGrade(metrics.cls, [0.1, 0.25, 0.4]).color}>
                    {getPerformanceGrade(metrics.cls, [0.1, 0.25, 0.4]).grade}
                  </span>
                </div>
              }
              icon={<Activity className="h-4 w-4" />}
            />
          </div>

          {/* Additional Metrics */}
          <div className="grid gap-6 md:grid-cols-2">
            <EnhancedCard variant="elevated">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Performance Details
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time to First Byte</span>
                    <span className="font-medium">{formatDuration(metrics.ttfb)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">DOM Content Loaded</span>
                    <span className="font-medium">{formatDuration(metrics.domContentLoaded)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Window Load</span>
                    <span className="font-medium">{formatDuration(metrics.windowLoad)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resource Count</span>
                    <span className="font-medium">{metrics.resourceCount}</span>
                  </div>
                  
                  {metrics.memoryUsage && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Usage</span>
                      <span className="font-medium">{formatBytes(metrics.memoryUsage)}</span>
                    </div>
                  )}
                  
                  {metrics.connectionType && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Connection</span>
                      <Badge variant="secondary" size="sm">{metrics.connectionType}</Badge>
                    </div>
                  )}
                </div>
              </div>
            </EnhancedCard>

            {/* Performance Score */}
            <EnhancedCard variant="elevated">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Score
                </h3>
                
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-accent">
                    {Math.round(
                      (100 - (metrics.fcp / 50) - (metrics.lcp / 100) - (metrics.fid / 10) - (metrics.cls * 100)) 
                      * 0.8
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Performance</p>
                  
                  <Progress 
                    value={Math.round(
                      (100 - (metrics.fcp / 50) - (metrics.lcp / 100) - (metrics.fid / 10) - (metrics.cls * 100)) 
                      * 0.8
                    )} 
                    className="mt-4"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Load Performance</span>
                    <span className={getPerformanceGrade(metrics.lcp, [2500, 4000, 6000]).color}>
                      {getPerformanceGrade(metrics.lcp, [2500, 4000, 6000]).grade}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interactivity</span>
                    <span className={getPerformanceGrade(metrics.fid, [100, 300, 500]).color}>
                      {getPerformanceGrade(metrics.fid, [100, 300, 500]).grade}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visual Stability</span>
                    <span className={getPerformanceGrade(metrics.cls, [0.1, 0.25, 0.4]).color}>
                      {getPerformanceGrade(metrics.cls, [0.1, 0.25, 0.4]).grade}
                    </span>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </div>
        </>
      )}

      {/* Error Log */}
      {errors.length > 0 && (
        <EnhancedCard variant="elevated">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Recent Errors ({errors.length})
            </h3>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {errors.slice(-10).reverse().map((error) => (
                <div key={error.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        error.severity === 'critical' ? 'destructive' :
                        error.severity === 'high' ? 'warning' :
                        'secondary'
                      }
                      size="sm"
                    >
                      {error.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(error.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{error.message}</p>
                  <p className="text-xs text-muted-foreground">{error.url}</p>
                </div>
              ))}
            </div>
          </div>
        </EnhancedCard>
      )}

      {/* No Data State */}
      {!metrics && (
        <EnhancedCard variant="elevated" className="text-center py-12">
          <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Performance Monitoring</h3>
          <p className="text-muted-foreground mb-4">
            Performance metrics will appear here once monitoring begins
          </p>
          <button
            onClick={refreshMetrics}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Zap className="h-4 w-4" />
            Start Monitoring
          </button>
        </EnhancedCard>
      )}
    </div>
  );
};