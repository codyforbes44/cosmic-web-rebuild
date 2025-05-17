
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const FAQHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
        Frequently Asked Questions
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
        Find answers to common questions about our services, process, and technology solutions.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Button 
          onClick={() => navigate('/get-quote')}
          className="bg-accent hover:bg-accent/80 text-white"
        >
          Get a Free Consultation
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/contact')}
          className="border-accent text-accent hover:bg-accent hover:text-white"
        >
          Contact Support Team
        </Button>
      </div>
    </div>
  );
};

export default FAQHeader;
