import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isIpRateLimited, extractClientIp, rateLimitResponse } from "../_shared/rateLimiter.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

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
  const functionName = 'openai-chat';

  // Handle CORS preflight requests
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
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const requestBody: ChatRequest = await req.json();
    
    // Validate required fields
    if (!requestBody.messages || !Array.isArray(requestBody.messages)) {
      throw new Error('Messages array is required');
    }

    // Set defaults - use Lovable AI models
    const {
      messages,
      model = 'google/gemini-2.5-flash', // Default to fast, cost-effective model
      temperature = 0.7,
      max_tokens = 1000,
      stream = false
    } = requestBody;

    console.log(`Lovable AI request: ${messages.length} messages, model: ${model}, stream: ${stream}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
        stream,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      
      let errorMessage = '';
      let errorType = 'ai_error';
      
      switch (response.status) {
        case 429:
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
          errorType = 'rate_limit_error';
          await logMetric(functionName, Date.now() - startTime, 429, errorMessage);
          return new Response(JSON.stringify({ 
            error: errorMessage,
            type: errorType,
            status: 429
          }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        case 402:
          errorMessage = 'Payment required. Please add credits to your Lovable workspace.';
          errorType = 'payment_required_error';
          await logMetric(functionName, Date.now() - startTime, 402, errorMessage);
          return new Response(JSON.stringify({ 
            error: errorMessage,
            type: errorType,
            status: 402
          }), {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        case 401:
          errorMessage = 'Authentication failed. Please check your API configuration.';
          errorType = 'auth_error';
          break;
        case 400:
          errorMessage = 'Invalid request. Please check your input.';
          errorType = 'bad_request_error';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = 'AI service is temporarily unavailable. Please try again later.';
          errorType = 'service_error';
          break;
        default:
          errorMessage = `AI Gateway error: ${response.status} ${response.statusText}`;
      }
      
      await logMetric(functionName, Date.now() - startTime, 500, errorMessage);
      return new Response(JSON.stringify({ 
        error: errorMessage,
        type: errorType,
        status: response.status
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle streaming responses
    if (stream) {
      // For streaming, log metric before returning
      await logMetric(functionName, Date.now() - startTime, 200);
      return new Response(response.body, {
        headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
      });
    }

    const data = await response.json();
    
    // Log usage for monitoring
    if (data.usage) {
      console.log(`Lovable AI usage: ${data.usage.total_tokens} tokens`);
    }

    await logMetric(functionName, Date.now() - startTime, 200);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in openai-chat function:', error);
    await logMetric(functionName, Date.now() - startTime, 500, error.message);
    return new Response(JSON.stringify({ 
      error: error.message,
      type: 'ai_error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
