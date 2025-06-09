
const DEBUG_MODE = true; // Enable debug logs for better tracking

// Helper to log messages only in debug mode
export function debugLog(...args: any[]): void {
  if (DEBUG_MODE) {
    console.log('[Visitor Tracking]', ...args);
  }
}
