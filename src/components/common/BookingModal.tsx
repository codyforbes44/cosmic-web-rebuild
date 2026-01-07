import React, { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={title}
      size="xl"
      isLoading={isLoading}
      loadingMessage="Loading booking calendar..."
      error={hasError ? "Unable to load the booking calendar." : null}
      onRetry={handleRetry}
      className={`p-0 overflow-hidden ${isMobile ? "h-[90vh]" : "h-[700px]"}`}
    >
      <div className="calendly-container h-full w-full flex-1 relative -mt-4">
        {/* Fallback button for errors */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
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
      </div>
    </BaseModal>
  );
};

export default BookingModal;
