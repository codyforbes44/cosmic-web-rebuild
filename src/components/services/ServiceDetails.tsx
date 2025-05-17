
import { Card, CardContent } from "@/components/ui/card";
import { ServiceType } from "@/types/services";
import { Rocket, CheckCircle, Clock, List } from "lucide-react";

interface ServiceDetailsProps {
  service: ServiceType;
}

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  return (
    <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl shadow-lg h-full">
      <CardContent className="p-6 md:p-8">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4 flex items-center" 
          style={{ color: service.color }}
        >
          <Rocket className="mr-3 h-7 w-7" style={{ color: service.color }} />
          {service.name}
        </h2>
        
        <div className="bg-gray-800/30 rounded-lg p-4 mb-6 border-l-4" style={{ borderColor: service.color }}>
          <p className="text-gray-200 text-lg italic">
            "{service.description}"
          </p>
        </div>
        
        {/* Key Benefit - Highlighted Value Proposition */}
        <Card 
          className="rounded-lg backdrop-blur-sm mb-8"
          style={{ backgroundColor: `${service.color}20` }}
        >
          <CardContent className="p-5">
            <h3 
              className="text-lg font-medium mb-2 flex items-center"
              style={{ color: service.color }}
            >
              <CheckCircle className="mr-2 h-5 w-5" style={{ color: service.color }} />
              Key Business Outcome
            </h3>
            <p className="text-gray-300">
              {service.key_benefit}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-gray-800/60 rounded-lg">
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-400 mb-1 flex items-center">
                <List className="h-4 w-4 mr-2" />
                Deliverables
              </h3>
              <p className="text-white font-medium">{service.deliverables}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/60 rounded-lg">
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-400 mb-1 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Typical Duration
              </h3>
              <p className="text-white font-medium">{service.duration}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Process Section */}
        <div>
          <h3 className="text-xl font-medium mb-4 text-white">Our Process</h3>
          <div className="bg-gray-800/60 rounded-lg p-4">
            <p className="text-gray-200">
              {service.process.split(', ').map((step, index, array) => (
                <span key={index} className="process-step">
                  <span className="font-medium" style={{ color: service.color }}>{step}</span>
                  {index < array.length - 1 && (
                    <span className="mx-2 text-gray-500">→</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceDetails;
