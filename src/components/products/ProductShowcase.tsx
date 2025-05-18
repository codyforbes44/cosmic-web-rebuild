
import React from 'react';
import { motion } from "framer-motion";
import { productCategories } from "@/components/navbar/constants";
import ProductCard from './ProductCard';

const ProductShowcase = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 relative z-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-12 md:gap-24"
      >
        {productCategories.map((product, index) => (
          <ProductCard 
            key={product.title} 
            product={product} 
            index={index} 
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ProductShowcase;
