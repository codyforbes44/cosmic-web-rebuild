
import React from "react";
import { MobileMenu } from "./MobileMenu";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  return <MobileMenu isOpen={isOpen} onClose={onClose} />;
};

export default MobileNavigation;
