
import React from "react";
import { MobileMenuContent } from "./MobileMenuContent";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-space-dark-blue border-t border-gray-700">
      <MobileMenuContent onClose={onClose} />
    </div>
  );
};
