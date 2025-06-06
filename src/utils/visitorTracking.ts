import { supabase } from "@/integrations/supabase/client";
import { TablesInsert } from "@/integrations/supabase/types";
import { toast } from "@/hooks/use-toast";
import { getCurrentISOInAppTimezone, formatDateTimeDisplay } from "./timezone";

interface VisitorMetadata extends Omit<TablesInsert<'visitor_metadata'>, 'id' | 'visit_timestamp'> {
  // All fields are optional as we might not be able to collect all data
}

const EDGE_FUNCTION_URL = '/functions/v1/visitor-metadata';
const DEBUG_MODE = true; // Enable debug logs for better tracking

// Helper to log messages only in debug mode
function debugLog(...args: any[]): void {
  if (DEBUG_MODE) {
    console.log('[Visitor Tracking]', ...args);
  }
}

export async function trackVisitor(): Promise<void> {
  try {
    debugLog('Starting visitor tracking...');
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      debugLog('Not in browser environment, skipping tracking');
      return;
    }

    // Extract URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlData = {
      utm_source: urlParams.get('utm_source') || null,
      utm_medium: urlParams.get('utm_medium') || null,
      utm_campaign: urlParams.get('utm_campaign') || null,
      utm_term: urlParams.get('utm_term') || null,
      utm_content: urlParams.get('utm_content') || null,
    };

    // Get browser and system information
    const userAgent = navigator.userAgent;
    const browserLanguage = navigator.language;

    // Create metadata object with UTC-6 timestamp
    const metadata: VisitorMetadata = {
      user_agent: userAgent,
      browser_language: browserLanguage,
      page_url: window.location.href,
      referrer: document.referrer || null,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      ...urlData,
      // Device detection
      device_type: detectDeviceType(userAgent),
      operating_system: detectOS(userAgent),
    };

    debugLog('Visitor metadata to be stored:', metadata);
    
    // Try direct database insert first for simplicity
    try {
      debugLog('Attempting direct database insert...');
      const { data, error } = await supabase
        .from('visitor_metadata')
        .insert({
          ...metadata,
          visit_timestamp: getCurrentISOInAppTimezone()
        })
        .select('*')
        .single();
      
      if (error) {
        debugLog('Direct database insert error:', error);
        throw error;
      }
      
      debugLog('Direct database insert successful:', data);
      
      // Show welcome toast for new visitors occasionally
      const isFirstVisit = !localStorage.getItem('hasVisited');
      if (isFirstVisit && Math.random() > 0.7) { // 30% chance to show welcome
        setTimeout(() => {
          toast({
            title: "Welcome!",
            description: `Thanks for visiting ƷBI! Your visit has been recorded for analytics. Time: ${formatDateTimeDisplay(new Date())}`,
            duration: 3000,
          });
        }, 1000);
        localStorage.setItem('hasVisited', 'true');
      }
      
    } catch (dbError) {
      debugLog('Database insert failed, trying edge function fallback:', dbError);
      
      // Fallback to edge function
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        
        const response = await fetch(EDGE_FUNCTION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...metadata,
            visit_timestamp: getCurrentISOInAppTimezone()
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          debugLog('Edge function error:', response.status, errorData);
          throw new Error(`Edge function returned ${response.status}`);
        }
        
        const data = await response.json();
        debugLog('Edge function success:', data);
        
      } catch (fetchError) {
        debugLog('Both database and edge function failed:', fetchError);
        // Continue silently - don't interrupt user experience
      }
    }
    
  } catch (err) {
    debugLog('Overall tracking failed:', err);
    // Silently fail - we don't want to interrupt the user experience
  }
}

// Helper function to detect device type
function detectDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /mobile|iphone|ipod|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(
      ua
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
}

// Helper function to detect operating system
function detectOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  
  if (ua.indexOf('windows') !== -1) return 'Windows';
  if (ua.indexOf('mac') !== -1) return 'MacOS';
  if (ua.indexOf('linux') !== -1) return 'Linux';
  if (ua.indexOf('android') !== -1) return 'Android';
  if (ua.indexOf('ios') !== -1 || ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1) return 'iOS';
  
  return 'Unknown';
}

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
