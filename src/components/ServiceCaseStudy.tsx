
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ServiceResult } from '@/types/services';

interface ServiceCaseStudyProps {
  serviceId: string;
  title: string;
  client: string;
  description: string;
  results: ServiceResult[];
  color: string;
}

const ServiceCaseStudy: React.FC<ServiceCaseStudyProps> = ({
  serviceId,
  title,
  client,
  description,
  results,
  color
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-space-deep-blue/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-lg"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ 
          backgroundColor: `${color}30`, 
          color 
        }}>
          Case Study
        </span>
      </div>
      
      <h4 className="text-xl font-bold mb-1">{title}</h4>
      <p className="text-gray-400 text-sm mb-4">{client}</p>
      
      <p className="text-gray-300 mb-6">{description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {results.map((result, idx) => {
          // Create a component dynamically if icon exists
          const IconComponent = result.icon;
          return (
            <div key={idx} className="bg-space-dark-blue/70 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {IconComponent && <IconComponent className="h-4 w-4 text-gray-400" />}
                <span className="text-xs text-gray-400">{result.label}</span>
              </div>
              <div className="text-lg font-bold" style={{ color }}>
                {result.value}
              </div>
            </div>
          );
        })}
      </div>
      
      <Link to={`/case-study?service=${serviceId}`}>
        <Button variant="link" className="p-0 h-auto flex items-center gap-1 group" style={{ color }}>
          View Full Case Study 
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default ServiceCaseStudy;
