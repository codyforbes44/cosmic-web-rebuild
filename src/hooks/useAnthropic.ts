import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AnthropicRequest {
  messages: AnthropicMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  system?: string;
}

interface AnthropicResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

export const useAnthropic = () => {
  const [isLoading, setIsLoading] = useState(false);

  const invoke = async (request: AnthropicRequest): Promise<AnthropicResponse | null> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('anthropic-chat', {
        body: request
      });

      if (error) {
        throw new Error(error.message || 'Failed to call Anthropic API');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    invoke,
    isLoading
  };
};