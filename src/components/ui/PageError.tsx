import React from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, WifiOff, Lock, Search } from 'lucide-react';
import { Button } from './button';
import { EnhancedCard } from './enhanced-card';
import { AppError, ErrorCategory, ErrorRecoveryAction } from '@/types/errors';
import { cn } from '@/lib/utils';

interface PageErrorProps {
  error?: AppError | Error | string | null;
  title?: string;
  description?: string;
  category?: ErrorCategory;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  showRetry?: boolean;
  onRetry?: () => void;
  onBack?: () => void;
  recoveryActions?: ErrorRecoveryAction[];
  className?: string;
  compact?: boolean;
}

const getCategoryIcon = (category: ErrorCategory) => {
  switch (category) {
    case 'network':
    case 'timeout':
      return WifiOff;
    case 'auth':
    case 'permission':
      return Lock;
    case 'notFound':
      return Search;
    default:
      return AlertTriangle;
  }
};

const getCategoryColor = (category: ErrorCategory) => {
  switch (category) {
    case 'auth':
    case 'permission':
      return 'text-amber-500 bg-amber-500/10';
    case 'notFound':
      return 'text-blue-500 bg-blue-500/10';
    case 'network':
    case 'timeout':
      return 'text-orange-500 bg-orange-500/10';
    default:
      return 'text-destructive bg-destructive/10';
  }
};

export const PageError: React.FC<PageErrorProps> = ({
  error,
  title,
  description,
  category = 'unknown',
  showHomeButton = true,
  showBackButton = true,
  showRetry = true,
  onRetry,
  onBack,
  recoveryActions = [],
  className,
  compact = false,
}) => {
  // Extract error details
  let errorTitle = title || 'Something went wrong';
  let errorDescription = description || 'An unexpected error occurred. Please try again.';
  let errorCategory = category;
  let isRetryable = true;

  if (error) {
    if (typeof error === 'string') {
      errorDescription = error;
    } else if ('userMessage' in error) {
      // AppError type
      const appError = error as AppError;
      errorDescription = appError.userMessage;
      errorCategory = appError.category;
      isRetryable = appError.retryable;
    } else if (error instanceof Error) {
      errorDescription = error.message;
    }
  }

  const Icon = getCategoryIcon(errorCategory);
  const colorClass = getCategoryColor(errorCategory);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleHome = () => {
    window.location.href = '/';
  };

  if (compact) {
    return (
      <div className={cn('flex flex-col items-center justify-center p-6 text-center', className)}>
        <div className={cn('rounded-full p-3 mb-4', colorClass)}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{errorTitle}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">{errorDescription}</p>
        <div className="flex gap-2">
          {showRetry && isRetryable && onRetry && (
            <Button size="sm" onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          )}
          {showBackButton && (
            <Button size="sm" variant="outline" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-[50vh] flex items-center justify-center p-4', className)}>
      <EnhancedCard variant="elevated" className="max-w-lg w-full">
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className={cn('rounded-full p-4', colorClass)}>
              <Icon className="h-12 w-12" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{errorTitle}</h1>
            <p className="text-muted-foreground">{errorDescription}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showRetry && isRetryable && onRetry && (
              <Button onClick={onRetry} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}

            {showBackButton && (
              <Button variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            )}

            {showHomeButton && (
              <Button variant="ghost" onClick={handleHome} className="gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>

          {recoveryActions.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Or try one of these options:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {recoveryActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'outline'}
                    size="sm"
                    onClick={action.action}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </EnhancedCard>
    </div>
  );
};

// Inline error component for forms and smaller sections
export const InlineError: React.FC<{
  message: string;
  onRetry?: () => void;
  className?: string;
}> = ({ message, onRetry, className }) => (
  <div className={cn(
    'flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm',
    className
  )}>
    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
    <span className="flex-1">{message}</span>
    {onRetry && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onRetry}
        className="h-auto py-1 px-2 text-destructive hover:text-destructive"
      >
        <RefreshCw className="h-3 w-3" />
      </Button>
    )}
  </div>
);

// Empty state with optional error handling
export const EmptyState: React.FC<{
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}> = ({ title, description, icon, action, className }) => (
  <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
    {icon && <div className="text-muted-foreground mb-4">{icon}</div>}
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    {description && (
      <p className="text-sm text-muted-foreground mb-4 max-w-md">{description}</p>
    )}
    {action && (
      <Button onClick={action.onClick}>{action.label}</Button>
    )}
  </div>
);
