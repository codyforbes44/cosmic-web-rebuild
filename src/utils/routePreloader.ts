import type { ComponentType } from 'react';

/**
 * Route preloading utility for improved navigation performance
 * Preloads lazy-loaded route components on hover/focus for instant transitions
 */

type LazyImport = () => Promise<{ default: ComponentType<Record<string, unknown>> }>;

// Map of route paths to their lazy import functions
const routeImports: Record<string, LazyImport> = {
  '/services': () => import('@/pages/Services'),
  '/about': () => import('@/pages/About'),
  '/contact': () => import('@/pages/Contact'),
  '/get-quote': () => import('@/pages/GetQuote'),
  '/faq': () => import('@/pages/FAQ'),
  '/features': () => import('@/pages/Features'),
  '/portfolio': () => import('@/pages/Portfolio'),
  '/gallery': () => import('@/pages/Gallery'),
  '/news': () => import('@/pages/News'),
  '/weather': () => import('@/pages/Weather'),
  '/calculator': () => import('@/pages/ScientificCalculator'),
  '/openai': () => import('@/pages/OpenAI'),
  '/multi-ai': () => import('@/pages/MultiAI'),
  '/chatbot-products': () => import('@/pages/ChatbotProducts'),
};

// Track which routes have been preloaded
const preloadedRoutes = new Set<string>();

/**
 * Preload a specific route's component
 */
export const preloadRoute = (path: string): void => {
  // Normalize path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Skip if already preloaded
  if (preloadedRoutes.has(normalizedPath)) return;
  
  const importFn = routeImports[normalizedPath];
  if (importFn) {
    importFn()
      .then(() => {
        preloadedRoutes.add(normalizedPath);
      })
      .catch((error) => {
        console.warn(`Failed to preload route ${normalizedPath}:`, error);
      });
  }
};

/**
 * Preload multiple routes at once
 */
export const preloadRoutes = (paths: string[]): void => {
  paths.forEach(preloadRoute);
};

/**
 * Preload critical routes after initial page load
 * Call this in App.tsx or a top-level component
 */
export const preloadCriticalRoutes = (): void => {
  // Wait for idle time before preloading
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      preloadRoutes(['/services', '/about', '/contact', '/get-quote']);
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      preloadRoutes(['/services', '/about', '/contact', '/get-quote']);
    }, 2000);
  }
};

/**
 * Create a preload handler for link hover events
 */
export const createPreloadHandler = (path: string) => ({
  onMouseEnter: () => preloadRoute(path),
  onFocus: () => preloadRoute(path),
});

/**
 * Check if a route has been preloaded
 */
export const isRoutePreloaded = (path: string): boolean => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return preloadedRoutes.has(normalizedPath);
};
