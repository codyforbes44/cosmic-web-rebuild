import React from "react";
import BookingModal from "@/components/common/BookingModal";

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
    <BookingModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Schedule a Call with ƷBI"
    />
  );
};

export default DemoRequestModal;
