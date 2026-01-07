import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Animation variants for consistent motion
export const modalAnimations = {
  container: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  header: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.1, duration: 0.2 },
  },
  content: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.15, duration: 0.3 },
  },
};

// Size presets for common modal sizes
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeClasses: Record<ModalSize, string> = {
  sm: "sm:max-w-[400px]",
  md: "sm:max-w-[500px]",
  lg: "sm:max-w-[700px]",
  xl: "sm:max-w-[900px]",
  full: "sm:max-w-[95vw] sm:h-[90vh]",
};

export interface BaseModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal title */
  title?: string;
  /** Optional description below the title */
  description?: string;
  /** Modal content */
  children?: ReactNode;
  /** Loading state - shows spinner overlay */
  isLoading?: boolean;
  /** Custom loading message */
  loadingMessage?: string;
  /** Error state - shows error overlay with retry option */
  error?: string | null;
  /** Callback when retry button is clicked */
  onRetry?: () => void;
  /** Modal size preset */
  size?: ModalSize;
  /** Custom className for DialogContent */
  className?: string;
  /** Whether to show the header */
  showHeader?: boolean;
  /** Footer content */
  footer?: ReactNode;
  /** Whether to enable animations */
  animated?: boolean;
  /** Custom header content (replaces title/description) */
  headerContent?: ReactNode;
  /** Whether content should be scrollable */
  scrollable?: boolean;
}

/**
 * BaseModal - A unified modal component with built-in loading states,
 * error handling, and consistent animations.
 *
 * Usage:
 * ```tsx
 * <BaseModal
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="My Modal"
 *   isLoading={isLoading}
 *   error={error}
 *   onRetry={handleRetry}
 * >
 *   <p>Modal content goes here</p>
 * </BaseModal>
 * ```
 */
const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  isLoading = false,
  loadingMessage = "Loading...",
  error = null,
  onRetry,
  size = "md",
  className,
  showHeader = true,
  footer,
  animated = true,
  headerContent,
  scrollable = false,
}) => {
  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: modalAnimations.container.initial,
        animate: modalAnimations.container.animate,
        exit: modalAnimations.container.exit,
        transition: modalAnimations.container.transition,
      }
    : {};

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          sizeClasses[size],
          scrollable && "max-h-[90vh] overflow-hidden flex flex-col",
          className
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <Wrapper
              {...wrapperProps}
              className={cn(
                "h-full w-full flex flex-col",
                scrollable && "overflow-hidden"
              )}
            >
              {/* Header */}
              {showHeader && (headerContent || title) && (
                <DialogHeader className="flex-shrink-0">
                  {headerContent || (
                    <>
                      {animated ? (
                        <motion.div
                          initial={modalAnimations.header.initial}
                          animate={modalAnimations.header.animate}
                          transition={modalAnimations.header.transition}
                        >
                          {title && (
                            <DialogTitle className="text-xl">{title}</DialogTitle>
                          )}
                          {description && (
                            <DialogDescription>{description}</DialogDescription>
                          )}
                        </motion.div>
                      ) : (
                        <>
                          {title && (
                            <DialogTitle className="text-xl">{title}</DialogTitle>
                          )}
                          {description && (
                            <DialogDescription>{description}</DialogDescription>
                          )}
                        </>
                      )}
                    </>
                  )}
                </DialogHeader>
              )}

              {/* Content Area with Loading/Error States */}
              <div
                className={cn(
                  "relative flex-1",
                  scrollable && "overflow-y-auto",
                  showHeader && "mt-4"
                )}
              >
                {/* Loading Overlay */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 z-10 rounded-md"
                    >
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                      <p className="text-sm text-muted-foreground">{loadingMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Overlay */}
                <AnimatePresence>
                  {error && !isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 z-10 p-6 text-center rounded-md"
                    >
                      <AlertCircle className="h-10 w-10 text-destructive mb-3" />
                      <p className="text-foreground font-medium mb-2">
                        Something went wrong
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                        {error}
                      </p>
                      {onRetry && (
                        <Button onClick={onRetry} variant="outline" className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Try again
                        </Button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Content */}
                {animated ? (
                  <motion.div
                    initial={modalAnimations.content.initial}
                    animate={modalAnimations.content.animate}
                    transition={modalAnimations.content.transition}
                    className="h-full"
                  >
                    {children}
                  </motion.div>
                ) : (
                  <div className="h-full">{children}</div>
                )}
              </div>

              {/* Footer */}
              {footer && (
                <DialogFooter className="flex-shrink-0 mt-4">{footer}</DialogFooter>
              )}
            </Wrapper>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;

// ============================================
// Pre-built Modal Variants for Common Use Cases
// ============================================

interface ConfirmModalProps extends Omit<BaseModalProps, "children" | "footer"> {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "default" | "destructive";
  isConfirming?: boolean;
}

/**
 * ConfirmModal - A confirmation dialog with confirm/cancel buttons
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  isConfirming = false,
  onOpenChange,
  ...props
}) => {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <BaseModal
      {...props}
      onOpenChange={onOpenChange}
      size="sm"
      footer={
        <div className="flex gap-3 w-full justify-end">
          <Button variant="outline" onClick={handleCancel} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      }
    >
      <p className="text-muted-foreground">{message}</p>
    </BaseModal>
  );
};

interface FormModalProps extends BaseModalProps {
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
}

/**
 * FormModal - A modal optimized for forms with submit/cancel buttons
 */
export const FormModal: React.FC<FormModalProps> = ({
  children,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isSubmitting = false,
  submitDisabled = false,
  onOpenChange,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      onOpenChange={onOpenChange}
      footer={
        <div className="flex gap-3 w-full justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting || submitDisabled}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      }
    >
      {children}
    </BaseModal>
  );
};
