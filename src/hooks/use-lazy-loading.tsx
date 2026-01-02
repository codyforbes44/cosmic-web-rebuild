import React, { Suspense, lazy, ComponentType } from 'react';
import { SectionLoading } from '@/components/ui/UnifiedLoading';
import { useAccessibility } from '@/hooks/use-accessibility';

interface LazyComponentOptions {
  fallback?: React.ComponentType;
  delay?: number;
  retryCount?: number;
  preload?: boolean;
}

// Enhanced lazy loading with retry mechanism and performance optimizations
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyComponentOptions = {}
) {
  const {
    fallback: CustomFallback,
    delay = 0,
    retryCount = 3,
    preload = false
  } = options;

  // Add artificial delay for slower networks (optional)
  const importWithDelay = () =>
    delay > 0
      ? new Promise<{ default: T }>((resolve) =>
          setTimeout(() => importFn().then(resolve), delay)
        )
      : importFn();

  // Retry mechanism for failed imports
  const importWithRetry = async (attempt = 1): Promise<{ default: T }> => {
    try {
      return await importWithDelay();
    } catch (error) {
      if (attempt < retryCount) {
        console.warn(`Lazy load attempt ${attempt} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        return importWithRetry(attempt + 1);
      }
      throw error;
    }
  };

  const LazyComponent = lazy(importWithRetry);

  // Preload component for better UX
  if (preload) {
    importWithRetry().catch(console.error);
  }

  const LazyWrapper: React.FC<any> = (props) => {
    const { reducedMotion } = useAccessibility();
    
    const DefaultFallback = () => (
      <SectionLoading message="Loading..." />
    );

    return (
      <Suspense fallback={CustomFallback ? <CustomFallback /> : <DefaultFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  // Add preload method to wrapper
  (LazyWrapper as any).preload = () => importWithRetry().catch(console.error);

  return LazyWrapper;
}

// Lazy loading hook for components
export function useLazyPreload() {
  const preloadComponent = React.useCallback((
    importFn: () => Promise<any>,
    delay = 0
  ) => {
    if (delay > 0) {
      setTimeout(() => importFn().catch(console.error), delay);
    } else {
      importFn().catch(console.error);
    }
  }, []);

  return { preloadComponent };
}

// Intersection Observer for lazy loading on scroll
export function useLazyOnView(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const [ref, setRef] = React.useState<Element | null>(null);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!ref || hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, callback, hasLoaded, options]);

  return setRef;
}

// Performance-aware lazy loading
export function usePerformanceLazyLoad() {
  const [networkSpeed, setNetworkSpeed] = React.useState<'slow' | 'fast'>('fast');
  
  React.useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const speed = connection.effectiveType;
      setNetworkSpeed(['slow-2g', '2g', '3g'].includes(speed) ? 'slow' : 'fast');
    }
  }, []);

  const createOptimizedLazy = React.useCallback((
    importFn: () => Promise<{ default: ComponentType<any> }>,
    options?: LazyComponentOptions
  ) => {
    return createLazyComponent(importFn, {
      delay: networkSpeed === 'slow' ? 100 : 0,
      retryCount: networkSpeed === 'slow' ? 5 : 3,
      ...options
    });
  }, [networkSpeed]);

  return { createOptimizedLazy, networkSpeed };
}