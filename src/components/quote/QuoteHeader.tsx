
import React from 'react';

const QuoteHeader = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-14">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" 
          alt="ƷBI Logo" 
          className="h-16 w-auto"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        Get a Personalized Quote
      </h1>
      <p className="text-gray-300 text-lg">
        Tell us about your project or business needs, and we'll provide you with a tailored 
        proposal and pricing estimate that fits your requirements.
      </p>
    </div>
  );
};

export default QuoteHeader;
