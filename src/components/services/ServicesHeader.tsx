
import React from 'react';
import { motion } from 'framer-motion';
import ServiceTabs from './ServiceTabs';
import { Service } from '@/types/services';

interface ServicesHeaderProps {
  services: Service[];
  selectedServiceId: string;
  onTabChange: (value: string) => void;
}

const ServicesHeader: React.FC<ServicesHeaderProps> = ({ services, selectedServiceId, onTabChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-card p-8 rounded-xl mb-8 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        Our Services
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
        Comprehensive technology solutions designed to transform your business and drive innovation
      </p>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <ServiceTabs 
          services={services} 
          selectedServiceId={selectedServiceId} 
          onTabChange={onTabChange} 
        />
      </div>
    </motion.div>
  );
};

export default ServicesHeader;
