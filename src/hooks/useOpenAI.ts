
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UseOpenAIOptions {
  functionName?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export interface OpenAIHookResult {
  isLoading: boolean;
  error: string | null;
  data: any;
  invoke: (payload: any) => Promise<any>;
  reset: () => void;
}

export const useOpenAI = (options: UseOpenAIOptions = {}): OpenAIHookResult => {
  const { functionName = 'openai-chat', onSuccess, onError } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const { toast } = useToast();

  const invoke = useCallback(async (payload: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: result, error: invokeError } = await supabase.functions.invoke(functionName, {
        body: payload
      });

      if (invokeError) {
        throw new Error(invokeError.message || 'Failed to invoke OpenAI function');
      }

      setData(result);
      onSuccess?.(result);
      return result;
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
