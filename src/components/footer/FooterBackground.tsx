
import React from 'react';

interface FooterBackgroundProps {
  children: React.ReactNode;
}

const FooterBackground: React.FC<FooterBackgroundProps> = ({ children }) => {
  return (
    <footer className="relative bg-space-deep-blue pt-16 pb-8 border-t border-gray-800">
      {/* Opacity layer */}
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {children}
      </div>
    </footer>
  );
};

export default FooterBackground;
