import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  fallbackElement?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  showLoadingState?: boolean;
}

/**
 * SafeImage component with error handling and fallback support
 * Provides consistent image error handling across the application
 */
const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  fallbackElement,
  className,
  containerClassName,
  showLoadingState = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // If we have an error and a fallback element, render it
  if (hasError && fallbackElement) {
    return <>{fallbackElement}</>;
  }

  return (
    <div className={cn('relative', containerClassName)}>
      {showLoadingState && isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={cn(
          isLoading && showLoadingState ? 'opacity-0' : 'opacity-100',
          'transition-opacity duration-200',
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default SafeImage;
