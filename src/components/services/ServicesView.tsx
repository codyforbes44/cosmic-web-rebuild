
import { ServiceType } from "@/types/services";
import ServiceCard from "./ServiceCard";
import ServiceDetails from "./ServiceDetails";

interface ServicesViewProps {
  selectedService: ServiceType;
}

const ServicesView = ({ selectedService }: ServicesViewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
      <ServiceCard 
        image={selectedService.image}
        name={selectedService.name}
      />
      <ServiceDetails service={selectedService} />
    </div>
  );
};

export default ServicesView;
