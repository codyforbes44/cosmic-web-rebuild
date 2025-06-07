
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HuggingFaceRequest {
  model: string;
  inputs: string | object;
  parameters?: object;
  options?: {
    wait_for_model?: boolean;
    use_cache?: boolean;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const huggingFaceToken = Deno.env.get('HUGGING_FACE_TOKEN');
    if (!huggingFaceToken) {
      throw new Error('Hugging Face API token not configured');
    }

    const requestBody: HuggingFaceRequest = await req.json();
    
    if (!requestBody.model || !requestBody.inputs) {
      throw new Error('Model and inputs are required');
    }

    console.log(`Hugging Face request: ${requestBody.model}`);

    const response = await fetch(`https://api-inference.huggingface.co/models/${requestBody.model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: requestBody.inputs,
        parameters: requestBody.parameters || {},
        options: {
          wait_for_model: true,
          use_cache: false,
          ...requestBody.options
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', response.status, errorText);
      throw new Error(`Hugging Face API error: ${response.status} ${response.statusText}`);
    }

    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else if (contentType?.includes('image/')) {
      // For image generation models
      const arrayBuffer = await response.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      data = { image: `data:${contentType};base64,${base64}` };
    } else {
      data = await response.text();
    }

    console.log('Hugging Face response received successfully');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in huggingface-inference function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      type: 'huggingface_error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
