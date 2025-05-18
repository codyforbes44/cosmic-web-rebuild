
import React from 'react';
import ServiceFeature from '@/components/ServiceFeature';
import { Service } from '@/types/services';

interface FeaturedServicesProps {
  services: Service[];
}

const FeaturedServices: React.FC<FeaturedServicesProps> = ({ services }) => {
  return (
    <section className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Our Key Service Areas</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Explore how our comprehensive service offerings can transform your business operations and technology infrastructure
        </p>
      </div>
      
      <div className="space-y-24">
        {services.slice(0, 3).map((service, idx) => (
          <ServiceFeature
            key={service.id}
            title={service.name}
            description={service.description}
            benefits={service.benefits.slice(0, 3)}
            image={service.image}
            color={service.color}
            align={idx % 2 === 0 ? 'left' : 'right'}
            cta={{ text: "Learn More", link: `/services?service=${service.id}` }}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedServices;
