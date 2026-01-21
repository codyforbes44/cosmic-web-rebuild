import { useWebVitals } from '@/hooks/useWebVitals';

/**
 * Invisible component that monitors and reports Web Vitals
 * Add this to App.tsx to enable performance monitoring
 */
export function WebVitalsMonitor() {
  useWebVitals();
  return null;
}
