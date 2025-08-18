import { useEffect, useState, useCallback } from 'react';

// Performance monitoring metrics
export interface PerformanceMetrics {
  // Core Web Vitals
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  
  // Custom metrics
  domContentLoaded: number;
  windowLoad: number;
  resourceCount: number;
  memoryUsage?: number;
  connectionType?: string;
}

export interface ErrorLog {
  id: string;
  timestamp: Date;
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  userAgent: string;
  userId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

export interface PerformanceConfig {
  enableAutoReporting: boolean;
  reportingInterval: number; // milliseconds
  enableErrorTracking: boolean;
  enableResourceTiming: boolean;
  enableUserTiming: boolean;
  sampleRate: number; // 0-1, percentage of sessions to monitor
}

const DEFAULT_CONFIG: PerformanceConfig = {
  enableAutoReporting: true,
  reportingInterval: 30000, // 30 seconds
  enableErrorTracking: true,
  enableResourceTiming: true,
  enableUserTiming: true,
  sampleRate: 1.0 // Monitor all sessions by default
};

// Performance monitoring hook
export function usePerformanceMonitoring(config: Partial<PerformanceConfig> = {}) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Check if this session should be monitored
  const shouldMonitor = useCallback(() => {
    return Math.random() < finalConfig.sampleRate;
  }, [finalConfig.sampleRate]);

  // Collect performance metrics
  const collectMetrics = useCallback(async (): Promise<PerformanceMetrics | null> => {
    if (!('performance' in window)) return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    if (!navigation) return null;

    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const lcp = await getLargestContentfulPaint();
    const fid = await getFirstInputDelay();
    const cls = await getCumulativeLayoutShift();

    return {
      fcp,
      lcp,
      fid,
      cls,
      ttfb: navigation.responseStart - navigation.requestStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      windowLoad: navigation.loadEventEnd - navigation.loadEventStart,
      resourceCount: performance.getEntriesByType('resource').length,
      memoryUsage: getMemoryUsage(),
      connectionType: getConnectionType()
    };
  }, []);

  // Get Largest Contentful Paint
  const getLargestContentfulPaint = useCallback((): Promise<number> => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry?.startTime || 0);
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Timeout after 10 seconds
        setTimeout(() => resolve(0), 10000);
      } else {
        resolve(0);
      }
    });
  }, []);

  // Get First Input Delay
  const getFirstInputDelay = useCallback((): Promise<number> => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const fid = entries[0] as any;
            resolve(fid.processingStart - fid.startTime);
          }
        });
        observer.observe({ type: 'first-input', buffered: true });
        
        // Timeout after 10 seconds
        setTimeout(() => resolve(0), 10000);
      } else {
        resolve(0);
      }
    });
  }, []);

  // Get Cumulative Layout Shift
  const getCumulativeLayoutShift = useCallback((): Promise<number> => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });
        
        // Calculate final CLS after 5 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 5000);
      } else {
        resolve(0);
      }
    });
  }, []);

  // Get memory usage
  const getMemoryUsage = useCallback((): number | undefined => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return memory.usedJSHeapSize;
    }
    return undefined;
  }, []);

  // Get connection type
  const getConnectionType = useCallback((): string | undefined => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType;
    }
    return undefined;
  }, []);

  // Log error
  const logError = useCallback((error: Error, errorInfo?: any) => {
    const errorLog: ErrorLog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      lineNumber: (error as any).lineno,
      columnNumber: (error as any).colno,
      userAgent: navigator.userAgent,
      severity: determineSeverity(error),
      metadata: errorInfo
    };

    setErrors(prev => [...prev.slice(-99), errorLog]); // Keep last 100 errors
    
    // Report to external service if configured
    reportError(errorLog);
  }, []);

  // Determine error severity
  const determineSeverity = (error: Error): ErrorLog['severity'] => {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch')) {
      return 'medium';
    }
    if (message.includes('script error') || message.includes('syntax')) {
      return 'high';
    }
    if (message.includes('out of memory') || message.includes('maximum call stack')) {
      return 'critical';
    }
    
    return 'low';
  };

  // Report error to external service
  const reportError = useCallback(async (error: ErrorLog) => {
    try {
      // This could be sent to your analytics service, Sentry, LogRocket, etc.
      console.error('Performance Monitor - Error logged:', error);
      
      // Example: Send to analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: error.message,
          fatal: error.severity === 'critical'
        });
      }
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }, []);

  // Report performance metrics
  const reportMetrics = useCallback(async (metrics: PerformanceMetrics) => {
    try {
      console.log('Performance Metrics:', metrics);
      
      // Example: Send to analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'timing_complete', {
          name: 'performance_metrics',
          value: Math.round(metrics.lcp)
        });
      }
      
      // Could also send to your backend analytics service
      // await fetch('/api/analytics/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metrics)
      // });
    } catch (reportingError) {
      console.error('Failed to report metrics:', reportingError);
    }
  }, []);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    if (!shouldMonitor() || isMonitoring) return;

    setIsMonitoring(true);

    // Set up error tracking
    if (finalConfig.enableErrorTracking) {
      window.addEventListener('error', (event) => {
        logError(new Error(event.message), {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        logError(new Error(event.reason), {
          type: 'unhandled_promise_rejection'
        });
      });
    }

    // Collect initial metrics when page is loaded
    if (document.readyState === 'complete') {
      setTimeout(async () => {
        const metrics = await collectMetrics();
        if (metrics) {
          setMetrics(metrics);
          reportMetrics(metrics);
        }
      }, 1000);
    } else {
      window.addEventListener('load', async () => {
        setTimeout(async () => {
          const metrics = await collectMetrics();
          if (metrics) {
            setMetrics(metrics);
            reportMetrics(metrics);
          }
        }, 1000);
      });
    }

    // Set up periodic reporting
    if (finalConfig.enableAutoReporting) {
      const interval = setInterval(async () => {
        const currentMetrics = await collectMetrics();
        if (currentMetrics) {
          setMetrics(currentMetrics);
          reportMetrics(currentMetrics);
        }
      }, finalConfig.reportingInterval);

      return () => clearInterval(interval);
    }
  }, [isMonitoring, shouldMonitor, finalConfig, collectMetrics, logError, reportMetrics]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Manual metric collection
  const refreshMetrics = useCallback(async () => {
    const newMetrics = await collectMetrics();
    if (newMetrics) {
      setMetrics(newMetrics);
      reportMetrics(newMetrics);
    }
  }, [collectMetrics, reportMetrics]);

  // Initialize monitoring
  useEffect(() => {
    const cleanup = startMonitoring();
    return cleanup;
  }, [startMonitoring]);

  return {
    metrics,
    errors,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    refreshMetrics,
    logError
  };
}