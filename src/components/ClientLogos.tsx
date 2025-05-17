
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const clients = [
  { name: "TechForward Inc." },
  { name: "InnovateNow" },
  { name: "Global Logistics Partners" },
  { name: "TransTech Solutions" },
  { name: "Freight Excellence" }
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
          <p className="text-gray-300 text-sm uppercase tracking-wider font-medium">TRUSTED BY INDUSTRY LEADERS</p>
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
              className="opacity-70 hover:opacity-100 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative flex flex-col items-center">
                <Sparkles 
                  className="h-8 md:h-10 w-auto text-brand-gold animate-twinkle" 
                  style={{ 
                    filter: "drop-shadow(0 0 5px rgba(155, 135, 245, 0.7))"
                  }} 
                />
                <span className="text-brand-gold text-xs mt-1.5 font-medium">{client.name}</span>
              </div>
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
