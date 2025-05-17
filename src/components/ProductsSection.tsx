
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

const productData = [
  {
    id: 'truckOnboard',
    title: 'TruckOnboard',
    description: 'Remote driver onboarding made simple with digital documents and automated workflows.',
    color: '#0EA5E9',
    image: '/lovable-uploads/3019ba2a-e413-4c57-b1dc-f784e0d9511a.png',
  },
  {
    id: 'cpn',
    title: 'Carrier Partner Network',
    description: 'Connecting trucking companies and drivers, streamlining transitions with secure document management.',
    color: '#8B5CF6',
    image: '/lovable-uploads/b526c888-e2db-4d66-b8eb-fc8218763c99.png',
  },
  {
    id: '3biConnect',
    title: '3BI Connect',
    description: 'Complete platform for trucking companies to manage drivers and streamline operations.',
    color: '#F97316',
    image: '/lovable-uploads/c3fa73ab-8505-4e8a-bf40-2d48a383fff8.png',
  },
];

const ProductsSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-deep-blue/30 to-space-dark-blue/20 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="bg-accent/20 p-3 rounded-full">
              <Package className="h-6 w-6 text-accent" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Our Product Suite
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Innovative solutions designed specifically for the transportation and logistics industry
            to streamline operations and boost efficiency.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productData.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-transform hover:translate-y-[-5px] duration-300">
                <div className="relative">
                  <div 
                    className="absolute inset-0 opacity-20" 
                    style={{ 
                      background: `radial-gradient(circle, ${product.color} 0%, transparent 70%)`,
                    }} 
                  />
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background: `linear-gradient(to top, rgba(17, 24, 39, 1), transparent)`
                    }}
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div 
                    className="w-10 h-10 rounded-full mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${product.color}20` }}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: product.color }}></div>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold mb-3" 
                    style={{ color: product.color }}
                  >
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Link to={`/products#${product.id}`}>
                      <Button
                        variant="outline"
                        className="w-full hover:bg-gray-800 border-gray-700"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/packages">
            <Button
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6"
              size="lg"
            >
              View All Subscription Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
