import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton, SkeletonCard, SkeletonList, SkeletonText } from "./skeleton";

interface EnhancedLoadingProps {
  variant?: "page" | "section" | "card" | "list" | "text";
  size?: "sm" | "md" | "lg";
  lines?: number;
  items?: number;
  className?: string;
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  variant = "page",
  size = "md",
  lines = 3,
  items = 5,
  className
}) => {
  const containerClasses = cn(
    "animate-fade-in",
    {
      "min-h-screen flex items-center justify-center": variant === "page",
      "py-8": variant === "section",
      "p-4": variant === "card",
      "space-y-4": variant === "list" || variant === "text",
    },
    className
  );

  if (variant === "page") {
    return (
      <div className={containerClasses}>
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <div className="space-y-2">
            <Skeleton variant="text" className="w-32 mx-auto" />
            <Skeleton variant="text" className="w-24 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className={containerClasses}>
        <div className="container mx-auto space-y-6">
          <Skeleton variant="heading" className="w-1/3" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return <SkeletonCard className={containerClasses} />;
  }

  if (variant === "list") {
    return <SkeletonList items={items} className={containerClasses} />;
  }

  if (variant === "text") {
    return <SkeletonText lines={lines} className={containerClasses} />;
  }

  return <Skeleton className={containerClasses} />;
};

// Specialized loading components for specific use cases
export const WeatherSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center space-y-4">
      <Skeleton variant="heading" className="w-48 mx-auto" />
      <Skeleton className="h-24 w-24 rounded-full mx-auto" />
      <Skeleton variant="text" className="w-32 mx-auto" />
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2 p-4 rounded-lg border">
          <Skeleton variant="text" className="w-16" />
          <Skeleton className="h-8 w-8" />
          <Skeleton variant="text" className="w-20" />
        </div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 rounded-lg border space-y-2">
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="heading" className="w-16" />
          <Skeleton variant="text" className="w-20" />
        </div>
      ))}
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="p-6 rounded-lg border space-y-4">
        <Skeleton variant="heading" className="w-32" />
        <Skeleton className="h-64 w-full" />
      </div>
      <div className="p-6 rounded-lg border space-y-4">
        <Skeleton variant="heading" className="w-32" />
        <SkeletonList items={6} />
      </div>
    </div>
  </div>
);

export const PortfolioSkeleton: React.FC = () => (
  <div className="space-y-8">
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
  </div>
);