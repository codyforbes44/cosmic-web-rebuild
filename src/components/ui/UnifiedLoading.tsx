import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/hooks/use-accessibility';
import { Skeleton, SkeletonCard, SkeletonList, SkeletonText } from './skeleton';

/**
 * Loading state variant options
 * @typedef {'spinner' | 'dots' | 'pulse' | 'skeleton' | 'inline'} LoadingVariant
 */
type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'skeleton' | 'inline';

/**
 * Loading state size options
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} LoadingSize
 */
type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the UnifiedLoading component
 */
interface UnifiedLoadingProps {
  /** Visual variant of the loading indicator */
  variant?: LoadingVariant;
  /** Size of the loading indicator */
  size?: LoadingSize;
  /** Accessible message describing what is loading */
  message?: string;
  /** Whether to display the message visually */
  showMessage?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether to center in full screen */
  fullScreen?: boolean;
}

/**
 * UnifiedLoading - Single source of truth for all loading states in the application.
 * 
 * This component replaces all previous loading implementations (LoadingSpinner, 
 * EnhancedLoading, component-specific loading states) to ensure consistent UX.
 * 
 * @component
 * @example
 * // Basic spinner
 * <UnifiedLoading />
 * 
 * @example
 * // Full page loading
 * <UnifiedLoading variant="spinner" size="lg" fullScreen message="Loading page..." />
 * 
 * @example
 * // Inline loading for buttons
 * <UnifiedLoading variant="inline" size="sm" message="Saving..." />
 * 
 * @example
 * // Skeleton loading for content
 * <UnifiedLoading variant="skeleton" />
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

// Specialized skeleton components (consolidated from enhanced-loading.tsx)
export const WeatherSkeleton: React.FC = () => (
  <div className="space-y-6" role="status" aria-label="Loading weather data">
    <div className="text-center space-y-4">
      <Skeleton variant="heading" className="w-48 mx-auto" />
      <Skeleton className="h-24 w-24 rounded-full mx-auto" />
      <Skeleton variant="text" className="w-32 mx-auto" />
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2 p-4 rounded-lg border border-border/50">
          <Skeleton variant="text" className="w-16" />
          <Skeleton className="h-8 w-8" />
          <Skeleton variant="text" className="w-20" />
        </div>
      ))}
    </div>
    <span className="sr-only">Loading weather data</span>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6" role="status" aria-label="Loading dashboard">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 rounded-lg border border-border/50 space-y-2">
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="heading" className="w-16" />
          <Skeleton variant="text" className="w-20" />
        </div>
      ))}
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="p-6 rounded-lg border border-border/50 space-y-4">
        <Skeleton variant="heading" className="w-32" />
        <Skeleton className="h-64 w-full" />
      </div>
      <div className="p-6 rounded-lg border border-border/50 space-y-4">
        <Skeleton variant="heading" className="w-32" />
        <SkeletonList items={6} />
      </div>
    </div>
    <span className="sr-only">Loading dashboard</span>
  </div>
);

export const PortfolioSkeleton: React.FC = () => (
  <div className="space-y-8" role="status" aria-label="Loading portfolio">
    <div className="text-center space-y-4">
      <Skeleton variant="heading" className="w-64 mx-auto" />
      <SkeletonText lines={2} className="max-w-2xl mx-auto" />
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton variant="image" />
          <div className="space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
          <Skeleton variant="button" className="w-24" />
        </div>
      ))}
    </div>
    <span className="sr-only">Loading portfolio</span>
  </div>
);

export const CardLoading: React.FC<{ className?: string }> = ({ className }) => (
  <SkeletonCard className={className} />
);

export const ListLoading: React.FC<{ items?: number; className?: string }> = ({ 
  items = 5, 
  className 
}) => (
  <SkeletonList items={items} className={className} />
);

export default UnifiedLoading;
