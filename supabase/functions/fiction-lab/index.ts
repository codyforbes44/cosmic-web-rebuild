/**
 * Fiction Lab Edge Function
 * Migrated to use Lovable AI Gateway for story generation
 * 
 * @description AI-powered creative story generation
 * Supports various genres, styles, and story lengths
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Genre-specific writing prompts
const GENRE_PROMPTS: Record<string, string> = {
  fantasy: 'Write an imaginative fantasy story with magical elements, mythical creatures, and epic adventures.',
  scifi: 'Create a science fiction narrative with futuristic technology, space exploration, or speculative concepts.',
  romance: 'Craft a romantic story with compelling characters and emotional connections.',
  mystery: 'Write a suspenseful mystery with intriguing clues and unexpected twists.',
  horror: 'Create an atmospheric horror story that builds tension and evokes fear.',
  general: 'Write an engaging narrative story that captivates the reader.',
};

// Length configurations (approximate word counts)
const LENGTH_CONFIGS: Record<string, { maxTokens: number; instruction: string }> = {
  short: { maxTokens: 500, instruction: 'Write a brief story (about 200-300 words).' },
  medium: { maxTokens: 1500, instruction: 'Write a moderately-length story (about 500-800 words).' },
  long: { maxTokens: 3000, instruction: 'Write a detailed story (about 1000-1500 words).' },
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
  const functionName = 'fiction-lab';

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, genre, length, style } = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      throw new Error('AI service not configured');
    }

    const selectedGenre = genre || 'general';
    const selectedLength = length || 'medium';
    const genrePrompt = GENRE_PROMPTS[selectedGenre] || GENRE_PROMPTS.general;
    const lengthConfig = LENGTH_CONFIGS[selectedLength] || LENGTH_CONFIGS.medium;

    const systemPrompt = `You are a creative fiction writer. ${genrePrompt}

Writing Style: ${style || 'narrative'}
${lengthConfig.instruction}

Important guidelines:
- Create vivid descriptions and compelling characters
- Use proper story structure (beginning, middle, end)
- Maintain consistent tone throughout
- End with a satisfying conclusion`;

    console.log(`Fiction Lab: genre=${selectedGenre}, length=${selectedLength}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Write a story based on this prompt: ${prompt}` }
        ],
        max_tokens: lengthConfig.maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        await logMetric(functionName, Date.now() - startTime, 429, 'Rate limit exceeded');
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          type: 'rate_limit_error'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        await logMetric(functionName, Date.now() - startTime, 402, 'Payment required');
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
    const generatedText = data.choices?.[0]?.message?.content || '';

    // Calculate approximate word count
    const wordCount = generatedText.split(/\s+/).filter(Boolean).length;

    // Log usage
    if (data.usage) {
      console.log(`Fiction Lab usage: ${(data.usage.prompt_tokens || 0) + (data.usage.completion_tokens || 0)} tokens`);
    }

    await logMetric(functionName, Date.now() - startTime, 200);

    return new Response(JSON.stringify({
      generatedText,
      metadata: {
        genre: selectedGenre,
        wordCount,
        style: style || 'narrative',
        prompt,
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fiction-lab function:', error);
    await logMetric(functionName, Date.now() - startTime, 500, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
