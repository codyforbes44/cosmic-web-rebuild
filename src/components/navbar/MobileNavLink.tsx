
import React from 'react';
import ScrollToTopLink from '../ScrollToTopLink';

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children, onClick }) => {
  return (
    <ScrollToTopLink
      to={to}
      onClick={onClick}
      className="block text-white hover:text-orange-500 py-2 px-4"
    >
      {children}
    </ScrollToTopLink>
  );
};

export default MobileNavLink;
