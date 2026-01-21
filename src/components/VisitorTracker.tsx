import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor, trackPageTime } from '@/utils/visitorTracking';
import { FEATURES, devLog } from '@/config/environment';

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Skip tracking if analytics is disabled
    if (!FEATURES.enableAnalytics) {
      devLog('VisitorTracker: Analytics disabled, skipping tracking');
      return;
    }
    
    // Track visitor when component mounts or route changes
    devLog('VisitorTracker: Route changed to', location.pathname);
    
    // Add a small delay to ensure the page is fully loaded
    const timeoutId = setTimeout(() => {
      devLog('VisitorTracker: Initializing visitor tracking for', location.pathname);
      trackVisitor();
    }, 500);
    
    // Setup page time tracking
    const cleanup = trackPageTime();
    
    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        devLog('VisitorTracker: Page hidden, tracking time');
        cleanup();
      }
    };
    
    // Handle page unload
    const handleBeforeUnload = () => {
      devLog('VisitorTracker: Page unloading, tracking time');
      cleanup();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cleanup();
    };
  }, [location.pathname]); // Re-run when route changes

  return null; // This component doesn't render anything
};

export default VisitorTracker;
