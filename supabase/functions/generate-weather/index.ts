import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isIpRateLimited, extractClientIp, rateLimitResponse } from "../_shared/rateLimiter.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
  const functionName = 'generate-weather';

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIp = extractClientIp(req);
  if (isIpRateLimited(clientIp, { maxRequests: 15, windowMs: 60 * 1000 })) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    await logMetric(functionName, Date.now() - startTime, 429, 'Rate limit exceeded');
    return rateLimitResponse(corsHeaders);
  }

  try {
    const { units = 'imperial' } = await req.json();

    const prompt = `Generate realistic current weather data and 7-day forecast for a typical location. Return only valid JSON with this exact structure:
{
  "current": {
    "location": "City, State",
    "temperature": ${units === 'imperial' ? '75' : '24'},
    "condition": "Clear sky",
    "humidity": 45,
    "windSpeed": ${units === 'imperial' ? '8' : '13'},
    "timestamp": ${Date.now()},
    "feelsLike": ${units === 'imperial' ? '78' : '26'},
    "pressure": ${units === 'imperial' ? '30.12' : '1020'},
    "pressureTrend": "steady",
    "uvIndex": 5,
    "visibility": ${units === 'imperial' ? '10' : '16'},
    "dewPoint": ${units === 'imperial' ? '62' : '17'},
    "sunrise": "6:45 AM",
    "sunset": "7:20 PM"
  },
  "forecast": [
    {
      "date": "Today",
      "temp_max": ${units === 'imperial' ? '78' : '26'},
      "temp_min": ${units === 'imperial' ? '65' : '18'},
      "condition": "sunny",
      "humidity": 40
    },
    {
      "date": "Tomorrow", 
      "temp_max": ${units === 'imperial' ? '80' : '27'},
      "temp_min": ${units === 'imperial' ? '68' : '20'},
      "condition": "partly cloudy",
      "humidity": 45
    },
    {
      "date": "Wed",
      "temp_max": ${units === 'imperial' ? '76' : '24'},
      "temp_min": ${units === 'imperial' ? '62' : '17'},
      "condition": "light rain",
      "humidity": 65
    },
    {
      "date": "Thu",
      "temp_max": ${units === 'imperial' ? '82' : '28'},
      "temp_min": ${units === 'imperial' ? '70' : '21'},
      "condition": "sunny",
      "humidity": 35
    },
    {
      "date": "Fri",
      "temp_max": ${units === 'imperial' ? '79' : '26'},
      "temp_min": ${units === 'imperial' ? '67' : '19'},
      "condition": "cloudy",
      "humidity": 50
    },
    {
      "date": "Sat",
      "temp_max": ${units === 'imperial' ? '77' : '25'},
      "temp_min": ${units === 'imperial' ? '64' : '18'},
      "condition": "scattered clouds",
      "humidity": 55
    },
    {
      "date": "Sun",
      "temp_max": ${units === 'imperial' ? '81' : '27'},
      "temp_min": ${units === 'imperial' ? '69' : '21'},
      "condition": "sunny",
      "humidity": 40
    }
  ],
  "airQuality": null,
  "alerts": [],
  "moonPhase": null,
  "tides": null,
  "history": null,
  "pollen": null,
  "fireWeather": null
}

Use realistic temperatures for the current season, vary conditions naturally, and pick a real US city. Temperature units: ${units === 'imperial' ? 'Fahrenheit' : 'Celsius'}.`;

    console.log('Generating weather data via OpenAI');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a weather data generator. Return only valid JSON, no explanations.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      await logMetric(functionName, Date.now() - startTime, response.status, `OpenAI API error: ${response.status}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const weatherDataStr = data.choices[0].message.content;
    
    // Parse and return the weather data
    const weatherData = JSON.parse(weatherDataStr);
    
    await logMetric(functionName, Date.now() - startTime, 200);

    return new Response(JSON.stringify(weatherData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-weather function:', error);
    await logMetric(functionName, Date.now() - startTime, 500, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
