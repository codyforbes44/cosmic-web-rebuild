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
    const { text, voice, emotion } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    // 15.ai API endpoint for voice synthesis
    const response = await fetch('https://api.15.ai/app/getAudio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('FIFTEEN_AI_API_KEY')}`,
      },
      body: JSON.stringify({
        text,
        character: voice || 'twilight_sparkle',
        emotion: emotion || 'neutral',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`15.ai API error: ${error}`);
    }

    // Convert audio to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    return new Response(JSON.stringify({ 
      audioContent: base64Audio,
      voice,
      emotion 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fifteen-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});