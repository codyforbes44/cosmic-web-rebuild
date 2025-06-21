
import React from 'react';

interface DesktopNavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const DesktopNavLink: React.FC<DesktopNavLinkProps> = ({ to, isActive, children, onClick }) => {
  return (
    <a
      href={to}
      onClick={onClick}
      className={`text-white hover:text-orange-500 transition-colors px-3 py-2 ${
        isActive ? 'text-orange-500' : ''
      }`}
    >
      {children}
    </a>
  );
};

export default DesktopNavLink;
