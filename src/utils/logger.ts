/**
 * Structured logging utility
 * Provides consistent logging across the application
 * Automatically disabled in production for console.log/debug
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

const isDevelopment = import.meta.env.DEV;

const formatMessage = (level: LogLevel, message: string, context?: LogContext): string => {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
};

/**
 * Logger utility with structured logging support
 */
export const logger = {
  /**
   * Debug level logging - only in development
   */
  debug: (message: string, context?: LogContext): void => {
    if (isDevelopment) {
      console.log(formatMessage('debug', message, context));
    }
  },

  /**
   * Info level logging - only in development
   */
  info: (message: string, context?: LogContext): void => {
    if (isDevelopment) {
      console.info(formatMessage('info', message, context));
    }
  },

  /**
   * Warning level logging - always shown
   */
  warn: (message: string, context?: LogContext): void => {
    console.warn(formatMessage('warn', message, context));
  },

  /**
   * Error level logging - always shown
   */
  error: (message: string, error?: Error | unknown, context?: LogContext): void => {
    const errorContext = error instanceof Error 
      ? { ...context, errorMessage: error.message, stack: error.stack }
      : { ...context, error };
    console.error(formatMessage('error', message, errorContext));
  },

  /**
   * Performance timing utility
   */
  time: (label: string): void => {
    if (isDevelopment) {
      console.time(label);
    }
  },

  timeEnd: (label: string): void => {
    if (isDevelopment) {
      console.timeEnd(label);
    }
  },

  /**
   * Group logging for related messages
   */
  group: (label: string): void => {
    if (isDevelopment) {
      console.group(label);
    }
  },

  groupEnd: (): void => {
    if (isDevelopment) {
      console.groupEnd();
    }
  },

  /**
   * Table logging for structured data
   */
  table: (data: unknown): void => {
    if (isDevelopment) {
      console.table(data);
    }
  },
};

export default logger;
