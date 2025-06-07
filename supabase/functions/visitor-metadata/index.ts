
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

// Initialize Supabase client
const supabaseUrl = 'https://strixttogzthapdhuczm.supabase.co';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Helper to create standardized response
const createResponse = (body: unknown, status: number) => {
  return new Response(
    JSON.stringify(body),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status 
    }
  );
};

// Enhanced rate limiting with memory cleanup
const ipRequestCount: Record<string, { count: number, timestamp: number, blocked?: number }> = {};

// Clean up old entries periodically
const cleanupOldEntries = () => {
  const now = Date.now();
  const cleanupThreshold = 24 * 60 * 60 * 1000; // 24 hours
  
  Object.keys(ipRequestCount).forEach(key => {
    if (now - ipRequestCount[key].timestamp > cleanupThreshold) {
      delete ipRequestCount[key];
    }
  });
};

// Enhanced rate limiting function
const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 15; // Reduced from 20 to 15 requests per minute
  const blockDuration = 15 * 60 * 1000; // 15 minute block for violations
  
  // Clean up old entries
  cleanupOldEntries();
  
  // Check if IP is currently blocked
  if (ipRequestCount[ip]?.blocked && now < ipRequestCount[ip].blocked!) {
    return true;
  }
  
  // Initialize or reset if outside window
  if (!ipRequestCount[ip] || now - ipRequestCount[ip].timestamp > windowMs) {
    ipRequestCount[ip] = { count: 1, timestamp: now };
    return false;
  }
  
  // Increment count
  ipRequestCount[ip].count++;
  
  // Check if over limit
  if (ipRequestCount[ip].count > maxRequests) {
    // Block the IP for the block duration
    ipRequestCount[ip].blocked = now + blockDuration;
    return true;
  }
  
  return false;
};

// Input validation and sanitization
const validateAndSanitizeInput = (data: any): { isValid: boolean; sanitized?: any; errors?: string[] } => {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    errors.push('Invalid data format');
    return { isValid: false, errors };
  }
  
  const sanitized: any = {};
  
  // Validate and sanitize each field
  const stringFields = [
    'page_url', 'referrer', 'user_agent', 'browser_language', 
    'operating_system', 'device_type', 'screen_resolution',
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'
  ];
  
  stringFields.forEach(field => {
    if (data[field] !== undefined) {
      if (typeof data[field] === 'string') {
        // Sanitize and limit length
        let value = data[field].trim().slice(0, 500);
        // Remove potentially dangerous patterns
        value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        value = value.replace(/javascript:/gi, '');
        value = value.replace(/on\w+\s*=/gi, '');
        sanitized[field] = value;
      } else {
        errors.push(`${field} must be a string`);
      }
    }
  });
  
  // Validate numeric fields
  if (data.time_on_page !== undefined) {
    const timeOnPage = parseInt(data.time_on_page);
    if (isNaN(timeOnPage) || timeOnPage < 0 || timeOnPage > 86400000) { // Max 24 hours
      errors.push('Invalid time_on_page value');
    } else {
      sanitized.time_on_page = timeOnPage;
    }
  }
  
  // Validate URL fields more strictly
  if (sanitized.page_url) {
    try {
      const url = new URL(sanitized.page_url);
      if (!['http:', 'https:'].includes(url.protocol)) {
        errors.push('Invalid page_url protocol');
      }
    } catch {
      errors.push('Invalid page_url format');
    }
  }
  
  if (sanitized.referrer && sanitized.referrer !== '') {
    try {
      const url = new URL(sanitized.referrer);
      if (!['http:', 'https:'].includes(url.protocol)) {
        errors.push('Invalid referrer protocol');
      }
    } catch {
      errors.push('Invalid referrer format');
    }
  }
  
  return {
    isValid: errors.length === 0,
    sanitized: errors.length === 0 ? sanitized : undefined,
    errors: errors.length > 0 ? errors : undefined
  };
};

serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
      return createResponse({ 
        success: false, 
        error: 'Method not allowed' 
      }, 405);
    }
    
    // Get IP from request headers with fallback
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIP = req.headers.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0]?.trim() || realIP || 'unknown';
    
    // Enhanced rate limiting
    if (isRateLimited(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return createResponse({ 
        success: false, 
        error: 'Rate limit exceeded. Please try again later.' 
      }, 429);
    }

    // Get and validate request body
    let visitorData;
    try {
      const text = await req.text();
      if (!text.trim()) {
        return createResponse({ 
          success: false, 
          error: 'Empty request body' 
        }, 400);
      }
      visitorData = JSON.parse(text);
    } catch (e) {
      console.error('Invalid JSON in request body:', e);
      return createResponse({ 
        success: false, 
        error: 'Invalid JSON format' 
      }, 400);
    }

    // Validate and sanitize input
    const validation = validateAndSanitizeInput(visitorData);
    if (!validation.isValid) {
      console.warn('Input validation failed:', validation.errors);
      return createResponse({ 
        success: false, 
        error: 'Invalid input data',
        details: validation.errors 
      }, 400);
    }

    // Enhanced geolocation with error handling
    let geoData = { country: null, region: null, city: null };
    
    // Skip geolocation for localhost/private IPs
    if (clientIp !== 'unknown' && !clientIp.match(/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.|::1|localhost)/)) {
      try {
        console.log(`Fetching geolocation data for IP: ${clientIp}`);
        
        // Use a more reliable geolocation service with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'VisitorTracker/1.0'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (geoResponse.ok) {
          const geoInfo = await geoResponse.json();
          
          if (geoInfo.error) {
            console.warn(`Geolocation API error: ${geoInfo.reason}`);
          } else {
            geoData = {
              country: geoInfo.country_name?.slice(0, 100) || null,
              region: geoInfo.region?.slice(0, 100) || null,
              city: geoInfo.city?.slice(0, 100) || null,
            };
            console.log(`Located IP ${clientIp} to ${geoInfo.city}, ${geoInfo.country_name}`);
          }
        } else {
          console.warn(`Geolocation API responded with status: ${geoResponse.status}`);
        }
      } catch (geoError) {
        if (geoError.name === 'AbortError') {
          console.warn('Geolocation request timed out');
        } else {
          console.error('Error fetching geolocation data:', geoError);
        }
      }
    }

    // Combine sanitized data with IP and geo information
    const completeVisitorData = {
      ...validation.sanitized,
      ip_address: clientIp.slice(0, 45), // Limit IP length
      ...geoData,
      visit_timestamp: new Date().toISOString(),
    };

    console.log('Storing visitor metadata for IP:', clientIp);

    // Insert data with enhanced error handling
    const { error } = await supabase
      .from('visitor_metadata')
      .insert(completeVisitorData);

    if (error) {
      console.error('Supabase insert error:', error);
      
      // Handle specific error types
      if (error.message.includes('violates row-level security')) {
        return createResponse({ 
          success: false, 
          error: 'Permission denied' 
        }, 403);
      }
      
      if (error.message.includes('rate limit')) {
        return createResponse({ 
          success: false, 
          error: 'Database rate limit exceeded' 
        }, 429);
      }
      
      throw error;
    }

    // Return success response
    return createResponse({ 
      success: true, 
      message: 'Visitor metadata recorded successfully',
      location: geoData.country ? geoData : null
    }, 200);
    
  } catch (error) {
    console.error('Error processing visitor metadata:', error);
    
    // Return generic error response to avoid information leakage
    return createResponse({ 
      success: false, 
      error: 'Internal server error' 
    }, 500);
  }
});
