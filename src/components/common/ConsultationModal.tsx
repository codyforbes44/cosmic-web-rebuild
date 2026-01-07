import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

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
                className="calendly-container h-full w-full flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
