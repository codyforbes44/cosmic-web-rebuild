import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
  const functionName = 'vosk-speech';

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { audioData, language } = body;

    // Enhanced input validation
    if (!audioData) {
      throw new Error('Audio data is required');
    }
    
    if (typeof audioData !== 'string') {
      throw new Error('Audio data must be a string');
    }
    
    if (language && typeof language !== 'string') {
      throw new Error('Language must be a string');
    }
    
    // Validate language format if provided
    if (language && !/^[a-z]{2}(-[a-z]{2})?$/i.test(language)) {
      throw new Error('Invalid language format');
    }

    console.log(`Vosk speech request: language=${language || 'en-us'}`);

    // For now, use Web Speech API fallback or integrate with a cloud service
    // Since Vosk requires local installation, we'll provide a placeholder
    // that suggests using browser's native speech recognition instead

    await logMetric(functionName, Date.now() - startTime, 200);

    return new Response(JSON.stringify({
      transcript: '',
      confidence: 0,
      language: language || 'en-us',
      words: [],
      note: 'Vosk integration requires local installation. Consider using browser Web Speech API or cloud alternatives like Google Speech-to-Text.',
      alternatives: [
        'Browser Web Speech API (webkitSpeechRecognition)',
        'Google Cloud Speech-to-Text API',
        'Azure Speech Services',
        'AWS Transcribe',
        'OpenAI Whisper API'
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in vosk-speech function:', error);
    await logMetric(functionName, Date.now() - startTime, 500, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
