
import { ServiceType } from "@/types/services";
import ServiceCard from "./ServiceCard";
import ServiceDetails from "./ServiceDetails";
import ServiceCTA from "./ServiceCTA";
import ServiceSocialProof from "./ServiceSocialProof";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServicesViewProps {
  selectedService: ServiceType;
}

const ServicesView = ({ selectedService }: ServicesViewProps) => {
  return (
    <div className="space-y-12">
      {/* Main service content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <ServiceCard 
          image={selectedService.image}
          name={selectedService.name}
        />
        <ServiceDetails service={selectedService} />
      </div>
      
      {/* Social proof section */}
      <ServiceSocialProof serviceId={selectedService.id} />
      
      {/* Enhanced CTA section */}
      <ServiceCTA service={selectedService} />
      
      {/* Next steps - improve user journey */}
      <div className="mt-12 text-center">
        <h3 className="text-xl text-white mb-4">Ready to explore more options?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/get-quote">
            <Button className="bg-accent hover:bg-accent/80 text-white">
              Get a Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
              View Our Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesView;
