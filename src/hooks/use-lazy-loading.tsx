import React, { Suspense, lazy, ComponentType } from 'react';
import { SectionLoading } from '@/components/ui/UnifiedLoading';
import { useAccessibility } from '@/hooks/use-accessibility';

interface LazyComponentOptions {
  fallback?: React.ComponentType;
  delay?: number;
  retryCount?: number;
  preload?: boolean;
}

// Type for lazy component with preload method
interface LazyComponentWithPreload extends React.FC<object> {
  preload: () => Promise<void>;
}

// Type for module import
type ModuleImport = () => Promise<{ default: ComponentType<object> }>;

// Enhanced lazy loading with retry mechanism and performance optimizations
export function createLazyComponent(
  importFn: ModuleImport,
  options: LazyComponentOptions = {}
): LazyComponentWithPreload {
  const {
    fallback: CustomFallback,
    delay = 0,
    retryCount = 3,
    preload = false
  } = options;

  // Add artificial delay for slower networks (optional)
  const importWithDelay = (): Promise<{ default: ComponentType<object> }> =>
    delay > 0
      ? new Promise<{ default: ComponentType<object> }>((resolve) =>
          setTimeout(() => importFn().then(resolve), delay)
        )
      : importFn();

  // Retry mechanism for failed imports
  const importWithRetry = async (attempt = 1): Promise<{ default: ComponentType<object> }> => {
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

  const LazyWrapper: React.FC<object> = (props) => {
    useAccessibility(); // Keep hook for consistency
    
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
  const preloadFn = async (): Promise<void> => {
    await importWithRetry().catch(console.error);
  };

  return Object.assign(LazyWrapper, { preload: preloadFn });
}

// Lazy loading hook for components
export function useLazyPreload() {
  const preloadComponent = React.useCallback((
    importFn: ModuleImport,
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

// Network connection type for performance detection
interface NetworkInformation {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

// Performance-aware lazy loading
export function usePerformanceLazyLoad() {
  const [networkSpeed, setNetworkSpeed] = React.useState<'slow' | 'fast'>('fast');
  
  React.useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as unknown as { connection: NetworkInformation }).connection;
      const speed = connection.effectiveType;
      setNetworkSpeed(['slow-2g', '2g', '3g'].includes(speed) ? 'slow' : 'fast');
    }
  }, []);

  const createOptimizedLazy = React.useCallback((
    importFn: ModuleImport,
    options?: LazyComponentOptions
  ): LazyComponentWithPreload => {
    return createLazyComponent(importFn, {
      delay: networkSpeed === 'slow' ? 100 : 0,
      retryCount: networkSpeed === 'slow' ? 5 : 3,
      ...options
    });
  }, [networkSpeed]);

  return { createOptimizedLazy, networkSpeed };
}
