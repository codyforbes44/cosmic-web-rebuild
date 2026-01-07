
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollToTopLink from "@/components/ScrollToTopLink";
import ServicePageLayout from "@/layouts/ServicePageLayout";
import { aiService } from "@/data/services/aiService";
import ConsultationModal from "@/components/common/ConsultationModal";

const AISolutions: React.FC = () => {
  const service = aiService;
  const [modalOpen, setModalOpen] = useState(false);
  
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
      <Button 
        variant="outline" 
        size="lg"
        onClick={() => setModalOpen(true)}
      >
        Schedule Demo
      </Button>
      <ConsultationModal isOpen={modalOpen} onOpenChange={setModalOpen} title="Schedule AI Demo" />
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
