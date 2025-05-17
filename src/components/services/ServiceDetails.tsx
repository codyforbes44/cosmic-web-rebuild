
import { Card, CardContent } from "@/components/ui/card";
import { ServiceType } from "@/types/services";

interface ServiceDetailsProps {
  service: ServiceType;
}

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  return (
    <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl shadow-lg h-full">
      <CardContent className="p-6 md:p-8">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4" 
          style={{ color: service.color }}
        >
          {service.name}
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          {service.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-gray-800/60 rounded-lg">
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-400 mb-1">Deliverables</h3>
              <p className="text-white font-medium">{service.deliverables}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/60 rounded-lg">
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-400 mb-1">Typical Duration</h3>
              <p className="text-white font-medium">{service.duration}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/60 rounded-lg col-span-1 md:col-span-2">
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-400 mb-1">Process</h3>
              <p className="text-white font-medium">{service.process}</p>
            </CardContent>
          </Card>
        </div>

        <Card 
          className="rounded-lg backdrop-blur-sm"
          style={{ backgroundColor: `${service.color}20` }}
        >
          <CardContent className="p-5">
            <h3 
              className="text-lg font-medium mb-2"
              style={{ color: service.color }}
            >
              Key Benefit
            </h3>
            <p className="text-gray-300">
              {service.key_benefit}
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ServiceDetails;
