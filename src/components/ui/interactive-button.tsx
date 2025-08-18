import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const interactiveButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:-translate-y-0.5",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:border-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent transition-colors",
        gradient: "bg-gradient-to-r from-accent to-accent-hover text-accent-foreground hover:from-accent-hover hover:to-accent hover:shadow-lg hover:-translate-y-0.5",
        glow: "bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "hover:animate-pulse",
        bounce: "hover:animate-bounce",
        wiggle: "hover:animate-[wiggle_0.5s_ease-in-out]",
        scale: "hover:scale-105 active:scale-95",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

export interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof interactiveButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ className, variant, size, animation, asChild = false, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(interactiveButtonVariants({ variant, size, animation, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        )}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    );
  }
);
InteractiveButton.displayName = "InteractiveButton";

// Specialized button components
export const CallToActionButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ children, ...props }, ref) => (
    <InteractiveButton
      ref={ref}
      variant="gradient"
      size="lg"
      animation="scale"
      className="font-semibold"
      {...props}
    >
      {children}
    </InteractiveButton>
  )
);
CallToActionButton.displayName = "CallToActionButton";

export const GlowButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ children, ...props }, ref) => (
    <InteractiveButton
      ref={ref}
      variant="glow"
      animation="scale"
      {...props}
    >
      {children}
    </InteractiveButton>
  )
);
GlowButton.displayName = "GlowButton";

export { InteractiveButton, interactiveButtonVariants };