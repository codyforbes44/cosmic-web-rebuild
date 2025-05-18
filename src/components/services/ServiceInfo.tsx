
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Service } from '@/types/services';

interface ServiceInfoProps {
  service: Service;
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-card p-6 md:p-8 rounded-xl shadow-lg"
    >
      <h2 
        className="text-3xl md:text-4xl font-bold mb-4" 
        style={{ color: service.color }}
      >
        {service.name}
      </h2>
      <p className="text-gray-300 text-lg mb-8">
        {service.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800/60 p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Deliverables</h3>
          <p className="text-white font-medium">{service.deliverables}</p>
        </div>
        <div className="bg-gray-800/60 p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Typical Duration</h3>
          <p className="text-white font-medium">{service.duration}</p>
        </div>
        <div className="bg-gray-800/60 p-4 rounded-lg col-span-1 md:col-span-2">
          <h3 className="text-sm text-gray-400 mb-1">Process</h3>
          <p className="text-white font-medium">{service.process}</p>
        </div>
      </div>

      <div 
        className="bg-opacity-20 backdrop-blur-sm p-5 rounded-lg" 
        style={{ backgroundColor: `${service.color}20` }}
      >
        <h3 
          className="text-lg font-medium mb-2"
          style={{ color: service.color }}
        >
          Key Benefit
        </h3>
        <p className="text-gray-300">
          {service.key_benefit}
        </p>
      </div>
      
      <div className="mt-8 flex gap-4">
        <Link to="/get-quote">
          <Button 
            className="flex items-center gap-2"
            style={{ backgroundColor: service.color }}
          >
            Get a Quote <ArrowRight size={16} />
          </Button>
        </Link>
        <Link to="/contact">
          <Button variant="outline">
            Learn More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceInfo;
