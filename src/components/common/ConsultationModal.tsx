import React from "react";
import BookingModal, { BookingModalProps } from "./BookingModal";

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
  return (
    <BookingModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={title}
    />
  );
};

export default ConsultationModal;
