
import React from 'react';
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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl">Schedule a Demo of {productTitle}</DialogTitle>
        </DialogHeader>
        <div className="calendly-container h-full w-full">
          <iframe
            src="https://calendly.com/c-3bi/30min"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a demo with 3BI"
            className="min-h-[500px]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestModal;
