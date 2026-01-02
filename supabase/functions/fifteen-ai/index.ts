/**
 * 15.ai Voice Synthesis Edge Function
 * 
 * @description Text-to-speech functionality
 * Note: For actual voice synthesis, use the ElevenLabs integration
 * This endpoint provides a placeholder response and guidance
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
  const functionName = 'fifteen-ai';

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice, emotion } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    console.log(`Voice synthesis request: voice=${voice || 'default'}, emotion=${emotion || 'neutral'}`);

    // Check for ElevenLabs API key for proper voice synthesis
    const ELEVENLABS_API = Deno.env.get('ELEVENLABS_API');
    
    if (ELEVENLABS_API) {
      // Use ElevenLabs for actual voice synthesis
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', response.status, errorText);
        await logMetric(functionName, Date.now() - startTime, response.status, `ElevenLabs API error: ${response.status}`);
        throw new Error(`Voice synthesis error: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64Audio = btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer))
      );

      await logMetric(functionName, Date.now() - startTime, 200);

      return new Response(JSON.stringify({ 
        audioContent: base64Audio,
        voice: voice || 'default',
        emotion: emotion || 'neutral',
        provider: 'elevenlabs'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fallback: Return guidance if no voice synthesis API is configured
    await logMetric(functionName, Date.now() - startTime, 200);

    return new Response(JSON.stringify({
      message: 'Voice synthesis requires ElevenLabs API configuration.',
      suggestion: 'Please use the ElevenLabs conversation feature or configure ELEVENLABS_API secret.',
      text,
      voice: voice || 'default',
      emotion: emotion || 'neutral',
      provider: 'none'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fifteen-ai function:', error);
    await logMetric(functionName, Date.now() - startTime, 500, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
