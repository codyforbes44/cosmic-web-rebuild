
import React from 'react';
import { motion } from 'framer-motion';
import { ServiceTestimonial } from '@/data/servicesData';

interface ServiceTestimonialsProps {
  testimonials: ServiceTestimonial[];
  color: string;
}

const ServiceTestimonials: React.FC<ServiceTestimonialsProps> = ({ testimonials, color }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-8 text-center">What Our Clients Say</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
            className="bg-gray-800/40 p-6 rounded-xl border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="h-14 w-14 rounded-full object-cover border-2"
                  style={{ borderColor: color }}
                />
              </div>
              <div>
                <h4 className="font-medium text-white">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">{testimonial.position}</p>
              </div>
            </div>
            <p className="italic text-gray-300">"{testimonial.quote}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTestimonials;
