import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FEATURES, devLog } from '@/config/environment';

export interface WebVitalsMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  inp: number | null; // Interaction to Next Paint
}

interface VitalsEntry {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Hook to measure and report Core Web Vitals
 * Reports to Supabase edge_function_metrics when enabled
 */
export function useWebVitals() {
  const metricsRef = useRef<WebVitalsMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    inp: null,
  });
  const hasReportedRef = useRef(false);

  const reportToSupabase = useCallback(async (vitals: WebVitalsMetrics) => {
    if (!FEATURES.enablePerformanceMonitoring || hasReportedRef.current) return;
    
    // Only report once per session
    hasReportedRef.current = true;

    try {
      const { error } = await supabase.from('edge_function_metrics').insert({
        function_name: 'web-vitals',
        execution_time_ms: Math.round(vitals.lcp || 0),
        status_code: 200,
        error_message: null,
        user_id: null,
        metadata: {
          type: 'web-vitals',
          lcp: vitals.lcp,
          fid: vitals.fid,
          cls: vitals.cls,
          fcp: vitals.fcp,
          ttfb: vitals.ttfb,
          inp: vitals.inp,
          url: window.location.pathname,
          userAgent: navigator.userAgent,
          connectionType: (navigator as any).connection?.effectiveType,
          deviceMemory: (navigator as any).deviceMemory,
        },
      });

      if (error) {
        devLog('Failed to report web vitals:', error);
      } else {
        devLog('Web Vitals reported:', vitals);
      }
    } catch (e) {
      devLog('Error reporting web vitals:', e);
    }
  }, []);

  const getRating = useCallback((name: string, value: number): VitalsEntry['rating'] => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 },
    };

    const threshold = thresholds[name];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }, []);

  useEffect(() => {
    if (!FEATURES.enablePerformanceMonitoring) return;
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const observers: PerformanceObserver[] = [];

    // Collect metrics and report after page is fully loaded
    const collectAndReport = () => {
      setTimeout(() => {
        reportToSupabase(metricsRef.current);
      }, 5000); // Wait 5 seconds after load to collect all metrics
    };

    // LCP Observer
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          metricsRef.current.lcp = lastEntry.startTime;
          devLog('LCP:', lastEntry.startTime, getRating('LCP', lastEntry.startTime));
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);
    } catch (e) {
      devLog('LCP observer not supported');
    }

    // FID Observer
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const firstEntry = entries[0] as any;
          const fid = firstEntry.processingStart - firstEntry.startTime;
          metricsRef.current.fid = fid;
          devLog('FID:', fid, getRating('FID', fid));
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      observers.push(fidObserver);
    } catch (e) {
      devLog('FID observer not supported');
    }

    // CLS Observer
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as any;
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value;
            metricsRef.current.cls = clsValue;
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObserver);
    } catch (e) {
      devLog('CLS observer not supported');
    }

    // FCP from Paint Timing
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metricsRef.current.fcp = entry.startTime;
            devLog('FCP:', entry.startTime, getRating('FCP', entry.startTime));
          }
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });
      observers.push(paintObserver);
    } catch (e) {
      devLog('Paint observer not supported');
    }

    // TTFB from Navigation Timing
    try {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry) {
        metricsRef.current.ttfb = navEntry.responseStart - navEntry.requestStart;
        devLog('TTFB:', metricsRef.current.ttfb, getRating('TTFB', metricsRef.current.ttfb));
      }
    } catch (e) {
      devLog('Navigation timing not supported');
    }

    // INP Observer (Interaction to Next Paint)
    try {
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const eventEntry = entry as any;
          const inp = eventEntry.duration;
          if (!metricsRef.current.inp || inp > metricsRef.current.inp) {
            metricsRef.current.inp = inp;
          }
        }
      });
      inpObserver.observe({ type: 'event', buffered: true });
      observers.push(inpObserver);
    } catch (e) {
      devLog('INP observer not supported');
    }

    // Report after page load
    if (document.readyState === 'complete') {
      collectAndReport();
    } else {
      window.addEventListener('load', collectAndReport, { once: true });
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [reportToSupabase, getRating]);

  return metricsRef.current;
}
