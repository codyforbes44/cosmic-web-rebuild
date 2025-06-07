
import React from "react";

interface HeroContainerProps {
  visible: boolean;
  children: React.ReactNode;
}

const HeroContainer: React.FC<HeroContainerProps> = ({ visible, children }) => {
  return (
    <div className={`container max-w-6xl mx-auto px-4 py-12 md:py-20 z-10 text-center md:text-left transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {children}
      </div>
    </div>
  );
};

export default HeroContainer;
