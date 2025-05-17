
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceType } from "@/types/services";

interface ServiceHeaderProps {
  services: ServiceType[];
  selectedService: ServiceType;
  onTabChange: (value: string) => void;
}

const ServiceHeader = ({ services, selectedService, onTabChange }: ServiceHeaderProps) => {
  return (
    <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
      <CardContent className="p-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our Services
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Comprehensive technology solutions designed to transform your business and drive innovation
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mt-10 mb-8">
          <Tabs 
            value={selectedService.id} 
            onValueChange={onTabChange}
            className="justify-center"
          >
            <TabsList className="bg-gray-800/60 inline-flex flex-wrap gap-2 h-auto p-2 rounded-xl">
              {services.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id}
                  className="data-[state=active]:text-white text-sm px-4 py-2 rounded-md transition-colors duration-200"
                  style={{ 
                    borderBottom: selectedService.id === service.id ? `2px solid ${service.color}` : 'none',
                    color: selectedService.id === service.id ? service.color : 'inherit'
                  }}
                >
                  {service.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceHeader;
