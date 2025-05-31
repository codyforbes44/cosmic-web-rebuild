
import { useEffect } from 'react';
import { trackVisitor, trackPageTime } from '@/utils/visitorTracking';

const VisitorTracker = () => {
  useEffect(() => {
    // Track visitor immediately when component mounts
    console.log('VisitorTracker: Initializing visitor tracking');
    trackVisitor();
    
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
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cleanup();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default VisitorTracker;
