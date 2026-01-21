import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isIpRateLimited, extractClientIp, rateLimitResponse } from "../_shared/rateLimiter.ts";

const openWeatherMapApiKey = Deno.env.get('OPENWEATHERMAP_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Metric logging helper
async function logMetric(
  functionName: string,
  executionTimeMs: number,
  statusCode: number,
  errorMessage?: string
) {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    await supabase.from('edge_function_metrics').insert({
      function_name: functionName,
      execution_time_ms: executionTimeMs,
      status_code: statusCode,
      error_message: errorMessage || null,
    });
  } catch (e) {
    console.error('Failed to log metric:', e);
  }
}

serve(async (req) => {
  const startTime = Date.now();
  const functionName = 'weather-proxy';

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIp = extractClientIp(req);
  if (isIpRateLimited(clientIp, { maxRequests: 30, windowMs: 60 * 1000 })) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    await logMetric(functionName, Date.now() - startTime, 429, 'Rate limit exceeded');
    return rateLimitResponse(corsHeaders);
  }

  try {
    const { location, units = 'imperial', endpoint = 'weather' } = await req.json();

    if (!location) {
      await logMetric(functionName, Date.now() - startTime, 400, 'Location is required');
      return new Response(JSON.stringify({ error: 'Location is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!openWeatherMapApiKey) {
      console.error('OPENWEATHERMAP_API_KEY not configured');
      await logMetric(functionName, Date.now() - startTime, 500, 'API key not configured');
      return new Response(JSON.stringify({ error: 'Weather service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate endpoint to prevent API abuse
    const allowedEndpoints = ['weather', 'forecast', 'air_pollution'];
    if (!allowedEndpoints.includes(endpoint)) {
      await logMetric(functionName, Date.now() - startTime, 400, 'Invalid endpoint');
      return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Fetching ${endpoint} for location: ${location}, units: ${units}`);

    const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${encodeURIComponent(location)}&units=${units}&appid=${openWeatherMapApiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('OpenWeatherMap API error:', response.status, data);
      await logMetric(functionName, Date.now() - startTime, response.status, `OpenWeatherMap error: ${data.message || response.status}`);
      return new Response(JSON.stringify({ error: data.message || 'Weather API error' }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await logMetric(functionName, Date.now() - startTime, 200);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in weather-proxy function:', error);
    await logMetric(functionName, Date.now() - startTime, 500, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
