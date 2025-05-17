
import React from 'react';
import { motion } from 'framer-motion';

const QuoteHeader = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" 
          alt="ƷBI Logo" 
          className="h-16 w-auto"
        />
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-6 text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Get Your Free Quote
      </motion.h1>
      
      <motion.p 
        className="text-gray-300 text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Tell us about your project, and we'll provide a custom quote tailored to your specific needs. 
        <span className="text-accent block mt-2">No obligation, and we'll get back to you within 24 hours.</span>
      </motion.p>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-space-dark-blue/60 backdrop-blur rounded-full px-4 py-2 text-sm flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span className="text-gray-300">Free Consultation</span>
        </div>
        
        <div className="bg-space-dark-blue/60 backdrop-blur rounded-full px-4 py-2 text-sm flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <span className="text-gray-300">Detailed Proposal</span>
        </div>
        
        <div className="bg-space-dark-blue/60 backdrop-blur rounded-full px-4 py-2 text-sm flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          <span className="text-gray-300">No Commitment</span>
        </div>
      </motion.div>
    </div>
  );
};

export default QuoteHeader;
