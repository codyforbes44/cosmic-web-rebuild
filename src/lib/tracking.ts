
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// Interface for visitor data
export interface VisitorData {
  id?: string;
  sessionId: string;
  userAgent: string;
  language: string;
  screenWidth: number;
  screenHeight: number;
  timezone: string;
  referrer: string;
  path: string;
  ipAddress?: string;
  countryCode?: string;
  city?: string;
  createdAt: string;
}

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

// Track visitor data
export const trackVisit = async (path: string): Promise<void> => {
  try {
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
      createdAt: new Date().toISOString(),
    };
    
    // Log visitor data to console for debugging
    console.log('Tracking visitor data:', visitorData);
    
    // Send data to Supabase
    const { error } = await supabase.from('visitor_tracking').insert([visitorData]);
    
    if (error) {
      console.error('Error storing visitor data:', error);
    }
  } catch (err) {
    console.error('Error in tracking visitor:', err);
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
