import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { 
  AppError, 
  ErrorCategory, 
  ErrorSeverity, 
  ErrorDisplayOptions,
  ERROR_MESSAGES,
  generateErrorId 
} from '@/types/errors';

interface UseUnifiedErrorOptions {
  defaultShowToast?: boolean;
  defaultLogErrors?: boolean;
  onError?: (error: AppError) => void;
}

interface UseUnifiedErrorReturn {
  error: AppError | null;
  isError: boolean;
  handleError: (error: unknown, options?: ErrorDisplayOptions) => AppError;
  clearError: () => void;
  createError: (code: string, message?: string, context?: Record<string, unknown>) => AppError;
}

export const useUnifiedError = (options: UseUnifiedErrorOptions = {}): UseUnifiedErrorReturn => {
  const { toast } = useToast();
  const { 
    defaultShowToast = true, 
    defaultLogErrors = true,
    onError 
  } = options;

  const [error, setError] = useState<AppError | null>(null);

  const categorizeError = useCallback((errorMessage: string, statusCode?: number): ErrorCategory => {
    const message = errorMessage.toLowerCase();
    
    if (statusCode === 401 || message.includes('auth') || message.includes('unauthorized')) {
      return 'auth';
    }
    if (statusCode === 403 || message.includes('permission') || message.includes('forbidden')) {
      return 'permission';
    }
    if (statusCode === 404 || message.includes('not found')) {
      return 'notFound';
    }
    if (statusCode === 429 || message.includes('rate limit') || message.includes('too many')) {
      return 'api';
    }
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return 'network';
    }
    if (message.includes('timeout') || message.includes('timed out')) {
      return 'timeout';
    }
    if (message.includes('validation') || message.includes('invalid')) {
      return 'validation';
    }
    if (message.includes('database') || message.includes('supabase') || message.includes('postgres')) {
      return 'database';
    }
    
    return 'unknown';
  }, []);

  const determineErrorCode = useCallback((category: ErrorCategory, message: string): string => {
    const msg = message.toLowerCase();
    
    switch (category) {
      case 'auth':
        if (msg.includes('expired')) return 'AUTH_SESSION_EXPIRED';
        if (msg.includes('credentials') || msg.includes('password')) return 'AUTH_INVALID_CREDENTIALS';
        return 'AUTH_UNAUTHORIZED';
      case 'permission':
        return 'PERMISSION_DENIED';
      case 'notFound':
        return 'NOT_FOUND';
      case 'network':
        return 'NETWORK_ERROR';
      case 'timeout':
        return 'TIMEOUT';
      case 'validation':
        return 'VALIDATION_ERROR';
      case 'database':
        return 'DATABASE_ERROR';
      case 'api':
        if (msg.includes('rate limit') || msg.includes('429')) return 'RATE_LIMIT';
        if (msg.includes('unavailable') || msg.includes('503')) return 'SERVICE_UNAVAILABLE';
        return 'API_ERROR';
      default:
        return 'UNKNOWN_ERROR';
    }
  }, []);

  const determineSeverity = useCallback((category: ErrorCategory): ErrorSeverity => {
    switch (category) {
      case 'validation':
        return 'warning';
      case 'notFound':
        return 'info';
      case 'auth':
      case 'permission':
        return 'error';
      case 'network':
      case 'timeout':
      case 'database':
      case 'api':
        return 'error';
      default:
        return 'error';
    }
  }, []);

  const createError = useCallback((
    code: string, 
    message?: string, 
    context?: Record<string, unknown>
  ): AppError => {
    const errorInfo = ERROR_MESSAGES[code] || ERROR_MESSAGES.UNKNOWN_ERROR;
    
    return {
      id: generateErrorId(),
      code,
      message: message || errorInfo.description,
      userMessage: errorInfo.description,
      category: 'unknown',
      severity: 'error',
      retryable: errorInfo.retryable,
      timestamp: new Date(),
      context,
    };
  }, []);

  const handleError = useCallback((
    rawError: unknown, 
    displayOptions: ErrorDisplayOptions = {}
  ): AppError => {
    const { showToast = defaultShowToast, duration = 5000, action } = displayOptions;
    
    let message = 'An unexpected error occurred';
    let stack: string | undefined;
    let originalError: Error | undefined;
    let statusCode: number | undefined;

    // Extract error information
    if (rawError instanceof Error) {
      message = rawError.message;
      stack = rawError.stack;
      originalError = rawError;
    } else if (typeof rawError === 'string') {
      message = rawError;
    } else if (rawError && typeof rawError === 'object') {
      const errorObj = rawError as Record<string, unknown>;
      message = (errorObj.message as string) || 
                (errorObj.error as string) || 
                JSON.stringify(rawError);
      statusCode = errorObj.status as number || errorObj.statusCode as number;
    }

    // Categorize and determine error properties
    const category = categorizeError(message, statusCode);
    const code = determineErrorCode(category, message);
    const severity = determineSeverity(category);
    const errorInfo = ERROR_MESSAGES[code] || ERROR_MESSAGES.UNKNOWN_ERROR;

    const appError: AppError = {
      id: generateErrorId(),
      code,
      message,
      userMessage: errorInfo.description,
      category,
      severity,
      retryable: errorInfo.retryable,
      timestamp: new Date(),
      originalError,
      stack,
    };

    // Update state
    setError(appError);

    // Log error
    if (defaultLogErrors) {
      logger.error(`[${appError.code}] ${appError.message}`, appError.originalError);
    }

    // Show toast notification
    if (showToast) {
      toast({
        title: errorInfo.title,
        description: errorInfo.description,
        variant: severity === 'info' ? 'default' : 'destructive',
        duration: appError.retryable ? duration : duration + 3000,
        action: action ? (
          <button 
            onClick={action.onClick}
            className="text-sm font-medium underline"
          >
            {action.label}
          </button>
        ) : undefined,
      });
    }

    // Call custom error handler
    onError?.(appError);

    return appError;
  }, [
    toast, 
    defaultShowToast, 
    defaultLogErrors, 
    onError, 
    categorizeError, 
    determineErrorCode, 
    determineSeverity
  ]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    isError: error !== null,
    handleError,
    clearError,
    createError,
  };
};
