import React from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from './error-boundary';
import { PageError } from './PageError';

interface QueryErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
  compact?: boolean;
}

/**
 * A specialized error boundary for React Query operations.
 * Integrates with React Query's error reset mechanism for seamless retry functionality.
 */
export const QueryErrorBoundary: React.FC<QueryErrorBoundaryProps> = ({
  children,
  fallbackTitle = 'Failed to load data',
  fallbackDescription = 'There was a problem loading the data. Please try again.',
  compact = false,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onError={(error) => {
            console.error('QueryErrorBoundary caught:', error);
          }}
          fallback={
            <PageError
              title={fallbackTitle}
              description={fallbackDescription}
              category="api"
              onRetry={reset}
              showHomeButton={!compact}
              compact={compact}
            />
          }
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

/**
 * Higher-order component to wrap a component with QueryErrorBoundary
 */
export function withQueryErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<QueryErrorBoundaryProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <QueryErrorBoundary {...options}>
        <Component {...props} />
      </QueryErrorBoundary>
    );
  };
}
