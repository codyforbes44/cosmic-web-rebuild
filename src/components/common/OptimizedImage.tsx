import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the OptimizedImage component
 */
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility (required) */
  alt: string;
  /** Fallback image to show on error */
  fallbackSrc?: string;
  /** CSS classes for the image element */
  className?: string;
  /** CSS classes for the container div */
  containerClassName?: string;
  /** Enable lazy loading with Intersection Observer */
  lazy?: boolean;
  /** Aspect ratio preset for consistent sizing */
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait' | 'auto';
  /** Mark as high priority for LCP optimization */
  priority?: boolean;
  /** Callback when image finishes loading */
  onLoadComplete?: () => void;
}

/**
 * OptimizedImage - Performance-optimized image component with lazy loading.
 * 
 * Features:
 * - Lazy loading with Intersection Observer (loads images only when in viewport)
 * - Automatic fallback handling for broken images
 * - Loading skeleton animation
 * - Aspect ratio presets for consistent layouts
 * - Priority loading option for above-the-fold images (LCP optimization)
 * - Accessible with proper alt text handling
 * 
 * @component
 * @example
 * // Basic usage with lazy loading
 * <OptimizedImage 
 *   src="/images/hero.jpg" 
 *   alt="Hero banner" 
 * />
 * 
 * @example
 * // Priority loading for hero images (disables lazy loading)
 * <OptimizedImage 
 *   src="/images/hero.jpg" 
 *   alt="Hero banner"
 *   priority
 *   aspectRatio="video"
 * />
 * 
 * @example
 * // With custom fallback and aspect ratio
 * <OptimizedImage 
 *   src={user.avatar} 
 *   alt={`${user.name}'s avatar`}
 *   fallbackSrc="/default-avatar.png"
 *   aspectRatio="square"
 *   className="rounded-full"
 * />
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  className,
  containerClassName,
  lazy = true,
  aspectRatio = 'auto',
  priority = false,
  onLoadComplete,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy || priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Increased for earlier loading
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [lazy, priority]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse" 
          aria-hidden="true"
        />
      )}
      
      {/* Image */}
      {isInView && (
        <img
          src={hasError ? fallbackSrc : src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
