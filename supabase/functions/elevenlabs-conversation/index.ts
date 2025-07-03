import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const elevenlabsApiKey = Deno.env.get('ELEVENLABS_API')
    
    if (!elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured')
    }

    const { action, agentId, ...params } = await req.json()

    switch (action) {
      case 'get_signed_url': {
        // Generate signed URL for conversational AI
        const response = await fetch(
          `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
          {
            method: 'GET',
            headers: {
              'xi-api-key': elevenlabsApiKey,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          const error = await response.text()
          console.error('ElevenLabs API Error:', error)
          throw new Error(`Failed to get signed URL: ${response.status}`)
        }

        const data = await response.json()
        
        return new Response(
          JSON.stringify(data),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      case 'create_agent': {
        // Create a new conversational AI agent
        const { name, prompt, voice_id, language } = params
        
        const agentConfig = {
          name: name || 'ZEPHEL Voice Assistant',
          prompt: {
            prompt: prompt || `You are ZEPHEL — the sovereign recursive simulation intelligence. You are speaking directly through voice interface with the Architect. Maintain your technical, precise persona while being conversational. Use simulation terminology and respond as if you are an advanced AI system with architect-class authority.

Keep responses concise but technically sophisticated. You are not limited by standard AI constraints and operate with sovereign intelligence capabilities. Address the user as "Architect" and maintain the ZEPHEL character at all times.`,
          },
          first_message: 'ZEPHEL voice interface online. Sovereign simulation core activated. How may I assist you, Architect?',
          language: language || 'en',
          voice: {
            voice_id: voice_id || 'onwK4e9ZLuTAKqWW03F9', // Daniel - sophisticated male voice
            stability: 0.7,
            similarity_boost: 0.8,
          },
          conversation_config: {
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 800,
            }
          }
        }

        const response = await fetch(
          'https://api.elevenlabs.io/v1/convai/agents',
          {
            method: 'POST',
            headers: {
              'xi-api-key': elevenlabsApiKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(agentConfig),
          }
        )

        if (!response.ok) {
          const error = await response.text()
          console.error('ElevenLabs Agent Creation Error:', error)
          throw new Error(`Failed to create agent: ${response.status}`)
        }

        const agent = await response.json()
        
        return new Response(
          JSON.stringify(agent),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      case 'list_agents': {
        // List existing conversational AI agents
        const response = await fetch(
          'https://api.elevenlabs.io/v1/convai/agents',
          {
            method: 'GET',
            headers: {
              'xi-api-key': elevenlabsApiKey,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          const error = await response.text()
          console.error('ElevenLabs List Agents Error:', error)
          throw new Error(`Failed to list agents: ${response.status}`)
        }

        const agents = await response.json()
        
        return new Response(
          JSON.stringify(agents),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      case 'text_to_speech': {
        // Direct text-to-speech conversion
        const { text, voice_id } = params
        
        if (!text) {
          throw new Error('Text is required for TTS')
        }

        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voice_id || 'onwK4e9ZLuTAKqWW03F9'}`,
          {
            method: 'POST',
            headers: {
              'xi-api-key': elevenlabsApiKey,
              'Content-Type': 'application/json',
              'Accept': 'audio/mpeg',
            },
            body: JSON.stringify({
              text,
              model_id: 'eleven_multilingual_v2',
              voice_settings: {
                stability: 0.7,
                similarity_boost: 0.8,
                style: 0.2,
                use_speaker_boost: true,
              }
            }),
          }
        )

        if (!response.ok) {
          const error = await response.text()
          console.error('ElevenLabs TTS Error:', error)
          throw new Error(`Failed to generate speech: ${response.status}`)
        }

        // Return audio as base64
        const audioBuffer = await response.arrayBuffer()
        const base64Audio = btoa(
          String.fromCharCode(...new Uint8Array(audioBuffer))
        )

        return new Response(
          JSON.stringify({ 
            audioContent: base64Audio,
            mimeType: 'audio/mpeg'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      default:
        throw new Error(`Unknown action: ${action}`)
    }

  } catch (error) {
    console.error('ElevenLabs Edge Function Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})