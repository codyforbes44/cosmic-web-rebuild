import React from "react";
import StarBackground from "../StarBackground";

const CircuitBackground = () => {
  return (
    <>
      {/* Star background for hero section */}
      <div 
        className="absolute inset-0 z-0 bg-space-deep-blue" 
        aria-hidden="true"
      >
        {/* Animated star canvas background */}
        <StarBackground />
        
        {/* Gradient overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-dark-blue/60 to-space-deep-blue/70" />
      </div>
    </>
  );
};

export default CircuitBackground;
