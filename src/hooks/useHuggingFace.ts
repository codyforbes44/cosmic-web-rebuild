
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface HuggingFaceOptions {
  model: string;
  inputs: string | object;
  parameters?: object;
  options?: {
    wait_for_model?: boolean;
    use_cache?: boolean;
  };
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export interface HuggingFaceHookResult {
  isLoading: boolean;
  error: string | null;
  data: any;
  invoke: (options: HuggingFaceOptions) => Promise<any>;
  reset: () => void;
}

export const useHuggingFace = (): HuggingFaceHookResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const { toast } = useToast();

  const invoke = useCallback(async (options: HuggingFaceOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: result, error: invokeError } = await supabase.functions.invoke('huggingface-inference', {
        body: {
          model: options.model,
          inputs: options.inputs,
          parameters: options.parameters,
          options: options.options
        }
      });

      if (invokeError) {
        throw new Error(invokeError.message || 'Failed to invoke Hugging Face function');
      }

      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      options.onError?.(err as Error);
      
      toast({
        title: "Hugging Face Request Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

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
