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
    const { audioData, language, sampleRate } = await req.json();

    if (!audioData) {
      throw new Error('Audio data is required');
    }

    // Convert base64 audio to binary
    const audioBuffer = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));

    // Write audio to temporary file
    const tempFile = `/tmp/audio_${Date.now()}.wav`;
    await Deno.writeFile(tempFile, audioBuffer);

    const modelLanguage = language || 'en-us';
    const audioSampleRate = sampleRate || 16000;

    // Use Vosk command-line tool for speech recognition
    const command = new Deno.Command("vosk-transcriber", {
      args: [
        "--audio", tempFile,
        "--model", modelLanguage,
        "--sample-rate", audioSampleRate.toString(),
        "--output-format", "json",
      ],
    });

    const { code, stdout, stderr } = await command.output();

    // Clean up temp file
    await Deno.remove(tempFile).catch(() => {});

    if (code !== 0) {
      const errorMsg = new TextDecoder().decode(stderr);
      throw new Error(`Vosk transcription failed: ${errorMsg}`);
    }

    const output = new TextDecoder().decode(stdout);
    let result;

    try {
      result = JSON.parse(output);
    } catch {
      // If JSON parsing fails, treat as plain text
      result = { text: output.trim() };
    }

    return new Response(JSON.stringify({
      transcript: result.text || '',
      confidence: result.confidence || 0,
      language: modelLanguage,
      words: result.words || [],
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in vosk-speech function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});