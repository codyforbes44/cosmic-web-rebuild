
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

// Track visitor data
export const trackVisit = async (path: string): Promise<void> => {
  try {
    const userAgentInfo = parseUserAgent(navigator.userAgent);
    
    // Gather visitor information
    const visitorData: VisitorData = {
      sessionId: getSessionId(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'direct',
      path: path,
      browser: userAgentInfo.browser,
      os: userAgentInfo.os,
      deviceType: userAgentInfo.deviceType,
      createdAt: new Date().toISOString(),
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
      sessionId: getSessionId(),
      formName,
      formData,
      path,
      createdAt: new Date().toISOString()
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
