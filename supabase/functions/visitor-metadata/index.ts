
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
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get IP from request headers (Supabase Edge Functions provide this)
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    // Get request body
    const visitorData = await req.json();

    // Try to get geolocation data using an external service
    let geoData = { country: null, region: null, city: null };
    try {
      const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
      if (geoResponse.ok) {
        const geoInfo = await geoResponse.json();
        geoData = {
          country: geoInfo.country_name || null,
          region: geoInfo.region || null,
          city: geoInfo.city || null,
        };
      }
    } catch (geoError) {
      console.error('Error fetching geolocation data:', geoError);
    }

    // Combine IP and geo data with the visitor data sent from client
    const completeVisitorData = {
      ...visitorData,
      ip_address: clientIp,
      ...geoData,
    };

    // Insert the data into Supabase
    const { error } = await supabase
      .from('visitor_metadata')
      .insert(completeVisitorData);

    if (error) {
      throw error;
    }

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: 'Visitor metadata recorded' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error processing visitor metadata:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to process visitor metadata' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
