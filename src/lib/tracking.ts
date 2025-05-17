
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { VisitorData, FormSubmissionData } from '@/types/tracking';

// Check if this is a new session or returning visitor
const getSessionId = (): string => {
  // Try to get existing session ID from localStorage
  let sessionId = localStorage.getItem('visitor_session_id');
  
  // If no session exists, create a new one and store it
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('visitor_session_id', sessionId);
  }
  
  return sessionId;
};

// Extract browser, OS and device type from user agent
const parseUserAgent = (userAgent: string): { browser: string; os: string; deviceType: string } => {
  let browser = 'Unknown';
  let os = 'Unknown';
  let deviceType = 'Desktop';
  
  // Simple browser detection
  if (userAgent.includes('Firefox/')) browser = 'Firefox';
  else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) browser = 'Chrome';
  else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) browser = 'Safari';
  else if (userAgent.includes('Edg/')) browser = 'Edge';
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) browser = 'Internet Explorer';
  else if (userAgent.includes('Opera/') || userAgent.includes('OPR/')) browser = 'Opera';
  
  // Simple OS detection
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac OS X')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
  
  // Simple device type detection
  if (userAgent.includes('Mobile')) deviceType = 'Mobile';
  else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) deviceType = 'Tablet';
  
  return { browser, os, deviceType };
};

// Get visitor IP address
const getIpAddress = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      throw new Error(`Failed to fetch IP: ${response.status}`);
    }
    const data = await response.json();
    return data.ip;
  } catch (err) {
    console.error('Error getting IP address:', err);
    return null;
  }
};

// Get location data from IP address
const getLocationData = async (ipAddress: string | null): Promise<{ country_code?: string; city?: string; state?: string }> => {
  if (!ipAddress) return {};
  
  try {
    // Changed to use a more reliable IP geolocation service
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the API returned an error
    if (data.error) {
      console.error('Error in IP geolocation:', data.reason);
      return {};
    }
    
    return {
      country_code: data.country_code,
      city: data.city,
      state: data.region
    };
  } catch (err) {
    console.error('Error getting location data:', err);
    return {};
  }
};

// Track visitor data
export const trackVisit = async (path: string): Promise<void> => {
  try {
    const userAgentInfo = parseUserAgent(navigator.userAgent);
    
    // Get visitor IP address
    const ipAddress = await getIpAddress();
    
    // Get location data from IP - with better error handling
    let locationData = {};
    try {
      locationData = await getLocationData(ipAddress);
    } catch (locErr) {
      console.error('Error getting location data:', locErr);
      // Continue with empty location data
    }
    
    // Gather visitor information
    const visitorData: VisitorData = {
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      language: navigator.language,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'direct',
      path: path,
      browser: userAgentInfo.browser,
      os: userAgentInfo.os,
      device_type: userAgentInfo.deviceType,
      ip_address: ipAddress,
      ...locationData,
      created_at: new Date().toISOString(),
    };
    
    // Log visitor data to console for debugging
    console.log('Tracking visitor data:', visitorData);
    
    // Send data to Supabase using cast to any to bypass TypeScript checks
    const { error } = await supabase.from('visitor_tracking' as any).insert([visitorData]);
    
    if (error) {
      console.error('Error storing visitor data:', error);
    }
  } catch (err) {
    console.error('Error in tracking visitor:', err);
  }
};

// Track form submissions
export const trackFormSubmission = async (formName: string, formData: Record<string, any>, path: string): Promise<void> => {
  try {
    // Prepare submission data
    const submissionData: FormSubmissionData = {
      session_id: getSessionId(),
      form_name: formName,
      form_data: formData, // Using any type to match Json from Supabase
      path,
      created_at: new Date().toISOString()
    };
    
    console.log('Tracking form submission:', submissionData);
    
    // Send to Supabase using cast to any to bypass TypeScript checks
    const { error } = await supabase.from('form_submissions' as any).insert([submissionData]);
    
    if (error) {
      console.error('Error storing form submission data:', error);
    }
  } catch (err) {
    console.error('Error in tracking form submission:', err);
  }
};

// Track page views when route changes
export const initializeTracking = (): void => {
  // Track initial visit
  trackVisit(window.location.pathname);
  
  // Listen for route changes if using client-side routing
  window.addEventListener('popstate', () => {
    trackVisit(window.location.pathname);
  });
};
