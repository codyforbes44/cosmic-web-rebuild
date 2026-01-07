import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  bookingUrl?: string;
}

const DEFAULT_BOOKING_URL = "https://calendarpal.lovable.app/book/codyforbes";

const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onOpenChange, 
  title = "Schedule a Call with ƷBI",
  bookingUrl = DEFAULT_BOOKING_URL
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleOpenInNewTab = () => {
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[800px] ${isMobile ? "h-[90vh]" : "h-[700px]"} p-0 overflow-hidden`}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full w-full flex flex-col"
            >
              <DialogHeader className="p-6 pb-0">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <DialogTitle className="text-xl">{title}</DialogTitle>
                </motion.div>
              </DialogHeader>
              <motion.div 
                className="calendly-container h-full w-full flex-1 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                    <p className="text-sm text-muted-foreground">Loading booking calendar...</p>
                  </div>
                )}
                
                {hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10 p-6 text-center">
                    <p className="text-muted-foreground mb-4">Unable to load the booking calendar.</p>
                    <Button onClick={handleOpenInNewTab} className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Open in new tab
                    </Button>
                  </div>
                )}
                
                <iframe
                  src={bookingUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title={title}
                  className="min-h-[580px]"
                  onLoad={handleIframeLoad}
                  onError={() => setHasError(true)}
                  style={{
                    width: "100%",
                    height: isMobile ? "calc(90vh - 60px)" : "640px",
                    overflow: "hidden",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
