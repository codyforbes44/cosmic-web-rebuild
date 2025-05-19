
import React from 'react';
import { motion } from 'framer-motion';

// Placeholder client logos - in a real implementation, these would be actual client logos
const clients = [{
  name: 'Acme Corporation',
  logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=ACME'
}, {
  name: 'TechGiant',
  logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=TECH+GIANT'
}, {
  name: 'Global Logistics',
  logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=GLOBAL+LOGISTICS'
}, {
  name: 'InnovateNow',
  logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=INNOVATENOW'
}, {
  name: 'MedTech Solutions',
  logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=MEDTECH'
}, {
  name: 'Finance Partners',
  logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=FINANCE+PARTNERS'
}];

interface ClientLogoBannerProps {
  title?: string;
  subtitle?: string;
}

const ClientLogoBanner: React.FC<ClientLogoBannerProps> = ({
  title = "Trusted by Industry Leaders",
  subtitle = "Join hundreds of businesses that rely on our solutions"
}) => {
  return (
    <section className="py-12 bg-space-deep-blue/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="bg-space-dark-blue/60 rounded-lg p-3 shadow-lg border border-gray-700 hover:border-accent/50 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={client.logo} 
                alt={`${client.name} logo`} 
                className="h-12 md:h-16 w-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogoBanner;
