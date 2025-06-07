
import React from 'react';
import { motion } from 'framer-motion';

const ProductsHeader: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-card p-8 rounded-xl mb-8 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        Our Products
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-4">
        Comprehensive enterprise solutions designed for the trucking industry to streamline operations and improve driver experience
      </p>
    </motion.div>
  );
};

export default ProductsHeader;
