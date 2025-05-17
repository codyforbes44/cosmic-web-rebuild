
import React from 'react';
import { motion } from 'framer-motion';

const ProductsHeader: React.FC = () => {
  return (
    <section className="py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
          Our Product Suite
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Innovative solutions designed specifically for the transportation and logistics industry. 
          Our products help streamline operations, improve driver experiences, and boost overall efficiency.
        </p>
      </motion.div>
    </section>
  );
};

export default ProductsHeader;
