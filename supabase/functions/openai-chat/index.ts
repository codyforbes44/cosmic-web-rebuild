
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const requestBody: ChatRequest = await req.json();
    
    // Validate required fields
    if (!requestBody.messages || !Array.isArray(requestBody.messages)) {
      throw new Error('Messages array is required');
    }

    // Set defaults
    const {
      messages,
      model = 'gpt-4o-mini',
      temperature = 0.7,
      max_tokens = 1000,
      stream = false
    } = requestBody;

    console.log(`OpenAI request: ${messages.length} messages, model: ${model}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
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
      console.error('OpenAI API error:', response.status, errorText);
      
      let errorMessage = '';
      let errorType = 'openai_error';
      
      switch (response.status) {
        case 429:
          errorMessage = 'OpenAI API rate limit exceeded. Please wait a moment and try again.';
          errorType = 'rate_limit_error';
          break;
        case 401:
          errorMessage = 'OpenAI API authentication failed. Please check your API key.';
          errorType = 'auth_error';
          break;
        case 400:
          errorMessage = 'Invalid request sent to OpenAI API. Please check your input.';
          errorType = 'bad_request_error';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = 'OpenAI API is temporarily unavailable. Please try again later.';
          errorType = 'service_error';
          break;
        default:
          errorMessage = `OpenAI API error: ${response.status} ${response.statusText}`;
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
      console.log(`OpenAI usage: ${data.usage.total_tokens} tokens`);
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in openai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      type: 'openai_error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
