
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollToTopLink from "@/components/ScrollToTopLink";
import ServicePageLayout from "@/layouts/ServicePageLayout";
import { aiService } from "@/data/services/aiService";

const AISolutions: React.FC = () => {
  const service = aiService;
  
  const heroButtons = (
    <>
      <ScrollToTopLink to="/get-quote">
        <Button 
          size="lg"
          style={{ backgroundColor: service.color }}
          className="text-white hover:opacity-90"
        >
          Explore AI Solutions <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </ScrollToTopLink>
      <ScrollToTopLink to="/contact">
        <Button variant="outline" size="lg">
          Schedule Demo
        </Button>
      </ScrollToTopLink>
    </>
  );
  
  return (
    <ServicePageLayout 
      service={service}
      heroButtons={heroButtons}
      showFeatures={true}
      showCaseStudy={true}
      showCTA={true}
    />
  );
};

export default AISolutions;
