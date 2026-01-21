import { IS_PROD, FEATURES } from '@/config/environment';

// Only enable debug logs in non-production or when debug mode is explicitly enabled
const DEBUG_MODE = !IS_PROD || FEATURES.enableDebugMode;

// Helper to log messages only in debug mode
export function debugLog(...args: any[]): void {
  if (DEBUG_MODE) {
    console.log('[Visitor Tracking]', ...args);
  }
}
