import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';

// Available Lovable AI models
export const AI_MODELS = {
  // Gemini models
  'gemini-flash': 'google/gemini-2.5-flash',      // Default - balanced speed/quality
  'gemini-flash-lite': 'google/gemini-2.5-flash-lite', // Fastest, cheapest
  'gemini-pro': 'google/gemini-2.5-pro',          // Most capable Gemini
  'gemini-3-pro': 'google/gemini-3-pro-preview',  // Next-gen Gemini
  // GPT models
  'gpt-5': 'openai/gpt-5',                        // Most powerful
  'gpt-5-mini': 'openai/gpt-5-mini',              // Balanced
  'gpt-5-nano': 'openai/gpt-5-nano',              // Fast, cost-effective
  // Image generation
  'gemini-image': 'google/gemini-2.5-flash-image',
  'gemini-3-image': 'google/gemini-3-pro-image-preview',
} as const;

export type AIModelKey = keyof typeof AI_MODELS;
export type AIModelId = typeof AI_MODELS[AIModelKey];

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequestOptions {
  model?: AIModelKey | AIModelId;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  stream?: boolean;
}

export interface AIStreamCallbacks {
  onDelta?: (chunk: string) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
}

export interface UseAIOptions {
  functionName?: string;
  onSuccess?: (data: AIResponse) => void;
  onError?: (error: Error) => void;
  showErrorToast?: boolean;
}

export interface AIResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface UseAIResult {
  isLoading: boolean;
  error: string | null;
  data: AIResponse | null;
  invoke: (messages: ChatMessage[], options?: AIRequestOptions) => Promise<AIResponse | null>;
  invokeWithPrompt: (prompt: string, options?: AIRequestOptions) => Promise<string | null>;
  streamChat: (messages: ChatMessage[], options?: AIRequestOptions, callbacks?: AIStreamCallbacks) => Promise<void>;
  reset: () => void;
  abort: () => void;
}

/**
 * Unified AI hook for interacting with Lovable AI Gateway
 * Supports both streaming and non-streaming responses
 */
export const useAI = (options: UseAIOptions = {}): UseAIResult => {
  const { 
    functionName = 'openai-chat', 
    onSuccess, 
    onError, 
    showErrorToast = true 
  } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AIResponse | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  const resolveModel = (model?: AIModelKey | AIModelId): string => {
    if (!model) return AI_MODELS['gemini-flash'];
    // Check if it's a model key
    if (model in AI_MODELS) {
      return AI_MODELS[model as AIModelKey];
    }
    // Assume it's already a model ID
    return model;
  };

  const handleError = useCallback((err: unknown, customMessage?: string) => {
    const errorMessage = err instanceof Error ? err.message : customMessage || 'An unexpected error occurred';
    setError(errorMessage);
    
    logger.error('AI request failed', err instanceof Error ? err : new Error(errorMessage));
    
    if (showErrorToast) {
      // Customize toast based on error type
      if (errorMessage.includes('Rate limit')) {
        toast({
          title: "Rate Limit Exceeded",
          description: "Please wait a moment before trying again.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('Payment required')) {
        toast({
          title: "Credits Required",
          description: "Please add credits to continue using AI features.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "AI Request Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
    
    onError?.(err instanceof Error ? err : new Error(errorMessage));
  }, [showErrorToast, toast, onError]);

  /**
   * Invoke AI with full message array
   */
  const invoke = useCallback(async (
    messages: ChatMessage[], 
    options: AIRequestOptions = {}
  ): Promise<AIResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: result, error: invokeError } = await supabase.functions.invoke(functionName, {
        body: {
          messages,
          model: resolveModel(options.model),
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 1000,
          stream: false
        }
      });

      if (invokeError) {
        throw new Error(invokeError.message || 'Failed to invoke AI function');
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      setData(result);
      onSuccess?.(result);
      
      logger.info('AI request successful', { 
        tokens: result?.usage?.total_tokens,
        model: resolveModel(options.model)
      });
      
      return result;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [functionName, onSuccess, handleError]);

  /**
   * Simple invoke with just a prompt string
   * Returns the assistant's response content directly
   */
  const invokeWithPrompt = useCallback(async (
    prompt: string, 
    options: AIRequestOptions = {}
  ): Promise<string | null> => {
    const messages: ChatMessage[] = [];
    
    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }
    
    messages.push({ role: 'user', content: prompt });
    
    const result = await invoke(messages, options);
    
    if (result?.choices?.[0]?.message?.content) {
      return result.choices[0].message.content.trim();
    }
    
    return null;
  }, [invoke]);

  /**
   * Stream chat responses token by token
   */
  const streamChat = useCallback(async (
    messages: ChatMessage[],
    options: AIRequestOptions = {},
    callbacks: AIStreamCallbacks = {}
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${functionName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages,
            model: resolveModel(options.model),
            temperature: options.temperature ?? 0.7,
            max_tokens: options.maxTokens ?? 1000,
            stream: true
          }),
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok || !response.body) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        if (response.status === 402) {
          throw new Error('Payment required. Please add credits to your Lovable workspace.');
        }
        throw new Error(`Failed to start stream: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              callbacks.onDelta?.(content);
            }
          } catch {
            // Incomplete JSON, put back and wait for more data
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) callbacks.onDelta?.(content);
          } catch { /* ignore partial leftovers */ }
        }
      }

      callbacks.onDone?.();
      logger.info('AI stream completed');
      
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        logger.info('AI stream aborted by user');
        return;
      }
      handleError(err);
      callbacks.onError?.(err instanceof Error ? err : new Error('Stream failed'));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [functionName, handleError]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    data,
    invoke,
    invokeWithPrompt,
    streamChat,
    reset,
    abort
  };
};

/**
 * Helper to format AI response content
 */
export const formatAIResponse = (response: AIResponse | null): string => {
  if (!response?.choices?.[0]?.message?.content) {
    return '';
  }
  return response.choices[0].message.content.trim();
};

/**
 * Estimate tokens for a text string
 * Rough estimation: 1 token ≈ 4 characters
 */
export const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};

/**
 * Validate if text is within token limit
 */
export const validateTokenLimit = (text: string, maxTokens: number = 4000): boolean => {
  return estimateTokens(text) <= maxTokens;
};
