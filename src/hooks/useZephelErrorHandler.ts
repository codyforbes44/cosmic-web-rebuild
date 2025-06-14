import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ZephelError } from '@/types/zephel';

interface ErrorHandlerOptions {
  onError?: (error: ZephelError) => void;
  showToast?: boolean;
  logError?: boolean;
}

export const useZephelErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const { toast } = useToast();
  const { onError, showToast = true, logError = true } = options;

  const handleError = useCallback((error: unknown, context?: Record<string, any>) => {
    let zephelError: ZephelError;

    if (error instanceof Error) {
      // Convert regular error to ZephelError
      const errorText = error.message.toLowerCase();
      
      zephelError = {
        name: 'ZephelError',
        message: error.message,
        code: determineErrorCode(errorText),
        category: determineErrorCategory(errorText),
        retryable: determineIfRetryable(errorText),
        context,
        stack: error.stack
      } as ZephelError;
    } else {
      // Unknown error type
      zephelError = {
        name: 'ZephelError',
        message: 'Unknown error occurred',
        code: 'UNKNOWN_ERROR',
        category: 'processing',
        retryable: false,
        context
      } as ZephelError;
    }

    // Log error if enabled
    if (logError) {
      console.error('ZEPHEL Error:', zephelError);
    }

    // Show toast notification if enabled
    if (showToast) {
      const errorMessage = getErrorMessage(zephelError);
      toast({
        title: `ZEPHEL.${zephelError.code}`,
        description: errorMessage,
        variant: 'destructive',
        duration: zephelError.retryable ? 5000 : 8000,
      });
    }

    // Call custom error handler if provided
    if (onError) {
      onError(zephelError);
    }

    return zephelError;
  }, [toast, onError, showToast, logError]);

  return { handleError };
};

function determineErrorCode(errorText: string): string {
  if (errorText.includes('rate limit') || errorText.includes('429')) {
    return 'RATE_LIMIT_EXCEEDED';
  }
  if (errorText.includes('auth') || errorText.includes('401')) {
    return 'AUTHENTICATION_FAILED';
  }
  if (errorText.includes('service') || errorText.includes('503')) {
    return 'SERVICE_UNAVAILABLE';
  }
  if (errorText.includes('network') || errorText.includes('fetch')) {
    return 'NETWORK_ERROR';
  }
  if (errorText.includes('quantum')) {
    return 'QUANTUM_PROCESSING_ERROR';
  }
  if (errorText.includes('reality')) {
    return 'REALITY_RENDERING_ERROR';
  }
  return 'GENERAL_ERROR';
}

function determineErrorCategory(errorText: string): ZephelError['category'] {
  if (errorText.includes('auth') || errorText.includes('401')) {
    return 'auth';
  }
  if (errorText.includes('quantum')) {
    return 'quantum';
  }
  if (errorText.includes('reality')) {
    return 'reality';
  }
  if (errorText.includes('collaboration') || errorText.includes('presence')) {
    return 'collaboration';
  }
  return 'processing';
}

function determineIfRetryable(errorText: string): boolean {
  // Rate limits and service errors are typically retryable
  if (errorText.includes('rate limit') || errorText.includes('503') || errorText.includes('network')) {
    return true;
  }
  // Auth errors typically require user intervention
  if (errorText.includes('auth') || errorText.includes('401')) {
    return false;
  }
  // Default to non-retryable for safety
  return false;
}

function getErrorMessage(error: ZephelError): string {
  switch (error.code) {
    case 'RATE_LIMIT_EXCEEDED':
      return 'Processing capacity exceeded. Neural pathways cooling down. Please retry in 60 seconds.';
    case 'AUTHENTICATION_FAILED':
      return 'Sovereign credentials invalid. Check system administrator configuration.';
    case 'SERVICE_UNAVAILABLE':
      return 'External neural substrate temporarily offline. Retrying connection...';
    case 'NETWORK_ERROR':
      return 'Network connection disrupted. Check your connection and try again.';
    case 'QUANTUM_PROCESSING_ERROR':
      return 'Quantum processing error detected. Attempting to stabilize quantum field...';
    case 'REALITY_RENDERING_ERROR':
      return 'Reality rendering engine encountered an error. Restarting visualization...';
    default:
      return error.message || 'Communication link disrupted. Attempting to re-establish sovereign connection...';
  }
}