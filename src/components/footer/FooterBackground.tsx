
import React from 'react';

interface FooterBackgroundProps {
  children: React.ReactNode;
}

const FooterBackground: React.FC<FooterBackgroundProps> = ({ children }) => {
  return (
    <footer className="relative bg-muted/50 pt-12 md:pt-16 pb-6 md:pb-8 border-t border-border">
      {/* Opacity layer */}
      <div className="absolute inset-0 bg-background/40 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {children}
      </div>
    </footer>
  );
};

export default FooterBackground;
