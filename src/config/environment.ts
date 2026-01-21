/**
 * Environment Configuration
 * Centralized environment detection and feature flags
 */

// ============= Environment Detection =============
export type Environment = 'development' | 'staging' | 'production';

/**
 * Detects the current environment based on URL and build mode
 */
export const getEnvironment = (): Environment => {
  // Check Vite build mode first
  if (import.meta.env.DEV) {
    return 'development';
  }

  // Check URL for environment detection
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  
  // Explicit production domain check
  if (hostname === '3bi.io' || hostname === 'www.3bi.io') {
    return 'production';
  }
  
  // Localhost is development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  }
  
  // Lovable preview URLs are staging
  if (hostname.includes('lovable.app') && hostname.includes('preview')) {
    return 'staging';
  }
  
  // Lovable project URLs (published or not) are staging
  if (hostname.includes('lovableproject.com') || hostname.includes('lovable.app')) {
    return 'staging';
  }

  // Everything else defaults to production
  return 'production';
};

export const ENV = getEnvironment();
export const IS_DEV = ENV === 'development';
export const IS_STAGING = ENV === 'staging';
export const IS_PROD = ENV === 'production';

// ============= Feature Flags =============
export interface FeatureFlags {
  // Developer tools
  showComponentCatalog: boolean;
  showDevTools: boolean;
  enableDebugMode: boolean;
  
  // Analytics & Monitoring
  enableAnalytics: boolean;
  enableErrorReporting: boolean;
  enablePerformanceMonitoring: boolean;
  
  // Features
  enablePWAInstallPrompt: boolean;
  enableLiveChat: boolean;
  enableFloatingButtons: boolean;
  
  // Security
  showDetailedErrors: boolean;
  enableRateLimitBypass: boolean;
  enableGeoBlocking: boolean;
}

/**
 * Feature flags configuration by environment
 */
const featureFlagsByEnv: Record<Environment, FeatureFlags> = {
  development: {
    // Developer tools - all enabled in dev
    showComponentCatalog: true,
    showDevTools: true,
    enableDebugMode: true,
    
    // Analytics - disabled in dev to reduce noise
    enableAnalytics: false,
    enableErrorReporting: false,
    enablePerformanceMonitoring: false,
    
    // Features - all enabled
    enablePWAInstallPrompt: true,
    enableLiveChat: true,
    enableFloatingButtons: true,
    
    // Security - show details in dev
    showDetailedErrors: true,
    enableRateLimitBypass: true,
    enableGeoBlocking: false, // Disabled in dev for testing
  },
  
  staging: {
    // Developer tools - enabled for testing
    showComponentCatalog: true,
    showDevTools: true,
    enableDebugMode: true,
    
    // Analytics - enabled for testing
    enableAnalytics: true,
    enableErrorReporting: true,
    enablePerformanceMonitoring: true,
    
    // Features - all enabled
    enablePWAInstallPrompt: true,
    enableLiveChat: true,
    enableFloatingButtons: true,
    
    // Security - show some details for debugging
    showDetailedErrors: true,
    enableRateLimitBypass: false,
    enableGeoBlocking: true, // Enabled in staging
  },
  
  production: {
    // Developer tools - all disabled
    showComponentCatalog: false,
    showDevTools: false,
    enableDebugMode: false,
    
    // Analytics - all enabled
    enableAnalytics: true,
    enableErrorReporting: true,
    enablePerformanceMonitoring: true,
    
    // Features - all enabled
    enablePWAInstallPrompt: true,
    enableLiveChat: true,
    enableFloatingButtons: true,
    
    // Security - hide details
    showDetailedErrors: false,
    enableRateLimitBypass: false,
    enableGeoBlocking: true, // Enabled in production
  },
};

export const FEATURES = featureFlagsByEnv[ENV];

// ============= Runtime Feature Flag Override =============
/**
 * Check if a feature is enabled, with optional runtime override
 * Override via URL param: ?feature_[name]=true/false
 */
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  // Check URL override first (only in non-production)
  if (!IS_PROD && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const override = params.get(`feature_${feature}`);
    if (override !== null) {
      return override === 'true';
    }
  }
  
  return FEATURES[feature];
};

// ============= Logging Utilities =============
/**
 * Development-only console log
 */
export const devLog = (...args: unknown[]): void => {
  if (IS_DEV || FEATURES.enableDebugMode) {
    console.log('[DEV]', ...args);
  }
};

/**
 * Development-only console warn
 */
export const devWarn = (...args: unknown[]): void => {
  if (IS_DEV || FEATURES.enableDebugMode) {
    console.warn('[DEV]', ...args);
  }
};

/**
 * Development-only console error (always logs in staging too)
 */
export const devError = (...args: unknown[]): void => {
  if (!IS_PROD || FEATURES.enableDebugMode) {
    console.error('[DEV]', ...args);
  }
};

// ============= Environment Info Component Helper =============
export const getEnvBadgeInfo = (): { label: string; color: string } | null => {
  if (IS_PROD) return null;
  
  if (IS_DEV) {
    return { label: 'DEV', color: 'bg-green-500' };
  }
  
  if (IS_STAGING) {
    return { label: 'STAGING', color: 'bg-amber-500' };
  }
  
  return null;
};
