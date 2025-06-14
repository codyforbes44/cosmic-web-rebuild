import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const anthropicApiKey = Deno.env.get('ANTHROPIC_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  system?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!anthropicApiKey) {
      throw new Error('Anthropic API key not configured');
    }

    const requestBody: ChatRequest = await req.json();
    
    if (!requestBody.messages || !Array.isArray(requestBody.messages)) {
      throw new Error('Messages array is required');
    }

    const {
      messages,
      model = 'claude-sonnet-4-20250514',
      temperature = 0.3,
      max_tokens = 1000,
      system
    } = requestBody;

    console.log(`Anthropic request: ${messages.length} messages, model: ${model}`);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicApiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
        system
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      
      let errorMessage = '';
      let errorType = 'anthropic_error';
      
      switch (response.status) {
        case 429:
          errorMessage = 'Anthropic API rate limit exceeded. Please wait a moment and try again.';
          errorType = 'rate_limit_error';
          break;
        case 401:
          errorMessage = 'Anthropic API authentication failed. Please check your API key.';
          errorType = 'auth_error';
          break;
        case 400:
          errorMessage = 'Invalid request sent to Anthropic API. Please check your input.';
          errorType = 'bad_request_error';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = 'Anthropic API is temporarily unavailable. Please try again later.';
          errorType = 'service_error';
          break;
        default:
          errorMessage = `Anthropic API error: ${response.status} ${response.statusText}`;
      }
      
      return new Response(JSON.stringify({ 
        error: errorMessage,
        type: errorType,
        status: response.status
      }), {
        status: response.status === 429 ? 429 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    
    // Log usage for monitoring
    if (data.usage) {
      console.log(`Anthropic usage: ${data.usage.input_tokens + data.usage.output_tokens} tokens`);
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in anthropic-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      type: 'anthropic_error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});