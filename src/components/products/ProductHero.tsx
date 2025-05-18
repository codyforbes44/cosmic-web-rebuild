
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '@/components/navbar/constants';

interface ProductHeroProps {
  product: ProductCategory;
  openDemoModal: () => void;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product, openDemoModal }) => {
  return (
    <section className="container mx-auto px-4 mb-20 relative z-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
              {product.title}
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">{product.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              className="bg-accent hover:bg-accent/80 text-white px-6 py-6 text-lg flex items-center gap-2"
              onClick={openDemoModal}
            >
              Request a Demo <ArrowRight size={18} />
            </Button>
            <Link to={`${product.href}/pricing`}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-6 text-lg">
                View Pricing
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <span>Trusted by</span>
            <span className="font-medium">200+</span>
            <span>trucking companies</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-800/30 p-4 rounded-lg border border-gray-700"
        >
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-auto rounded shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero;
