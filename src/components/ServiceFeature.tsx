
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface ServiceFeatureProps {
  title: string;
  description: string;
  benefits: string[];
  image: string;
  color: string;
  align?: 'left' | 'right';
  cta?: {
    text: string;
    link: string;
  };
  index: number;
}

const ServiceFeature: React.FC<ServiceFeatureProps> = ({
  title,
  description,
  benefits,
  image,
  color,
  align = 'left',
  cta,
  index
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={align === 'right' ? 'md:order-2' : ''}>
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-lg blur-xl opacity-30" 
            style={{ backgroundColor: color }}
          />
          <img 
            src={image} 
            alt={title} 
            className="relative rounded-lg shadow-xl border border-gray-800 w-full h-auto object-cover aspect-video"
          />
        </div>
      </div>
      
      <div className={align === 'right' ? 'md:order-1' : ''}>
        <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color }}>
          {title}
        </h3>
        <p className="text-gray-300 mb-6">
          {description}
        </p>
        
        <ul className="space-y-3 mb-8">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <div className="mr-3 p-1 rounded-full mt-1" style={{ backgroundColor: `${color}30` }}>
                <Check className="h-4 w-4" style={{ color }} />
              </div>
              <span className="text-gray-200">{benefit}</span>
            </li>
          ))}
        </ul>
        
        {cta && (
          <Link to={cta.link}>
            <Button 
              className="flex items-center gap-2 hover:-translate-y-1 transition-transform"
              style={{ 
                backgroundColor: `${color}`, 
                color: '#fff',
                boxShadow: `0 4px 14px ${color}40`
              }}
            >
              {cta.text} <ArrowRight size={16} />
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceFeature;
