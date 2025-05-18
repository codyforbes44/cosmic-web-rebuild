
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Service } from '@/types/services';

interface ServiceDetailsProps {
  service: Service;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800"
      >
        <h3 className="text-xl font-bold mb-6">Common Challenges We Solve</h3>
        <ul className="space-y-4">
          {(service.pain_points || []).map((point, idx) => (
            <li key={idx} className="flex items-start">
              <div 
                className="mr-3 p-1 rounded-full mt-1" 
                style={{ backgroundColor: `${service.color}30` }}
              >
                <Check className="h-4 w-4" style={{ color: service.color }} />
              </div>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800"
      >
        <h3 className="text-xl font-bold mb-6">Key Benefits</h3>
        <ul className="space-y-4">
          {(service.benefits || []).map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <div 
                className="mr-3 p-1 rounded-full mt-1" 
                style={{ backgroundColor: `${service.color}30` }}
              >
                <Check className="h-4 w-4" style={{ color: service.color }} />
              </div>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ServiceDetails;
