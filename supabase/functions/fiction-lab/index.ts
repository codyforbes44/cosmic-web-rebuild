import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { prompt, genre, length, style, temperature } = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    // FictionLab API endpoint
    const response = await fetch('https://api.fictionlab.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('FICTION_LAB_API_KEY')}`,
      },
      body: JSON.stringify({
        prompt,
        genre: genre || 'general',
        length: length || 'medium',
        style: style || 'narrative',
        temperature: temperature || 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`FictionLab API error: ${error}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      generatedText: data.text || data.content || '',
      metadata: {
        genre: data.genre,
        wordCount: data.word_count,
        style: data.style,
        prompt: prompt,
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fiction-lab function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});