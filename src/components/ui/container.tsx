import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva(
  "mx-auto",
  {
    variants: {
      size: {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        full: "max-w-full",
        fluid: "w-full",
      },
      padding: {
        none: "",
        sm: "px-4",
        md: "px-4 sm:px-6",
        lg: "px-4 sm:px-6 lg:px-8",
        xl: "px-4 sm:px-6 lg:px-8 xl:px-12",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "lg",
    },
  }
)

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        none: "",
        sm: "py-8 md:py-12",
        md: "py-12 md:py-16",
        lg: "py-16 md:py-24",
        xl: "py-24 md:py-32",
      },
      background: {
        none: "",
        muted: "bg-muted/30",
        card: "bg-card",
        accent: "bg-accent/5",
        gradient: "bg-gradient-to-br from-background via-muted/20 to-background",
      },
    },
    defaultVariants: {
      spacing: "lg",
      background: "none",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "article" | "aside"
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ size, padding, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, spacing, background, as = "section", ...props }, ref) => {
    const Comp = as
    return (
      <Comp
        className={cn(sectionVariants({ spacing, background, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

export { Container, Section, containerVariants, sectionVariants }