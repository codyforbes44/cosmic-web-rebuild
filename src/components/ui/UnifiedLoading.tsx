import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/hooks/use-accessibility';

type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'skeleton' | 'inline';
type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface UnifiedLoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  message?: string;
  showMessage?: boolean;
  className?: string;
  fullScreen?: boolean;
}

/**
 * UnifiedLoading component - Single source of truth for all loading states
 * Replaces: LoadingSpinner, EnhancedLoading, and component-specific loading states
 */
const UnifiedLoading: React.FC<UnifiedLoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  message = 'Loading...',
  showMessage = true,
  className,
  fullScreen = false,
}) => {
  const { reducedMotion } = useAccessibility();

  const sizeClasses = {
    xs: { icon: 'h-3 w-3', text: 'text-xs', container: 'py-2' },
    sm: { icon: 'h-4 w-4', text: 'text-sm', container: 'py-4' },
    md: { icon: 'h-8 w-8', text: 'text-sm', container: 'py-8' },
    lg: { icon: 'h-12 w-12', text: 'text-base', container: 'py-12' },
    xl: { icon: 'h-16 w-16', text: 'text-lg', container: 'py-16' },
  };

  const classes = sizeClasses[size];

  const containerClasses = cn(
    'flex items-center justify-center',
    fullScreen && 'min-h-screen',
    !fullScreen && classes.container,
    className
  );

  // Spinner variant (default)
  if (variant === 'spinner') {
    return (
      <div className={containerClasses} role="status" aria-label={message}>
        <div className="flex flex-col items-center gap-3">
          <Loader2
            className={cn(
              'text-accent',
              classes.icon,
              !reducedMotion && 'animate-spin'
            )}
          />
          {showMessage && size !== 'xs' && (
            <p className={cn('text-muted-foreground', classes.text)}>{message}</p>
          )}
        </div>
        <span className="sr-only">{message}</span>
      </div>
    );
  }

  // Dots variant
  if (variant === 'dots') {
    return (
      <div className={containerClasses} role="status" aria-label={message}>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full bg-accent',
                size === 'xs' && 'h-1.5 w-1.5',
                size === 'sm' && 'h-2 w-2',
                size === 'md' && 'h-2.5 w-2.5',
                size === 'lg' && 'h-3 w-3',
                size === 'xl' && 'h-4 w-4',
                !reducedMotion && 'animate-bounce'
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <span className="sr-only">{message}</span>
      </div>
    );
  }

  // Pulse variant
  if (variant === 'pulse') {
    return (
      <div className={containerClasses} role="status" aria-label={message}>
        <div
          className={cn(
            'rounded-full bg-accent',
            classes.icon,
            !reducedMotion && 'animate-pulse'
          )}
        />
        <span className="sr-only">{message}</span>
      </div>
    );
  }

  // Inline variant (for inline text loading)
  if (variant === 'inline') {
    return (
      <span
        className={cn('inline-flex items-center gap-2', className)}
        role="status"
        aria-label={message}
      >
        <Loader2
          className={cn(
            'text-accent',
            size === 'xs' && 'h-3 w-3',
            size === 'sm' && 'h-4 w-4',
            size === 'md' && 'h-5 w-5',
            size === 'lg' && 'h-6 w-6',
            size === 'xl' && 'h-7 w-7',
            !reducedMotion && 'animate-spin'
          )}
        />
        {showMessage && <span className={classes.text}>{message}</span>}
      </span>
    );
  }

  // Skeleton variant
  return (
    <div className={containerClasses} role="status" aria-label={message}>
      <div className="w-full space-y-3">
        <div className={cn('h-4 bg-muted rounded animate-pulse', 'w-3/4')} />
        <div className={cn('h-4 bg-muted rounded animate-pulse', 'w-full')} />
        <div className={cn('h-4 bg-muted rounded animate-pulse', 'w-1/2')} />
      </div>
      <span className="sr-only">{message}</span>
    </div>
  );
};

// Convenience components for common use cases
export const PageLoading: React.FC<{ message?: string }> = ({ message }) => (
  <UnifiedLoading variant="spinner" size="lg" fullScreen message={message} />
);

export const SectionLoading: React.FC<{ message?: string }> = ({ message }) => (
  <UnifiedLoading variant="spinner" size="md" message={message} />
);

export const InlineLoading: React.FC<{ message?: string }> = ({ message }) => (
  <UnifiedLoading variant="inline" size="sm" message={message} />
);

export const ButtonLoading: React.FC = () => (
  <UnifiedLoading variant="spinner" size="xs" showMessage={false} />
);

export default UnifiedLoading;
