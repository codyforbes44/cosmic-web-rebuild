
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Service } from '@/data/servicesData';

interface ServiceTabsProps {
  services: Service[];
  selectedServiceId: string;
  onTabChange: (value: string) => void;
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({ services, selectedServiceId, onTabChange }) => {
  const selectedService = services.find(service => service.id === selectedServiceId) || services[0];

  return (
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
  );
};

export default ServiceTabs;
