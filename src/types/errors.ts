// Unified error types for consistent error handling across the application

export type ErrorCategory = 
  | 'network'
  | 'auth'
  | 'validation'
  | 'api'
  | 'database'
  | 'permission'
  | 'notFound'
  | 'timeout'
  | 'unknown';

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface AppError {
  id: string;
  code: string;
  message: string;
  userMessage: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  retryable: boolean;
  timestamp: Date;
  context?: Record<string, unknown>;
  originalError?: Error;
  stack?: string;
}

export interface ErrorDisplayOptions {
  showToast?: boolean;
  showInline?: boolean;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ErrorRecoveryAction {
  label: string;
  action: () => void | Promise<void>;
  variant?: 'default' | 'outline' | 'ghost';
}

// Error code mappings for user-friendly messages
export const ERROR_MESSAGES: Record<string, { title: string; description: string; retryable: boolean }> = {
  // Network errors
  NETWORK_ERROR: {
    title: 'Connection Error',
    description: 'Unable to connect to the server. Please check your internet connection.',
    retryable: true,
  },
  TIMEOUT: {
    title: 'Request Timeout',
    description: 'The request took too long to complete. Please try again.',
    retryable: true,
  },
  
  // Authentication errors
  AUTH_INVALID_CREDENTIALS: {
    title: 'Invalid Credentials',
    description: 'The email or password you entered is incorrect.',
    retryable: false,
  },
  AUTH_SESSION_EXPIRED: {
    title: 'Session Expired',
    description: 'Your session has expired. Please sign in again.',
    retryable: false,
  },
  AUTH_UNAUTHORIZED: {
    title: 'Unauthorized',
    description: 'You need to sign in to access this resource.',
    retryable: false,
  },
  
  // Permission errors
  PERMISSION_DENIED: {
    title: 'Access Denied',
    description: 'You do not have permission to perform this action.',
    retryable: false,
  },
  
  // API errors
  API_ERROR: {
    title: 'Service Error',
    description: 'An error occurred while processing your request.',
    retryable: true,
  },
  RATE_LIMIT: {
    title: 'Too Many Requests',
    description: 'You have made too many requests. Please wait a moment and try again.',
    retryable: true,
  },
  SERVICE_UNAVAILABLE: {
    title: 'Service Unavailable',
    description: 'The service is temporarily unavailable. Please try again later.',
    retryable: true,
  },
  
  // Validation errors
  VALIDATION_ERROR: {
    title: 'Validation Error',
    description: 'Please check your input and try again.',
    retryable: false,
  },
  
  // Database errors
  DATABASE_ERROR: {
    title: 'Database Error',
    description: 'An error occurred while accessing the database.',
    retryable: true,
  },
  
  // Not found errors
  NOT_FOUND: {
    title: 'Not Found',
    description: 'The requested resource could not be found.',
    retryable: false,
  },
  
  // Default
  UNKNOWN_ERROR: {
    title: 'Unexpected Error',
    description: 'An unexpected error occurred. Please try again.',
    retryable: true,
  },
};

// Helper to generate unique error IDs
export const generateErrorId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
