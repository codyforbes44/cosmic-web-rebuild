
import React from "react";
import MobileUserMenu from "./MobileUserMenu";
import MobileNavItems from "./MobileNavItems";
import { useMobileMenu } from "@/hooks/use-mobile-menu";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-space-dark-blue/98 backdrop-blur-sm border-t border-white/10">
      <MobileUserMenu onClose={onClose} />
      <MobileNavItems onClose={onClose} />
    </div>
  );
};

export default MobileNavigation;
