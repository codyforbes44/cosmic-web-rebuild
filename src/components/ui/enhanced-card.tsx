import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const enhancedCardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-lg hover:shadow-xl",
        interactive: "hover:shadow-md hover:-translate-y-1 cursor-pointer",
        glass: "bg-white/10 backdrop-blur-md border-white/20",
        gradient: "bg-gradient-to-br from-card to-card/80",
        glow: "shadow-[0_0_20px_rgba(234,88,12,0.1)] hover:shadow-[0_0_30px_rgba(234,88,12,0.2)]",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface EnhancedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof enhancedCardVariants> {
  loading?: boolean;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        enhancedCardVariants({ variant, size }),
        loading && "animate-pulse",
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      ) : (
        children
      )}
    </div>
  )
);
EnhancedCard.displayName = "EnhancedCard";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Specialized card components
export const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}> = ({ title, description, icon, className, children }) => (
  <EnhancedCard variant="interactive" className={className}>
    <CardHeader>
      {icon && <div className="mb-2 text-accent">{icon}</div>}
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
  </EnhancedCard>
);

export const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}> = ({ title, value, subtitle, icon, trend, className }) => (
  <EnhancedCard variant="elevated" className={className}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && (
            <p className={cn(
              "text-xs",
              trend === "up" && "text-green-600",
              trend === "down" && "text-red-600",
              trend === "neutral" && "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
    </CardContent>
  </EnhancedCard>
);

export { 
  EnhancedCard, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  enhancedCardVariants
};