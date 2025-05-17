
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import ServiceHeader from "@/components/services/ServiceHeader";
import ServicesView from "@/components/services/ServicesView";
import CTASection from "@/components/CTASection";
import { services } from "@/data/servicesData";
import { motion } from "framer-motion";

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
      // Scroll to top when changing service
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 md:px-6"
        >
          <ServiceHeader 
            services={services}
            selectedService={selectedService}
            onTabChange={handleTabChange}
          />
          <ServicesView selectedService={selectedService} />
          
          {/* Add related services suggestion for better user journey */}
          <div className="mt-20 mb-12">
            <h2 className="text-2xl font-bold text-center text-white mb-8">Explore Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter(service => service.id !== selectedService.id)
                .slice(0, 3)
                .map(service => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-gray-700/60 cursor-pointer"
                    onClick={() => navigate(`/services#${service.id}`)}
                  >
                    <div 
                      className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: service.color }}></div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{service.description}</p>
                  </motion.div>
                ))}
            </div>
          </div>
          
          {/* Add global CTA */}
          <CTASection />
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
