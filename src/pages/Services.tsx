
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import ServiceHeader from "@/components/services/ServiceHeader";
import ServicesView from "@/components/services/ServicesView";
import { services } from "@/data/servicesData";

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(services[0]);
  
  useEffect(() => {
    // Parse the hash from URL (remove the # character)
    const hash = location.hash.replace('#', '');
    
    // Find the service that matches the hash
    const serviceFromHash = services.find(service => service.id === hash);
    
    if (serviceFromHash) {
      // Update selected service if found
      setSelectedService(serviceFromHash);
    }
  }, [location.hash]);

  const handleTabChange = (value: string) => {
    navigate(`/services#${value}`);
  };

  return (
    <>
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <ServiceHeader 
            services={services}
            selectedService={selectedService}
            onTabChange={handleTabChange}
          />
          <ServicesView selectedService={selectedService} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
