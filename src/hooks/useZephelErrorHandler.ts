import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ZephelError, ZephelErrorCode, ZephelErrorContext } from '@/types/zephel';
import { logger } from '@/utils/logger';

interface ErrorHandlerOptions {
  onError?: (error: ZephelError) => void;
  showToast?: boolean;
  logError?: boolean;
}

// Zephel-specific error messages with themed language
const ZEPHEL_ERROR_MESSAGES: Record<ZephelErrorCode, string> = {
  RATE_LIMIT_EXCEEDED: 'Processing capacity exceeded. Neural pathways cooling down. Please retry in 60 seconds.',
  AUTHENTICATION_FAILED: 'Sovereign credentials invalid. Check system administrator configuration.',
  SERVICE_UNAVAILABLE: 'External neural substrate temporarily offline. Retrying connection...',
  NETWORK_ERROR: 'Network connection disrupted. Check your connection and try again.',
  QUANTUM_PROCESSING_ERROR: 'Quantum processing error detected. Attempting to stabilize quantum field...',
  REALITY_RENDERING_ERROR: 'Reality rendering engine encountered an error. Restarting visualization...',
  GENERAL_ERROR: 'Communication link disrupted. Attempting to re-establish sovereign connection...',
  UNKNOWN_ERROR: 'Unknown anomaly detected in sovereign systems.',
};

export const useZephelErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const { toast } = useToast();
  const { onError, showToast = true, logError: shouldLogError = true } = options;

  const handleError = useCallback((error: unknown, context?: ZephelErrorContext) => {
    const zephelError = createZephelError(error, context);

    // Log error using unified logger
    if (shouldLogError) {
      logger.error(`ZEPHEL.${zephelError.code}`, zephelError);
    }

    // Show toast notification
    if (showToast) {
      toast({
        title: `ƷBI.${zephelError.code}`,
        description: zephelError.userMessage,
        variant: 'destructive',
        duration: zephelError.retryable ? 5000 : 8000,
      });
    }

    // Call custom error handler
    onError?.(zephelError);

    return zephelError;
  }, [toast, onError, showToast, shouldLogError]);

  return { handleError };
};

/**
 * Creates a ZephelError from any error type
 */
function createZephelError(error: unknown, context?: ZephelErrorContext): ZephelError {
  if (error instanceof Error) {
    const errorText = error.message.toLowerCase();
    const code = determineErrorCode(errorText);
    
    return {
      name: 'ZephelError',
      message: error.message,
      code,
      category: determineErrorCategory(errorText),
      retryable: determineIfRetryable(code),
      userMessage: ZEPHEL_ERROR_MESSAGES[code],
      context,
      stack: error.stack,
    };
  }

  return {
    name: 'ZephelError',
    message: 'Unknown error occurred',
    code: 'UNKNOWN_ERROR',
    category: 'processing',
    retryable: false,
    userMessage: ZEPHEL_ERROR_MESSAGES.UNKNOWN_ERROR,
    context,
  };
}

function determineErrorCode(errorText: string): ZephelErrorCode {
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

function determineIfRetryable(code: ZephelErrorCode): boolean {
  const retryableCodes: ZephelErrorCode[] = [
    'RATE_LIMIT_EXCEEDED',
    'SERVICE_UNAVAILABLE',
    'NETWORK_ERROR',
  ];
  return retryableCodes.includes(code);
}