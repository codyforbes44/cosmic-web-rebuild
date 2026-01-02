import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { OpenAIResponse, OpenAIRequestPayload, AISuccessCallback, AIErrorCallback } from '@/types/ai';

export interface UseOpenAIOptions {
  functionName?: string;
  onSuccess?: AISuccessCallback<OpenAIResponse>;
  onError?: AIErrorCallback;
}

export interface OpenAIHookResult {
  isLoading: boolean;
  error: string | null;
  data: OpenAIResponse | null;
  invoke: (payload: OpenAIRequestPayload) => Promise<OpenAIResponse>;
  reset: () => void;
}

export const useOpenAI = (options: UseOpenAIOptions = {}): OpenAIHookResult => {
  const { functionName = 'openai-chat', onSuccess, onError } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OpenAIResponse | null>(null);
  const { toast } = useToast();

  const invoke = useCallback(async (payload: OpenAIRequestPayload): Promise<OpenAIResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: result, error: invokeError } = await supabase.functions.invoke(functionName, {
        body: payload
      });

      if (invokeError) {
        throw new Error(invokeError.message || 'Failed to invoke OpenAI function');
      }

      const typedResult = result as OpenAIResponse;
      setData(typedResult);
      onSuccess?.(typedResult);
      return typedResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      onError?.(err as Error);
      
      toast({
        title: "AI Request Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [functionName, onSuccess, onError, toast]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    isLoading,
    error,
    data,
    invoke,
    reset
  };
};
