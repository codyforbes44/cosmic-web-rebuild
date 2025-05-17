
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit } from '@/lib/tracking';

export const useTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track the page view whenever the location changes
    trackVisit(location.pathname);
  }, [location.pathname]);
};
