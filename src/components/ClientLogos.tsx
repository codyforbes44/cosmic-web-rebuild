
import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: "TechForward Inc.", logo: "/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" },
  { name: "InnovateNow", logo: "/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" },
  { name: "Global Logistics Partners", logo: "/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" },
  { name: "TransTech Solutions", logo: "/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" },
  { name: "Freight Excellence", logo: "/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" }
];

const ClientLogos: React.FC = () => {
  return (
    <section className="py-8 bg-space-dark-blue/80 backdrop-blur-sm border-t border-b border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-gray-300 text-sm uppercase tracking-wider font-medium">Trusted by industry leaders</p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {clients.map((client, index) => (
            <motion.div 
              key={index}
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={client.logo} 
                alt={`${client.name} logo`} 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-accent text-sm font-medium">Over 50+ businesses have transformed with our solutions</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
