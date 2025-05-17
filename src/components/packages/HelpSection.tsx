
import React from "react";
import { Button } from "@/components/ui/button";

const HelpSection: React.FC = () => {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold mb-8 text-white">Need Help Choosing?</h2>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
        We understand that each business has unique needs. Let our experts help you choose the right package for your specific requirements.
      </p>
      <Button 
        className="bg-brand-gold hover:bg-brand-gold/80 text-white"
        onClick={() => window.location.href="/contact?subject=Package%20Consultation"}
      >
        Schedule a Consultation
      </Button>
    </div>
  );
};

export default HelpSection;
