
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DemoRequestModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
}

const DemoRequestModal: React.FC<DemoRequestModalProps> = ({ 
  isOpen, 
  onOpenChange,
  productTitle
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile for responsive sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[800px] ${isMobile ? 'h-[90vh]' : 'h-[700px]'} p-0 overflow-hidden`}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl">Schedule a Demo of {productTitle}</DialogTitle>
        </DialogHeader>
        <div className="calendly-container h-full w-full">
          <iframe
            src="https://calendly.com/c-3bi/30min?hide_gdpr_banner=1"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a demo with 3BI"
            className="min-h-[580px]"
            style={{ 
              width: '100%', 
              height: isMobile ? 'calc(90vh - 60px)' : '640px',
              overflow: 'hidden'
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestModal;
