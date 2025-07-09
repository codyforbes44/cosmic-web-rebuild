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
    const { text, voice, rate, pitch } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    const selectedVoice = voice || 'en-US-AriaNeural';
    const speechRate = rate || '0%';
    const speechPitch = pitch || '0%';

    // Create SSML for Microsoft Speech API
    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="${selectedVoice}">
          <prosody rate="${speechRate}" pitch="${speechPitch}">
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

    // Use Microsoft Cognitive Services Speech API
    const speechKey = Deno.env.get('AZURE_SPEECH_KEY');
    const speechRegion = Deno.env.get('AZURE_SPEECH_REGION') || 'eastus';

    if (!speechKey) {
      throw new Error('Azure Speech key not configured');
    }

    const response = await fetch(
      `https://${speechRegion}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': speechKey,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        },
        body: ssml,
      }
    );

    if (!response.ok) {
      throw new Error(`Azure Speech API error: ${response.statusText}`);
    }

    // Convert audio to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    return new Response(JSON.stringify({
      audioContent: base64Audio,
      voice: selectedVoice,
      format: 'mp3',
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in edge-tts function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      note: 'Requires Azure Speech Service configuration'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});