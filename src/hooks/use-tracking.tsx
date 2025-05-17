
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit, trackFormSubmission } from '@/lib/tracking';

export const useTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track the page view whenever the location changes
    trackVisit(location.pathname);
  }, [location.pathname]);
  
  return {
    trackFormSubmission: (formName: string, formData: Record<string, any>) => 
      trackFormSubmission(formName, formData, location.pathname)
  };
};
