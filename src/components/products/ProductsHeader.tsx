
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

const ProductsHeader = () => {
  return (
    <section className="container mx-auto px-4 mb-16 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-accent">
          Enterprise Software Solutions
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Specialized tools designed to streamline operations, improve efficiency, and drive growth 
          for transportation and logistics companies.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Link to="/get-quote">
            <Button className="bg-accent hover:bg-accent/80 text-white px-6 py-2">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-gray-600">
              Talk to Sales
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductsHeader;
