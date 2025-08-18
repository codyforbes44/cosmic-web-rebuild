import React, { memo } from "react";

interface ResponsiveHeroContainerProps {
  visible: boolean;
  children: React.ReactNode;
  isMobile: boolean;
}

const ResponsiveHeroContainer = memo(({ visible, children, isMobile }: ResponsiveHeroContainerProps) => {
  const containerClasses = `
    container max-w-6xl mx-auto 
    px-3 sm:px-4 lg:px-6
    py-8 sm:py-12 md:py-16 lg:py-20 
    z-10 text-center md:text-left 
    transition-all duration-1000 transform 
    ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
  `;

  const gridClasses = `
    grid grid-cols-1 md:grid-cols-2 
    gap-6 sm:gap-8 md:gap-10 lg:gap-12 
    items-center
  `;

  return (
    <div className={containerClasses}>
      <div className={gridClasses}>
        {children}
      </div>
    </div>
  );
});

ResponsiveHeroContainer.displayName = 'ResponsiveHeroContainer';

export default ResponsiveHeroContainer;