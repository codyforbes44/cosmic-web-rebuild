
import React from "react";

const CircuitBackground = () => {
  return (
    <>
      {/* Circuit board background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-space-dark-blue/60 to-space-deep-blue/70"
      />
    </>
  );
};

export default CircuitBackground;
