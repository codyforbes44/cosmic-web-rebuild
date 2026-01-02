/**
 * Medical Diagnosis Edge Function
 * Migrated to use Lovable AI Gateway for unified AI management
 * 
 * @description Provides AI-powered medical symptom analysis
 * Uses structured output via tool calling for consistent responses
 * 
 * DISCLAIMER: This is for educational purposes only and should not replace
 * professional medical advice.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symptoms, age, gender, medicalHistory } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      throw new Error('AI service not configured');
    }

    if (!symptoms?.trim()) {
      throw new Error('Symptoms are required');
    }

    const systemPrompt = `You are a medical AI assistant designed to help users understand potential medical conditions based on their symptoms. 

IMPORTANT DISCLAIMERS:
- You are NOT a replacement for professional medical advice
- Always recommend consulting with a healthcare provider for proper diagnosis
- Provide educational information only, not definitive diagnoses
- Include urgency indicators when symptoms may require immediate attention

Focus on:
- Most likely conditions based on symptoms
- When to seek immediate medical attention
- General care recommendations
- Clear medical disclaimers`;

    const userPrompt = `Patient Information:
- Age: ${age || 'Not specified'}
- Gender: ${gender || 'Not specified'}
- Medical History: ${medicalHistory || 'None specified'}
- Symptoms: ${symptoms}

Please analyze these symptoms and provide potential medical conditions with appropriate urgency levels and recommendations.`;

    console.log('Processing medical diagnosis request via Lovable AI Gateway');

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
          { role: 'user', content: userPrompt }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'provide_diagnosis',
              description: 'Provide medical diagnosis analysis with structured data',
              parameters: {
                type: 'object',
                properties: {
                  possibleConditions: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        condition: { type: 'string', description: 'Name of the condition' },
                        likelihood: { type: 'string', enum: ['High', 'Medium', 'Low'] },
                        description: { type: 'string', description: 'Brief description of the condition' },
                        urgency: { type: 'string', enum: ['Emergency', 'Urgent', 'Routine', 'Monitor'] }
                      },
                      required: ['condition', 'likelihood', 'description', 'urgency']
                    }
                  },
                  recommendations: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'List of actionable recommendations'
                  },
                  disclaimer: {
                    type: 'string',
                    description: 'Medical disclaimer statement'
                  }
                },
                required: ['possibleConditions', 'recommendations', 'disclaimer']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'provide_diagnosis' } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          possibleConditions: [],
          recommendations: ['Please wait and try again.'],
          disclaimer: 'Service temporarily unavailable.'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'Payment required. Please add credits to your Lovable workspace.',
          possibleConditions: [],
          recommendations: ['Service requires payment.'],
          disclaimer: 'Service temporarily unavailable.'
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI service error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Log usage for monitoring
    if (data.usage) {
      console.log(`Medical diagnosis usage: ${(data.usage.prompt_tokens || 0) + (data.usage.completion_tokens || 0)} tokens`);
    }

    // Extract structured response from tool call
    let parsedAnalysis;
    try {
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        parsedAnalysis = JSON.parse(toolCall.function.arguments);
      } else {
        // Fallback: try to parse from content
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          parsedAnalysis = JSON.parse(content);
        }
      }
    } catch {
      // Final fallback
      const content = data.choices?.[0]?.message?.content || '';
      parsedAnalysis = {
        possibleConditions: [],
        recommendations: [content || 'Unable to analyze symptoms at this time. Please consult a healthcare provider.'],
        disclaimer: 'This is for educational purposes only. Please consult a healthcare provider for proper diagnosis.'
      };
    }

    // Ensure required fields exist
    if (!parsedAnalysis.disclaimer) {
      parsedAnalysis.disclaimer = 'This is for educational purposes only. Please consult a healthcare provider for proper diagnosis.';
    }

    return new Response(JSON.stringify(parsedAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in medical-diagnosis function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      possibleConditions: [],
      recommendations: ['Unable to analyze symptoms at this time. Please consult a healthcare provider.'],
      disclaimer: 'This service is experiencing technical difficulties. Please seek professional medical advice.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
