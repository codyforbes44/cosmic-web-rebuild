
import { supabase } from "@/integrations/supabase/client";
import { getCurrentISOInAppTimezone } from "../timezone";
import { VisitorMetadata } from './types';
import { detectDeviceType, detectOS } from './deviceDetection';
import { extractURLParameters } from './urlTracking';
import { debugLog } from './debugLogger';

const EDGE_FUNCTION_URL = '/functions/v1/visitor-metadata';

export async function trackVisitor(): Promise<void> {
  try {
    debugLog('Starting visitor tracking...');
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      debugLog('Not in browser environment, skipping tracking');
      return;
    }

    // Extract URL parameters
    const urlData = extractURLParameters();

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
      
      // Mark visitor as tracked without showing notification
      const isFirstVisit = !localStorage.getItem('hasVisited');
      if (isFirstVisit) {
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
