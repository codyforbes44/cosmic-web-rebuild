
import React from "react";

const CircuitBackground = () => {
  return (
    <>
      {/* Circuit board background using uploaded image */}
      <div 
        className="absolute inset-0 z-0 bg-space-deep-blue" 
        aria-hidden="true"
      >
        {/* Dark background with uploaded circuit pattern */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-space-dark-blue via-space-dark-blue/90 to-space-deep-blue/80"
          style={{
            backgroundImage: `url("/lovable-uploads/76a0c8d0-fb05-4aef-a663-fb02a66c9b02.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
          }}
        ></div>
        
        {/* Gradient overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-dark-blue/60 to-space-deep-blue/70" />
      </div>
    </>
  );
};

export default CircuitBackground;
