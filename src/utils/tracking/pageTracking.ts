
import { supabase } from "@/integrations/supabase/client";
import { getCurrentISOInAppTimezone } from "../timezone";
import { debugLog } from './debugLogger';

// Function to record time spent on a page with UTC-6 timestamps
let pageLoadTime = Date.now();
let isTracked = false;

export function trackPageTime(): () => void {
  pageLoadTime = Date.now();
  isTracked = false;
  debugLog('Started tracking page time');
  
  // Return a cleanup function to track time when leaving the page
  return async () => {
    if (isTracked) return;
    
    const timeOnPage = Math.floor((Date.now() - pageLoadTime) / 1000); // Time in seconds
    isTracked = true;
    
    // Only track if the user spent at least 5 seconds on the page
    // to avoid recording bounces or accidental clicks
    if (timeOnPage < 5) {
      debugLog('Time on page too short, not tracking', timeOnPage);
      return;
    }
    
    // And cap at 30 minutes to avoid skewing data when user leaves tab open
    const cappedTime = Math.min(timeOnPage, 30 * 60);
    
    debugLog('Tracking time on page:', cappedTime, 'seconds');
    
    try {
      const { error } = await supabase.from('visitor_metadata').insert({
        time_on_page: cappedTime,
        page_url: window.location.href,
        visit_timestamp: getCurrentISOInAppTimezone()
      });
      
      if (error) {
        debugLog('Error tracking page time:', error);
      } else {
        debugLog('Successfully tracked page time');
      }
    } catch (err) {
      debugLog('Failed to track page time:', err);
    }
  };
}
