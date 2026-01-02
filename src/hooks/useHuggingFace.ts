import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { 
  HuggingFaceResponse, 
  HuggingFaceParameters, 
  HuggingFaceOptions as HFOptions,
  AISuccessCallback,
  AIErrorCallback 
} from '@/types/ai';

export interface HuggingFaceInvokeOptions {
  model: string;
  inputs: string | Record<string, unknown>;
  parameters?: HuggingFaceParameters;
  options?: HFOptions;
  onSuccess?: AISuccessCallback<HuggingFaceResponse>;
  onError?: AIErrorCallback;
}

export interface HuggingFaceHookResult {
  isLoading: boolean;
  error: string | null;
  data: HuggingFaceResponse | null;
  invoke: (options: HuggingFaceInvokeOptions) => Promise<HuggingFaceResponse>;
  reset: () => void;
}

export const useHuggingFace = (): HuggingFaceHookResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HuggingFaceResponse | null>(null);
  const { toast } = useToast();

  const invoke = useCallback(async (options: HuggingFaceInvokeOptions): Promise<HuggingFaceResponse> => {
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

      const typedResult = result as HuggingFaceResponse;
      setData(typedResult);
      options.onSuccess?.(typedResult);
      return typedResult;
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
