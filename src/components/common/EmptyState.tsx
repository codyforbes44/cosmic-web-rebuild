import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost';
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * EmptyState component for displaying when no data is available
 * Provides consistent empty state styling across the application
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'h-8 w-8',
      title: 'text-base',
      description: 'text-sm',
    },
    md: {
      container: 'py-12',
      icon: 'h-12 w-12',
      title: 'text-lg',
      description: 'text-sm',
    },
    lg: {
      container: 'py-16',
      icon: 'h-16 w-16',
      title: 'text-xl',
      description: 'text-base',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        classes.container,
        className
      )}
    >
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className={cn('text-muted-foreground', classes.icon)} />
      </div>
      <h3 className={cn('font-semibold text-foreground mb-1', classes.title)}>
        {title}
      </h3>
      {description && (
        <p className={cn('text-muted-foreground mb-4 max-w-sm', classes.description)}>
          {description}
        </p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          variant={action.variant || 'default'}
          size={size === 'sm' ? 'sm' : 'default'}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
