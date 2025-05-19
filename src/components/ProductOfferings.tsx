
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { productCategories } from './navbar/constants';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ProductOfferings = () => {
  return (
    <section className="py-24 bg-space-deep-blue/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Enterprise Solutions</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Discover how our enterprise software solutions can streamline your operations and drive business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCategories.map((product, index) => {
            // Map product titles to their respective uploaded image paths
            const imagePath = product.title === '3BI Connect' 
              ? '/lovable-uploads/e3113b32-9c5a-4411-93bd-66a08ea62185.png' 
              : product.title === 'Carrier Partner Network'
              ? '/lovable-uploads/b6488acc-bc3b-49ce-a399-f736207129fe.png'
              : '/lovable-uploads/dbd9cb45-ab91-470f-8a3e-4640e6b5539c.png';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-space-deep-blue/50 border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300"
              >
                <AspectRatio ratio={16/9}>
                  <img 
                    src={imagePath} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: product.color }}>
                    {product.title}
                  </h3>
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link to={`/products?product=${product.href}`}>
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto flex items-center gap-1 group hover:bg-transparent"
                        style={{ color: product.color }}
                      >
                        Learn More 
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    
                    <span className="text-xs text-gray-500 italic">
                      Enterprise Solution
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/products">
            <Button className="bg-accent hover:bg-accent/90">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductOfferings;
