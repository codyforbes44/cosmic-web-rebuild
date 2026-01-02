/**
 * Anthropic Chat Edge Function
 * Migrated to use Lovable AI Gateway for unified AI management
 * 
 * @description Proxies chat requests through the Lovable AI Gateway
 * Supports Claude-style conversations with system prompts
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  system?: string;
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
  const functionName = 'anthropic-chat';

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      throw new Error('AI service not configured');
    }

    const requestBody: ChatRequest = await req.json();
    
    if (!requestBody.messages || !Array.isArray(requestBody.messages)) {
      throw new Error('Messages array is required');
    }

    const {
      messages,
      max_tokens = 1000,
      system
    } = requestBody;

    // Prepare messages with system prompt if provided
    const formattedMessages: ChatMessage[] = [];
    if (system) {
      formattedMessages.push({ role: 'system', content: system });
    }
    formattedMessages.push(...messages);

    console.log(`AI chat request: ${messages.length} messages via Lovable AI Gateway`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: formattedMessages,
        max_tokens,
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
            status: response.status
          }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        case 402:
          errorMessage = 'Payment required. Please add credits to your Lovable workspace.';
          errorType = 'payment_required';
          await logMetric(functionName, Date.now() - startTime, 402, errorMessage);
          return new Response(JSON.stringify({ 
            error: errorMessage,
            type: errorType,
            status: response.status
          }), {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        case 401:
          errorMessage = 'Authentication failed. Please check your configuration.';
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
          errorMessage = `AI service error: ${response.status} ${response.statusText}`;
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

    const data = await response.json();
    
    // Transform to Anthropic-compatible format for backward compatibility
    const transformedResponse = {
      content: [{ 
        type: 'text', 
        text: data.choices?.[0]?.message?.content || '' 
      }],
      model: data.model,
      usage: data.usage ? {
        input_tokens: data.usage.prompt_tokens || 0,
        output_tokens: data.usage.completion_tokens || 0
      } : undefined
    };
    
    // Log usage for monitoring
    if (data.usage) {
      console.log(`AI usage: ${(data.usage.prompt_tokens || 0) + (data.usage.completion_tokens || 0)} tokens`);
    }

    await logMetric(functionName, Date.now() - startTime, 200);

    return new Response(JSON.stringify(transformedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in anthropic-chat function:', error);
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
