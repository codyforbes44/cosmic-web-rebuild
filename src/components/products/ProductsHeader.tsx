
import React from 'react';
import { motion } from 'framer-motion';

const ProductsHeader: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-dark-blue via-space-deep-blue to-space-purple"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our Products
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-4">
            Comprehensive enterprise solutions designed for the trucking industry to streamline operations and improve driver experience
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsHeader;
