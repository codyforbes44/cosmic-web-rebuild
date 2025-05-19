
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, BarChart2, Calendar } from 'lucide-react';
import { ProductCategory } from '@/components/navbar/constants';

interface ProductCardProps {
  product: ProductCategory;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={item}
      className="grid md:grid-cols-2 gap-8 items-center"
    >
      <div className="order-2 md:order-2">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-auto rounded-lg shadow-xl border border-gray-800"
        />
      </div>
      <div className="md:order-1">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-opacity-20 rounded-full text-sm font-medium" style={{ 
            backgroundColor: `${product.color}30`,
            color: product.color 
          }}>
            Enterprise Solution
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: product.color }}>
          {product.title}
        </h2>
        <p className="text-gray-300 mb-6">{product.description}</p>
        
        {/* Product features based on product title */}
        <div className="space-y-4 mb-6">
          {product.title === '3BI Connect' && (
            <div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-blue-900/30" style={{ color: product.color }}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Driver-Centric</h3>
                  <p className="text-sm text-gray-400">Built with drivers in mind, focusing on improving their experience and satisfaction.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-blue-900/30" style={{ color: product.color }}>
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Data-Driven</h3>
                  <p className="text-sm text-gray-400">Powerful analytics help you make informed decisions to improve retention and operations.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-blue-900/30" style={{ color: product.color }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Time-Saving</h3>
                  <p className="text-sm text-gray-400">Streamlined workflows and automated processes that save you time and reduce paperwork.</p>
                </div>
              </div>
            </div>
          )}
          
          {product.title === 'Carrier Partner Network' && (
            <div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-green-900/30" style={{ color: product.color }}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Seamless Connections</h3>
                  <p className="text-sm text-gray-400">Connect trucking companies with qualified drivers through a streamlined platform.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-green-900/30" style={{ color: product.color }}>
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Secure Document Management</h3>
                  <p className="text-sm text-gray-400">Simplify employment transitions with secure document handling and verification.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-green-900/30" style={{ color: product.color }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Efficient Communication</h3>
                  <p className="text-sm text-gray-400">Streamlined communication channels between carriers and drivers throughout the hiring process.</p>
                </div>
              </div>
            </div>
          )}
          
          {product.title === 'TruckOnboard' && (
            <div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-sky-900/30" style={{ color: product.color }}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Remote Onboarding</h3>
                  <p className="text-sm text-gray-400">Digitize your onboarding process for drivers to complete from anywhere.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-sky-900/30" style={{ color: product.color }}>
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Interactive Training</h3>
                  <p className="text-sm text-gray-400">Engage new drivers with interactive training modules that ensure compliance.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-full bg-sky-900/30" style={{ color: product.color }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Automated Workflows</h3>
                  <p className="text-sm text-gray-400">Reduce administrative burden with automated document processing and workflow management.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results/Metrics section */}
        <div className="bg-space-deep-blue/50 p-4 rounded-lg border border-gray-700 mb-6">
          <h4 className="text-sm text-gray-400 mb-2">Client Results</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xl font-bold" style={{ color: product.color }}>40%</div>
              <div className="text-xs text-gray-400">Efficiency Gain</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold" style={{ color: product.color }}>65%</div>
              <div className="text-xs text-gray-400">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold" style={{ color: product.color }}>30%</div>
              <div className="text-xs text-gray-400">Cost Reduction</div>
            </div>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-wrap gap-4">
          <Link to={`${product.href}/demo`}>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white">
              Try Demo
            </Button>
          </Link>
          <Link to="/get-quote">
            <Button className="bg-accent/80 hover:bg-accent text-white flex items-center gap-2">
              Get Pricing <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
