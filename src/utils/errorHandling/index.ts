// Unified Error Handling System
// This module provides consistent error handling across the entire application

// Types
export * from '@/types/errors';

// Hooks
export { useUnifiedError } from '@/hooks/useUnifiedError';
export { useErrorReporting } from '@/components/ui/error-boundary';

// Components
export { ErrorBoundary, AsyncErrorBoundary } from '@/components/ui/error-boundary';
export { PageError, InlineError, EmptyState } from '@/components/ui/PageError';
export { QueryErrorBoundary, withQueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';

// Utility function to handle errors consistently
import { ERROR_MESSAGES, generateErrorId, AppError, ErrorCategory } from '@/types/errors';
import { logger } from '@/utils/logger';

/**
 * Creates a standardized AppError from any error type
 */
export const createAppError = (
  error: unknown,
  category: ErrorCategory = 'unknown',
  context?: Record<string, unknown>
): AppError => {
  let message = 'An unexpected error occurred';
  let stack: string | undefined;
  let originalError: Error | undefined;

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
    originalError = error;
  } else if (typeof error === 'string') {
    message = error;
  } else if (error && typeof error === 'object') {
    const errorObj = error as Record<string, unknown>;
    message = (errorObj.message as string) || JSON.stringify(error);
  }

  const code = determineErrorCode(category, message);
  const errorInfo = ERROR_MESSAGES[code] || ERROR_MESSAGES.UNKNOWN_ERROR;

  return {
    id: generateErrorId(),
    code,
    message,
    userMessage: errorInfo.description,
    category,
    severity: 'error',
    retryable: errorInfo.retryable,
    timestamp: new Date(),
    originalError,
    stack,
    context,
  };
};

/**
 * Determines error code based on category and message
 */
const determineErrorCode = (category: ErrorCategory, message: string): string => {
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
};

/**
 * Logs an error consistently across the application
 */
export const logError = (error: AppError | Error | string, context?: Record<string, unknown>): void => {
  if (typeof error === 'string') {
    logger.error(error, undefined, context);
  } else if ('code' in error) {
    logger.error(`[${error.code}] ${error.message}`, error.originalError, context);
  } else {
    logger.error(error.message, error, context);
  }
};

/**
 * Checks if an error is retryable
 */
export const isRetryableError = (error: AppError | Error | unknown): boolean => {
  if (error && typeof error === 'object' && 'retryable' in error) {
    return (error as AppError).retryable;
  }
  
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('503') ||
      message.includes('rate limit')
    );
  }
  
  return false;
};
