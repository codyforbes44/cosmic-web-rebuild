import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva(
  "font-bold tracking-tight text-balance",
  {
    variants: {
      level: {
        1: "text-4xl md:text-5xl lg:text-6xl leading-tight",
        2: "text-3xl md:text-4xl lg:text-5xl leading-tight",
        3: "text-2xl md:text-3xl lg:text-4xl leading-snug",
        4: "text-xl md:text-2xl lg:text-3xl leading-snug",
        5: "text-lg md:text-xl lg:text-2xl leading-snug",
        6: "text-base md:text-lg lg:text-xl leading-normal",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-accent",
        gradient: "bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent",
        shimmer: "text-shimmer",
      },
    },
    defaultVariants: {
      level: 1,
      variant: "default",
    },
  }
)

const textVariants = cva(
  "text-balance",
  {
    variants: {
      size: {
        xs: "text-xs leading-normal",
        sm: "text-sm leading-normal",
        base: "text-base leading-relaxed",
        lg: "text-lg leading-relaxed",
        xl: "text-xl leading-relaxed",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-accent",
        success: "text-success",
        warning: "text-warning",
        destructive: "text-destructive",
        info: "text-info",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      size: "base",
      variant: "default",
      weight: "normal",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, variant, as, ...props }, ref) => {
    const Comp = as || `h${level || 1}`
    return (
      <Comp
        className={cn(headingVariants({ level, variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, variant, weight, as = "p", ...props }, ref) => {
    const Comp = as
    return (
      <Comp
        className={cn(textVariants({ size, variant, weight, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export { Heading, Text, headingVariants, textVariants }