
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, BarChart2, Calendar } from 'lucide-react';
import { ProductCategory } from '@/components/navbar/constants';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  product: ProductCategory;
  index: number;
}

// Map product titles to their respective uploaded image paths
const getProductImage = (title: string) => {
  switch (title) {
    case '3BI Connect':
      return '/lovable-uploads/e3113b32-9c5a-4411-93bd-66a08ea62185.png';
    case 'Carrier Partner Network':
      return '/lovable-uploads/b6488acc-bc3b-49ce-a399-f736207129fe.png';
    case 'TruckOnboard':
      return '/lovable-uploads/dbd9cb45-ab91-470f-8a3e-4640e6b5539c.png';
    default:
      return '/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png';
  }
};

// Feature items based on product type
const getProductFeatures = (product: ProductCategory) => {
  const features = {
    '3BI Connect': [
      {
        title: "Driver-Centric",
        description: "Built with drivers in mind, focusing on improving their experience and satisfaction.",
        icon: Users
      },
      {
        title: "Data-Driven",
        description: "Powerful analytics help you make informed decisions to improve retention and operations.",
        icon: BarChart2
      },
      {
        title: "Time-Saving",
        description: "Streamlined workflows and automated processes that save you time and reduce paperwork.",
        icon: Calendar
      }
    ],
    'Carrier Partner Network': [
      {
        title: "Seamless Connections",
        description: "Connect trucking companies with qualified drivers through a streamlined platform.",
        icon: Users
      },
      {
        title: "Secure Document Management",
        description: "Simplify employment transitions with secure document handling and verification.",
        icon: BarChart2
      },
      {
        title: "Efficient Communication",
        description: "Streamlined communication channels between carriers and drivers throughout the hiring process.",
        icon: Calendar
      }
    ],
    'TruckOnboard': [
      {
        title: "Remote Onboarding",
        description: "Digitize your onboarding process for drivers to complete from anywhere.",
        icon: Users
      },
      {
        title: "Interactive Training",
        description: "Engage new drivers with interactive training modules that ensure compliance.",
        icon: BarChart2
      },
      {
        title: "Automated Workflows",
        description: "Reduce administrative burden with automated document processing and workflow management.",
        icon: Calendar
      }
    ]
  };
  
  return features[product.title as keyof typeof features] || features['3BI Connect'];
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const features = getProductFeatures(product);

  return (
    <motion.div 
      variants={item}
      className="grid md:grid-cols-2 gap-8 items-center"
    >
      <div className="order-2 md:order-2">
        <div className="rounded-lg shadow-xl border border-gray-800 overflow-hidden">
          <AspectRatio ratio={16/9}>
            <img 
              src={getProductImage(product.title)} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
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
        
        {/* Product features */}
        <div className="space-y-4 mb-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start">
              <div className="mr-3 p-2 rounded-full bg-opacity-30" style={{ 
                backgroundColor: `${product.color}20`,
                color: product.color 
              }}>
                <feature.icon size={20} />
              </div>
              <div>
                <h3 className="font-medium text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
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

        {/* Call to action button */}
        <div className="flex flex-wrap gap-4">
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
