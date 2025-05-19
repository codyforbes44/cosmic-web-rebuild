
import { useToast } from "@/hooks/use-toast";

// Types for Zapier integration
export interface ZapierWebhook {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

export interface ZapierTriggerResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Store webhooks in localStorage for persistence
const STORAGE_KEY = 'zbi-zapier-webhooks';

// Function to get stored webhooks
export const getStoredWebhooks = (): ZapierWebhook[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse stored webhooks', e);
    return [];
  }
};

// Function to save webhooks
export const saveWebhook = (webhook: ZapierWebhook): void => {
  const currentWebhooks = getStoredWebhooks();
  const exists = currentWebhooks.findIndex(w => w.id === webhook.id);
  
  if (exists >= 0) {
    currentWebhooks[exists] = webhook;
  } else {
    currentWebhooks.push(webhook);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWebhooks));
};

// Function to remove a webhook
export const removeWebhook = (webhookId: string): void => {
  const currentWebhooks = getStoredWebhooks();
  const filtered = currentWebhooks.filter(w => w.id !== webhookId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

// Function to trigger a Zapier webhook
export const triggerZapierWebhook = async (
  webhook: ZapierWebhook, 
  payload: Record<string, any>
): Promise<ZapierTriggerResponse> => {
  try {
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // Handle CORS restrictions
      body: JSON.stringify(payload),
    });
    
    // Since we're using no-cors, we won't get a proper response
    // We'll assume success and rely on Zapier's error handling
    return { 
      success: true, 
    };
  } catch (error) {
    console.error('Error triggering Zapier webhook:', error);
    return { 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Natural language processing for webhook commands
export const processZapierCommand = (message: string): { 
  isCommand: boolean;
  webhookCategory?: string;
  payload?: Record<string, any>;
} => {
  // Check if message is a Zapier command
  const zapierTriggerRegex = /^(?:zap|zapier|trigger|run|execute)\s+([a-zA-Z0-9_-]+)(?:\s+with\s+(.+))?$/i;
  const match = message.match(zapierTriggerRegex);
  
  if (!match) return { isCommand: false };
  
  const webhookCategory = match[1].toLowerCase();
  const payloadText = match[2] || '';
  let payload: Record<string, any> = { message: payloadText };
  
  // Try to parse structured data from the message if available
  if (payloadText.includes(':') && (payloadText.includes(',') || payloadText.includes('and'))) {
    const pairs = payloadText
      .split(/,|\sand\s/)
      .map(pair => pair.trim())
      .filter(Boolean);
      
    pairs.forEach(pair => {
      const [key, value] = pair.split(':').map(part => part.trim());
      if (key && value) {
        payload[key] = value;
      }
    });
  }
  
  return {
    isCommand: true,
    webhookCategory,
    payload: {
      ...payload,
      timestamp: new Date().toISOString(),
      source: 'ƷBI Chat'
    }
  };
};

// Helper to find webhook by category
export const findWebhookByCategory = (category: string): ZapierWebhook | undefined => {
  const webhooks = getStoredWebhooks();
  return webhooks.find(webhook => 
    webhook.category.toLowerCase() === category.toLowerCase()
  );
};

// Parse Zapier responses for displaying in the chat
export const parseZapierResponse = (response: any): string => {
  if (!response) return "No data received from Zapier.";
  
  try {
    if (typeof response === 'string') {
      return response;
    }
    
    if (typeof response === 'object') {
      // Check if it's an array of items
      if (Array.isArray(response)) {
        return response.map((item, index) => {
          if (typeof item === 'object') {
            return `Item ${index + 1}:\n${Object.entries(item)
              .map(([k, v]) => `- ${k}: ${v}`)
              .join('\n')}`;
          }
          return `- ${item}`;
        }).join('\n\n');
      }
      
      // Regular object
      return Object.entries(response)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    }
    
    return String(response);
  } catch (e) {
    console.error('Error parsing Zapier response', e);
    return "Error processing Zapier response data.";
  }
};
