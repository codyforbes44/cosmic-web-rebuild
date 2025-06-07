
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import PageHeader from "@/components/PageHeader";
import ClientLogoBanner from "@/components/ClientLogoBanner";
import ServiceCaseStudy from "@/components/ServiceCaseStudy";
import BreadcrumbNav from "@/components/BreadcrumbNav";

import ServiceImage from "@/components/services/ServiceImage";
import ServiceInfo from "@/components/services/ServiceInfo";
import ServiceDetails from "@/components/services/ServiceDetails";
import ServiceTestimonials from "@/components/services/ServiceTestimonials";
import ServicesCTA from "@/components/services/ServicesCTA";
import FeaturedServices from "@/components/services/FeaturedServices";
import ServiceTabs from "@/components/services/ServiceTabs";

import { services } from "@/data/servicesData";
import { Settings } from "lucide-react";

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
    <>
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Breadcrumb navigation */}
          <BreadcrumbNav currentPageLabel="Services" />
          
          {/* Page Header */}
          <PageHeader 
            title="Our Services"
            description="Comprehensive technology solutions designed to transform your business and drive innovation"
            icon={Settings}
          />

          {/* Service Tabs */}
          <div className="mb-8">
            <ServiceTabs 
              services={services} 
              selectedServiceId={selectedService.id} 
              onTabChange={handleTabChange} 
            />
          </div>

          {/* Service Content */}
          <Tabs value={selectedService.id} className="mb-16">
            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-0 animate-in fade-in-50">
                {/* Service Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  <ServiceImage image={service.image} name={service.title || service.name || ''} />
                  <ServiceInfo service={service} />
                </div>
                
                {/* Pain Points and Benefits */}
                <div className="mt-16">
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
                <div className="mt-16">
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
