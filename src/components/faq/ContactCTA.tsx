
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScheduleButton from "@/components/calendly/ScheduleButton";

const ContactCTA: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-space-purple/20 to-accent/20 border border-accent/20">
      <CardContent className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Still have questions?</h2>
          <p className="text-gray-300 mb-2">
            Our team is ready to help answer any questions you might have about our services.
          </p>
          <p className="text-accent mb-6 italic">
            "ƷBI team responded to my query within hours and provided exactly the guidance I needed." — Maria L., CTO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-accent hover:bg-accent/80 text-white"
            >
              Contact Us
            </Button>
            <ScheduleButton 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-white"
            >
              Get a Free Consultation
            </ScheduleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCTA;
