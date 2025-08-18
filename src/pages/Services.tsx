
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Settings } from "lucide-react";

import StandardPageLayout from "@/layouts/StandardPageLayout";
import ClientLogoBanner from "@/components/ClientLogoBanner";
import ServiceCaseStudy from "@/components/ServiceCaseStudy";

import ServiceImage from "@/components/services/ServiceImage";
import ServiceInfo from "@/components/services/ServiceInfo";
import ServiceDetails from "@/components/services/ServiceDetails";
import ServiceTestimonials from "@/components/services/ServiceTestimonials";
import ServicesCTA from "@/components/services/ServicesCTA";
import FeaturedServices from "@/components/services/FeaturedServices";
import ServiceTabs from "@/components/services/ServiceTabs";
import WebServicesSection from "@/components/home/WebServicesSection";

import { services } from "@/data/servicesData";

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(services[0]);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceParam = searchParams.get('service');
    
    if (serviceParam) {
      const foundService = services.find(service => service.id === serviceParam);
      if (foundService) {
        setSelectedService(foundService);
      }
    }
  }, [location.search]);

  const handleTabChange = (value: string) => {
    navigate(`/services?service=${value}`);
  };

  return (
    <StandardPageLayout
      seo={{
        title: "Professional Technology Services - ƷBI",
        description: "Comprehensive technology solutions designed to transform your business and drive innovation. Web development, AI solutions, consulting and more.",
        keywords: "technology services, web development, AI solutions, digital transformation, business consulting",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&crop=center"
      }}
      breadcrumb={{ label: "Services" }}
      header={{
        title: "Our Services",
        description: "Comprehensive technology solutions designed to transform your business and drive innovation",
        icon: Settings
      }}
    >
      {/* Website Development Services Section */}
      <div className="mb-16">
        <WebServicesSection />
      </div>

      {/* Service Tabs */}
      <div className="mb-6 sm:mb-8">
        <ServiceTabs 
          services={services} 
          selectedServiceId={selectedService.id} 
          onTabChange={handleTabChange} 
        />
      </div>

      {/* Service Content */}
      <Tabs value={selectedService.id} className="mb-12 sm:mb-16">
        {services.map((service) => (
          <TabsContent key={service.id} value={service.id} className="mt-0 animate-in fade-in-50">
            {/* Service Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              <ServiceImage image={service.image} name={service.title || service.name || ''} />
              <ServiceInfo service={service} />
            </div>
            
            {/* Pain Points and Benefits */}
            <div className="mt-12 sm:mt-16">
              <ServiceDetails service={service} />
            </div>
            
            {/* Testimonials Section */}
            {service.testimonials && (
              <ServiceTestimonials 
                testimonials={service.testimonials} 
                color={service.color} 
              />
            )}
            
            {/* Case Study */}
            <div className="mt-12 sm:mt-16">
              <ServiceCaseStudy 
                serviceId={service.id}
                title={service.case_study.title}
                client={service.case_study.client}
                description={service.case_study.description}
                results={service.case_study.results}
                color={service.color}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Featured Service Highlights */}
      <FeaturedServices services={services} />
      
      {/* Client Logo Banner */}
      <ClientLogoBanner 
        title="Trusted By Industry Leaders" 
        subtitle="Join hundreds of businesses that rely on our expert services" 
      />
      
      {/* CTA Section */}
      <ServicesCTA />
    </StandardPageLayout>
  );
};

export default Services;
