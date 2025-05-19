import React from "react";

const CircuitBackground = () => {
  return (
    <>
      {/* Circuit board background */}
      <div 
        className="absolute inset-0 z-0 bg-space-deep-blue" 
        aria-hidden="true"
      >
        {/* We'll keep the background color but remove the image for a cleaner look */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-dark-blue via-space-dark-blue/90 to-space-deep-blue/80"></div>
      </div>
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-space-dark-blue/60 to-space-deep-blue/70"
      />
    </>
  );
};

export default CircuitBackground;
