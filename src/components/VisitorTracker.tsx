
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor, trackPageTime } from '@/utils/visitorTracking';

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track visitor when component mounts or route changes
    console.log('VisitorTracker: Route changed to', location.pathname);
    
    // Add a small delay to ensure the page is fully loaded
    const timeoutId = setTimeout(() => {
      console.log('VisitorTracker: Initializing visitor tracking for', location.pathname);
      trackVisitor();
    }, 500);
    
    // Setup page time tracking
    const cleanup = trackPageTime();
    
    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log('VisitorTracker: Page hidden, tracking time');
        cleanup();
      }
    };
    
    // Handle page unload
    const handleBeforeUnload = () => {
      console.log('VisitorTracker: Page unloading, tracking time');
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
