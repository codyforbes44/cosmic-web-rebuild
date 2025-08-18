import React from "react";
import { cn } from "@/lib/utils";
import { useAccessibility } from "@/hooks/use-accessibility";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "dots" | "pulse" | "minimal";
  className?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  variant = "default",
  className,
  message = "Loading..."
}) => {
  const { reducedMotion } = useAccessibility();

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12", 
    xl: "h-16 w-16"
  };

  const containerPadding = {
    sm: "py-4",
    md: "py-8 sm:py-12",
    lg: "py-12 sm:py-16 md:py-20",
    xl: "py-16 sm:py-20 md:py-24"
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center", containerPadding[size], className)}>
        <div className="flex space-x-1" role="status" aria-label={message}>
          <div className={cn("rounded-full bg-accent", sizeClasses.sm, !reducedMotion && "animate-bounce")} style={{ animationDelay: "0ms" }}></div>
          <div className={cn("rounded-full bg-accent", sizeClasses.sm, !reducedMotion && "animate-bounce")} style={{ animationDelay: "150ms" }}></div>
          <div className={cn("rounded-full bg-accent", sizeClasses.sm, !reducedMotion && "animate-bounce")} style={{ animationDelay: "300ms" }}></div>
          <span className="sr-only">{message}</span>
        </div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", containerPadding[size], className)}>
        <div 
          className={cn("rounded-full bg-accent", sizeClasses[size], !reducedMotion && "animate-pulse")}
          role="status"
          aria-label={message}
        >
          <span className="sr-only">{message}</span>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center", containerPadding[size], className)}>
        <div className="text-center space-y-2">
          <div 
            className={cn("border-b-2 border-accent rounded-full", sizeClasses[size], !reducedMotion && "animate-spin")}
            role="status"
            aria-label={message}
          ></div>
          <span className="sr-only">{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", containerPadding[size], className)}>
      <div className="text-center space-y-4">
        <div 
          className={cn("border-b-2 border-accent rounded-full", sizeClasses[size], !reducedMotion && "animate-spin")}
          role="status"
          aria-label={message}
        ></div>
        {size !== "sm" && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
        <span className="sr-only">{message}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;