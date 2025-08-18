import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WebhookRequest {
  url: string;
  data?: Record<string, any>;
  service: 'zapier' | 'make' | 'ifttt' | 'custom';
  retries?: number;
}

interface WebhookResponse {
  success: boolean;
  status?: number;
  response?: any;
  error?: string;
  timestamp: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Webhook integration function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const webhookRequest: WebhookRequest = await req.json();
    console.log("Webhook request:", { ...webhookRequest, data: webhookRequest.data ? '[DATA]' : undefined });

    // Validate required fields
    if (!webhookRequest.url || !webhookRequest.service) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: url, service" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate URL
    try {
      new URL(webhookRequest.url);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid webhook URL" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const result = await sendWebhook(webhookRequest);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in webhook integration:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

async function sendWebhook(request: WebhookRequest): Promise<WebhookResponse> {
  const maxRetries = request.retries || 3;
  let lastError: string = '';

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Webhook attempt ${attempt}/${maxRetries} to ${request.service}`);

      // Prepare payload based on service
      const payload = preparePayload(request.service, request.data);
      
      const response = await fetch(request.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "ZBI-Webhook-Service/1.0"
        },
        body: JSON.stringify(payload),
      });

      console.log(`Webhook response status: ${response.status}`);

      if (response.ok) {
        let responseData: any = null;
        
        try {
          const responseText = await response.text();
          if (responseText) {
            responseData = JSON.parse(responseText);
          }
        } catch {
          // Response might not be JSON, that's okay
          responseData = null;
        }

        return {
          success: true,
          status: response.status,
          response: responseData,
          timestamp: new Date().toISOString()
        };
      } else {
        lastError = `HTTP ${response.status}: ${response.statusText}`;
        
        // Don't retry for client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          break;
        }
      }
    } catch (error: any) {
      lastError = error.message;
      console.error(`Webhook attempt ${attempt} failed:`, error);
    }

    // Wait before retry (exponential backoff)
    if (attempt < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Max 10 seconds
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return {
    success: false,
    error: `Failed after ${maxRetries} attempts. Last error: ${lastError}`,
    timestamp: new Date().toISOString()
  };
}

function preparePayload(service: string, data: Record<string, any> = {}) {
  const basePayload = {
    timestamp: new Date().toISOString(),
    source: "ZBI Platform",
    ...data
  };

  switch (service) {
    case 'zapier':
      return {
        ...basePayload,
        trigger_source: "zbi_platform"
      };
    
    case 'make':
      return {
        ...basePayload,
        webhook_source: "zbi_platform"
      };
    
    case 'ifttt':
      return {
        value1: basePayload.title || data.event || 'ZBI Event',
        value2: basePayload.description || JSON.stringify(data),
        value3: basePayload.timestamp
      };
    
    case 'custom':
    default:
      return basePayload;
  }
}

// Helper function to validate webhook URLs for different services
function validateWebhookUrl(url: string, service: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    switch (service) {
      case 'zapier':
        return parsedUrl.hostname.includes('zapier.com') || parsedUrl.hostname.includes('hooks.zapier.com');
      
      case 'make':
        return parsedUrl.hostname.includes('make.com') || parsedUrl.hostname.includes('hook.integromat.com');
      
      case 'ifttt':
        return parsedUrl.hostname.includes('ifttt.com') || parsedUrl.hostname.includes('maker.ifttt.com');
      
      case 'custom':
      default:
        return true; // Allow any URL for custom webhooks
    }
  } catch {
    return false;
  }
}

serve(handler);