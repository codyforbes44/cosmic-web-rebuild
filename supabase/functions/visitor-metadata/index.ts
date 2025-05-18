
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

// Rate limiting cache
const ipRequestCount: Record<string, { count: number, timestamp: number }> = {};

// Check if IP is rate limited
const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 20; // Max 20 requests per minute per IP
  
  // Clean up old entries
  Object.keys(ipRequestCount).forEach(key => {
    if (now - ipRequestCount[key].timestamp > windowMs) {
      delete ipRequestCount[key];
    }
  });
  
  // Check if IP exists in cache
  if (!ipRequestCount[ip]) {
    ipRequestCount[ip] = { count: 0, timestamp: now };
  }
  
  // Check if within window
  if (now - ipRequestCount[ip].timestamp > windowMs) {
    ipRequestCount[ip] = { count: 1, timestamp: now };
    return false;
  }
  
  // Increment count
  ipRequestCount[ip].count++;
  
  // Check if over limit
  return ipRequestCount[ip].count > maxRequests;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get IP from request headers (Supabase Edge Functions provide this)
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    // Check rate limiting
    if (isRateLimited(clientIp)) {
      return createResponse({ 
        success: false, 
        error: 'Rate limit exceeded. Try again later.' 
      }, 429);
    }

    // Get request body
    let visitorData;
    try {
      visitorData = await req.json();
    } catch (e) {
      return createResponse({ 
        success: false, 
        error: 'Invalid request body' 
      }, 400);
    }

    // Check for required fields
    if (!visitorData || typeof visitorData !== 'object') {
      return createResponse({ 
        success: false, 
        error: 'Missing visitor data' 
      }, 400);
    }

    // Try to get geolocation data using an external service
    let geoData = { country: null, region: null, city: null };
    try {
      console.log(`Fetching geolocation data for IP: ${clientIp}`);
      const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
      
      if (geoResponse.ok) {
        const geoInfo = await geoResponse.json();
        
        // Check if the API returned an error
        if (geoInfo.error) {
          console.warn(`Geolocation API error: ${geoInfo.reason}`);
        } else {
          geoData = {
            country: geoInfo.country_name || null,
            region: geoInfo.region || null,
            city: geoInfo.city || null,
          };
          console.log(`Located IP ${clientIp} to ${geoInfo.city}, ${geoInfo.country_name}`);
        }
      } else {
        console.warn(`Geolocation API responded with status: ${geoResponse.status}`);
      }
    } catch (geoError) {
      console.error('Error fetching geolocation data:', geoError);
    }

    // Combine IP and geo data with the visitor data sent from client
    const completeVisitorData = {
      ...visitorData,
      ip_address: clientIp,
      ...geoData,
      visit_timestamp: new Date().toISOString(), // Ensure timestamp is always set
    };

    console.log('Storing visitor metadata:', JSON.stringify(completeVisitorData));

    // Insert the data into Supabase
    const { error } = await supabase
      .from('visitor_metadata')
      .insert(completeVisitorData);

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    // Return success response
    return createResponse({ 
      success: true, 
      message: 'Visitor metadata recorded',
      location: geoData 
    }, 200);
    
  } catch (error) {
    console.error('Error processing visitor metadata:', error);
    
    // Return error response
    return createResponse({ 
      success: false, 
      error: error.message || 'Failed to process visitor metadata' 
    }, 500);
  }
});
