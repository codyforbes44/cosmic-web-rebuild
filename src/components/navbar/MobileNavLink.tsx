
import React from 'react';

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children, onClick }) => {
  return (
    <a
      href={to}
      onClick={onClick}
      className="block text-white hover:text-orange-500 py-2 px-4"
    >
      {children}
    </a>
  );
};

export default MobileNavLink;
