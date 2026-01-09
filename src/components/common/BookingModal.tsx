import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Clock, Video, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
  const [copied, setCopied] = useState(false);

  const handleOpenBooking = () => {
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      toast({ title: "Link copied!", description: "Booking link copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const features = [
    { icon: Calendar, text: "Choose a convenient time slot" },
    { icon: Clock, text: "30-minute consultation" },
    { icon: Video, text: "Video call via your preferred platform" },
  ];

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={title}
      size="md"
    >
      <div className="flex flex-col items-center text-center space-y-6 py-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Calendar className="w-8 h-8 text-primary" />
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Book Your Free Consultation
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Let's discuss how we can help transform your business with AI-powered solutions.
          </p>
        </div>

        <div className="w-full space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-3 text-left px-4 py-2 rounded-lg bg-muted/50"
            >
              <feature.icon className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-foreground">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        <Button 
          onClick={handleOpenBooking} 
          size="lg" 
          className="w-full gap-2 mt-2"
        >
          <ExternalLink className="w-4 h-4" />
          Open Booking Calendar
        </Button>

        <Button 
          onClick={handleCopyLink} 
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Booking Link"}
        </Button>

        <p className="text-xs text-muted-foreground">
          Opens in a new tab for the best experience
        </p>
      </div>
    </BaseModal>
  );
};

export default BookingModal;
