
import React from 'react';

const ContactHeader = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" 
          alt="ƷBI Logo" 
          className="h-16 w-auto"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        Contact Us
      </h1>
      <p className="text-gray-300 text-lg">
        Have questions about our business services or want to discuss a project? We'd love to hear from you!
      </p>
    </div>
  );
};

export default ContactHeader;
