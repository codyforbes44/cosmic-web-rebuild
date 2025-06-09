
import { supabase } from "@/integrations/supabase/client";
import { getCurrentISOInAppTimezone } from "../timezone";
import { debugLog } from './debugLogger';

// Export a function to track specific events with UTC-6 timestamps
export function trackEvent(eventName: string, eventProperties?: Record<string, any>): void {
  debugLog('Tracking event:', eventName, eventProperties);
  
  try {
    supabase.from('visitor_metadata').insert({
      page_url: window.location.href,
      // Note: the visitor_metadata table doesn't have event_name/event_properties columns
      // This would need additional columns or a separate events table
      user_agent: `Event: ${eventName}`,
      referrer: eventProperties ? JSON.stringify(eventProperties) : null,
      visit_timestamp: getCurrentISOInAppTimezone()
    }).then(({ error }) => {
      if (error) {
        debugLog('Error tracking event:', error);
      } else {
        debugLog('Successfully tracked event:', eventName);
      }
    });
  } catch (err) {
    debugLog('Failed to track event:', err);
  }
}
