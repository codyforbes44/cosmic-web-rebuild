import React from 'react';
import StarBackground from '@/components/StarBackground';

interface ZephelPageLayoutProps {
  children: React.ReactNode;
}

export const ZephelPageLayout: React.FC<ZephelPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative bg-space-dark-blue">
      <StarBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};