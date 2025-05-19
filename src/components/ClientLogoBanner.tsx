
import React from 'react';
import { motion } from 'framer-motion';

// Placeholder client logos - in a real implementation, these would be actual client logos
const clients = [
  { name: 'Acme Corporation', logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=ACME' },
  { name: 'TechGiant', logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=TECH+GIANT' },
  { name: 'Global Logistics', logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=GLOBAL+LOGISTICS' },
  { name: 'InnovateNow', logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=INNOVATENOW' },
  { name: 'MedTech Solutions', logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=MEDTECH' },
  { name: 'Finance Partners', logo: 'https://placehold.co/180x90/1E293B/FFFFFF?text=FINANCE+PARTNERS' },
];

interface ClientLogoBannerProps {
  title?: string;
  subtitle?: string;
}

const ClientLogoBanner: React.FC<ClientLogoBannerProps> = ({ 
  title = "Trusted by Industry Leaders", 
  subtitle = "Join hundreds of businesses that rely on our solutions" 
}) => {
  return (
    <section className="py-12 bg-space-deep-blue/30">
      <div className="max-w-7xl mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>}
            {subtitle && <p className="text-gray-400">{subtitle}</p>}
          </div>
        )}
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={`${client.name} logo`} 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogoBanner;
