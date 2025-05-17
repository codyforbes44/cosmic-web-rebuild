
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyModal = ({ isOpen, onClose }: CalendlyModalProps) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700 transition-colors"
          aria-label="Close calendar"
        >
          <X size={20} />
        </button>
        
        <iframe
          src="https://calendly.com/c-3bi/30min"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Schedule a meeting"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default CalendlyModal;
