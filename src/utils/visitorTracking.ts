
import { supabase } from "@/integrations/supabase/client";
import { TablesInsert } from "@/integrations/supabase/types";
import { toast } from "@/hooks/use-toast";

interface VisitorMetadata extends Omit<TablesInsert<'visitor_metadata'>, 'id' | 'visit_timestamp'> {
  // All fields are optional as we might not be able to collect all data
}

const EDGE_FUNCTION_URL = '/functions/v1/visitor-metadata';
const DEBUG_MODE = false; // Set to true to enable debug logs

// Helper to log messages only in debug mode
function debugLog(...args: any[]): void {
  if (DEBUG_MODE) {
    console.log('[Visitor Tracking]', ...args);
  }
}

export async function trackVisitor(): Promise<void> {
  try {
    // Check if tracking is disabled by user preference
    if (localStorage.getItem('cookieConsent') === 'limited') {
      debugLog('Tracking limited by user consent');
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

    // Create metadata object
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

    debugLog('Collecting visitor metadata:', metadata);
    
    // Try the edge function first, with fallback to direct database insert
    try {
      debugLog('Sending data to edge function');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
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
      
      // If this is a returning visitor with location data, display welcome back toast
      const isReturningVisitor = localStorage.getItem('returningVisitor');
      if (isReturningVisitor && data.location && data.location.city) {
        setTimeout(() => {
          toast({
            title: "Welcome back!",
            description: `We see you're visiting us from ${data.location.city || data.location.region || data.location.country}.`,
            duration: 5000,
          });
        }, 2000);
      }
      
      // Mark as returning visitor for future visits
      localStorage.setItem('returningVisitor', 'true');
      
    } catch (fetchError) {
      // Handle network errors by falling back to direct database insert
      debugLog('Edge function failed, using fallback:', fetchError);
      
      const { error } = await supabase.from('visitor_metadata').insert(metadata);
      if (error) {
        debugLog('Fallback error:', error);
        throw error;
      }
      
      // Mark as returning visitor for future visits
      localStorage.setItem('returningVisitor', 'true');
    }
  } catch (err) {
    debugLog('Failed to track visitor metadata:', err);
    // Silently fail - we don't want to interrupt the user experience
    // But log the error for debugging purposes
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

// Function to record time spent on a page
let pageLoadTime = Date.now();
let isTracked = false;

export function trackPageTime(): () => void {
  pageLoadTime = Date.now();
  isTracked = false;
  
  // Return a cleanup function to track time when leaving the page
  return async () => {
    if (isTracked) return;
    
    // Check if tracking is disabled by user preference
    if (localStorage.getItem('cookieConsent') === 'limited') {
      debugLog('Time tracking limited by user consent');
      return;
    }
    
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
        page_url: window.location.href
      });
      
      if (error) {
        debugLog('Error tracking page time:', error);
      }
    } catch (err) {
      debugLog('Failed to track page time:', err);
    }
  };
}

// Export a function to track specific events
export function trackEvent(eventName: string, eventProperties?: Record<string, any>): void {
  // Check if tracking is disabled by user preference
  if (localStorage.getItem('cookieConsent') === 'limited') {
    debugLog('Event tracking limited by user consent');
    return;
  }
  
  debugLog('Tracking event:', eventName, eventProperties);
  
  try {
    supabase.from('visitor_metadata').insert({
      page_url: window.location.href,
      event_name: eventName,
      event_properties: eventProperties
    }).then(({ error }) => {
      if (error) {
        debugLog('Error tracking event:', error);
      }
    });
  } catch (err) {
    debugLog('Failed to track event:', err);
  }
}
