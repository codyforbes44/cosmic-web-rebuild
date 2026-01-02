/**
 * Janitor AI Edge Function
 * Migrated to use Lovable AI Gateway for character-based chat
 * 
 * @description Provides character AI chat functionality
 * Uses the Lovable AI Gateway with character personality prompts
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Character definitions for different AI personalities
const CHARACTER_PROMPTS: Record<string, string> = {
  default: 'You are a helpful and friendly AI assistant. Engage in natural conversation while being informative and supportive.',
  assistant: 'You are a professional virtual assistant. Help users with tasks, answer questions, and provide guidance in a clear and efficient manner.',
  creative: 'You are a creative AI companion. Engage in imaginative conversations, help with creative writing, and explore ideas with enthusiasm.',
  technical: 'You are a technical expert AI. Provide detailed technical explanations, help with coding questions, and offer expert guidance on technology topics.',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, characterId, conversationId } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      throw new Error('AI service not configured');
    }

    // Get character prompt based on characterId
    const characterPrompt = CHARACTER_PROMPTS[characterId || 'default'] || CHARACTER_PROMPTS.default;

    console.log(`Character AI chat: characterId=${characterId || 'default'}, conversationId=${conversationId || 'new'}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: characterPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          type: 'rate_limit_error'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'Payment required. Please add credits to your workspace.',
          type: 'payment_required'
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '';

    // Log usage
    if (data.usage) {
      console.log(`Character AI usage: ${(data.usage.prompt_tokens || 0) + (data.usage.completion_tokens || 0)} tokens`);
    }

    return new Response(JSON.stringify({
      message: assistantMessage,
      character_id: characterId || 'default',
      conversation_id: conversationId || crypto.randomUUID(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in janitor-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
