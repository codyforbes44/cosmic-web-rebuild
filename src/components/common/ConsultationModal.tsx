import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ConsultationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
  isOpen, 
  onOpenChange, 
  title = "Schedule a Call with ƷBI" 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[800px] ${isMobile ? "h-[90vh]" : "h-[700px]"} p-0 overflow-hidden`}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="calendly-container h-full w-full">
          <iframe
            src="https://calendarpal.lovable.app/book/codyforbes"
            width="100%"
            height="100%"
            frameBorder="0"
            title={title}
            className="min-h-[580px]"
            style={{
              width: "100%",
              height: isMobile ? "calc(90vh - 60px)" : "640px",
              overflow: "hidden",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
