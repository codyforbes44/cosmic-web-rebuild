
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

import { isRateLimited } from './rateLimiter.ts';
import { validateAndSanitizeInput } from './validator.ts';
import { getGeoData } from './geolocation.ts';
import { createResponse, extractClientIp } from './utils.ts';

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
    const clientIp = extractClientIp(req);
    
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

    // Get geolocation data
    const geoData = await getGeoData(clientIp);

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
