import React from "react";

/**
 * CircuitBackground - Hero section background styling
 * 
 * NOTE: StarBackground is NOT rendered here to avoid duplication.
 * StarBackground is already rendered at the layout level (OptimizedHomeLayout, 
 * StandardPageLayout, etc.) and should not be duplicated in hero sections.
 */
const CircuitBackground = () => {
  return (
    <>
      {/* Background container for hero section */}
      <div 
        className="absolute inset-0 z-0 bg-space-deep-blue" 
        aria-hidden="true"
      >
        {/* Gradient overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-dark-blue/60 to-space-deep-blue/70" />
      </div>
    </>
  );
};

export default CircuitBackground;
