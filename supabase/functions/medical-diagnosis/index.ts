
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are a medical AI assistant designed to help users understand potential medical conditions based on their symptoms. 

IMPORTANT DISCLAIMERS:
- You are NOT a replacement for professional medical advice
- Always recommend consulting with a healthcare provider for proper diagnosis
- Provide educational information only, not definitive diagnoses
- Include urgency indicators when symptoms may require immediate attention

Your response should be structured as JSON with this format:
{
  "possibleConditions": [
    {
      "condition": "Condition name",
      "likelihood": "High/Medium/Low",
      "description": "Brief description",
      "urgency": "Emergency/Urgent/Routine/Monitor"
    }
  ],
  "recommendations": [
    "Specific actionable recommendations"
  ],
  "disclaimer": "Medical disclaimer statement"
}

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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Try to parse as JSON, fallback to text if needed
    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(analysis);
    } catch {
      parsedAnalysis = {
        possibleConditions: [],
        recommendations: [analysis],
        disclaimer: "This is for educational purposes only. Please consult a healthcare provider."
      };
    }

    return new Response(JSON.stringify(parsedAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in medical-diagnosis function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      possibleConditions: [],
      recommendations: ["Unable to analyze symptoms at this time. Please consult a healthcare provider."],
      disclaimer: "This service is experiencing technical difficulties. Please seek professional medical advice."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
