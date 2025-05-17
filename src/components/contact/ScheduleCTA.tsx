
import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ScheduleButton from '@/components/calendly/ScheduleButton';

const ScheduleCTA = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 rounded-xl bg-space-deep-blue/50 backdrop-blur-sm border border-accent/20 mt-16 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Talk?</h2>
      <p className="text-gray-300 text-center mb-6 max-w-md">
        Schedule a 30-minute consultation with our team to discuss your business needs and how we can help.
      </p>
      
      <ScheduleButton 
        className="bg-accent hover:bg-accent/80 text-white flex items-center gap-2 py-3 px-6 rounded-md font-medium"
      >
        <Calendar size={20} />
        Schedule a Meeting
      </ScheduleButton>
      
      <p className="text-sm text-gray-400 mt-4">
        No commitment required • Choose a time that works for you
      </p>
    </motion.div>
  );
};

export default ScheduleCTA;
