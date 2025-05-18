import { supabase } from "@/integrations/supabase/client";
import { TablesInsert } from "@/integrations/supabase/types";

interface VisitorMetadata extends Omit<TablesInsert<'visitor_metadata'>, 'id' | 'visit_timestamp'> {
  // All fields are optional as we might not be able to collect all data
}

export async function trackVisitor(): Promise<void> {
  try {
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

    try {
      // Send data to our Edge Function to get IP and geolocation
      const response = await fetch('/functions/v1/visitor-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });
      
      if (!response.ok) {
        // If edge function fails, fall back to direct database insert without IP/geo data
        const { error } = await supabase.from('visitor_metadata').insert(metadata);
        if (error) {
          console.error('Error tracking visitor metadata (fallback):', error);
        }
      }
    } catch (fetchError) {
      // Handle network errors by falling back to direct database insert
      console.error('Failed to reach visitor-metadata edge function:', fetchError);
      const { error } = await supabase.from('visitor_metadata').insert(metadata);
      if (error) {
        console.error('Error tracking visitor metadata (fallback):', error);
      }
    }
  } catch (err) {
    console.error('Failed to track visitor metadata:', err);
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
    
    const timeOnPage = Math.floor((Date.now() - pageLoadTime) / 1000); // Time in seconds
    isTracked = true;
    
    try {
      const { error } = await supabase.from('visitor_metadata').insert({
        time_on_page: timeOnPage,
        page_url: window.location.href
      });
      
      if (error) {
        console.error('Error tracking page time:', error);
      }
    } catch (err) {
      console.error('Failed to track page time:', err);
    }
  };
}
