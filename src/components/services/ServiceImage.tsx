
import React from 'react';
import { motion } from 'framer-motion';

interface ServiceImageProps {
  image: string;
  name: string;
}

const ServiceImage: React.FC<ServiceImageProps> = ({ image, name }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-card p-4 md:p-6 overflow-hidden rounded-xl shadow-lg"
    >
      <div className="aspect-square overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </motion.div>
  );
};

export default ServiceImage;
