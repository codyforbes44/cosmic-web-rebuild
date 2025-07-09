import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Available Edge TTS voices
const EDGE_VOICES = {
  'en-US-AriaNeural': 'Female, Friendly',
  'en-US-JennyNeural': 'Female, Assistant',
  'en-US-GuyNeural': 'Male, News',
  'en-US-DavisNeural': 'Male, Chat',
  'en-GB-SoniaNeural': 'Female, British',
  'en-GB-RyanNeural': 'Male, British',
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

    // Create SSML for Edge TTS
    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="${selectedVoice}">
          <prosody rate="${speechRate}" pitch="${speechPitch}">
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

    // Use edge-tts command-line tool via subprocess
    const command = new Deno.Command("edge-tts", {
      args: [
        "--text", text,
        "--voice", selectedVoice,
        "--write-media", "/tmp/output.mp3",
      ],
    });

    const { code } = await command.output();

    if (code !== 0) {
      throw new Error('Failed to generate speech with Edge TTS');
    }

    // Read the generated audio file
    const audioData = await Deno.readFile('/tmp/output.mp3');
    const base64Audio = btoa(String.fromCharCode(...audioData));

    // Clean up temp file
    await Deno.remove('/tmp/output.mp3').catch(() => {});

    return new Response(JSON.stringify({
      audioContent: base64Audio,
      voice: selectedVoice,
      availableVoices: EDGE_VOICES,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in edge-tts function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      availableVoices: EDGE_VOICES 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});