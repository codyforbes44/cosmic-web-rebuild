import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScheduleButton from '@/components/calendly/ScheduleButton';

interface ProductType {
  title: string;
  href: string;
  color: string;
  description: string;
}

const productDetails = [
  {
    id: 'truckOnboard',
    title: 'TruckOnboard',
    color: '#0EA5E9',
    description: 'Remote driver onboarding made simple',
    fullDescription: 'Streamline your truck driver orientation process with digital documents, interactive training modules, and automated workflows.',
    features: [
      'Digital document management',
      'Remote onboarding process',
      'Interactive training modules',
      'Automated workflows',
      'Secure document storage',
      'Mobile-friendly interface'
    ],
    image: '/lovable-uploads/3019ba2a-e413-4c57-b1dc-f784e0d9511a.png'
  },
  {
    id: 'cpn',
    title: 'Carrier Partner Network',
    color: '#8B5CF6',
    description: 'Simplifying driver transitions',
    fullDescription: 'A comprehensive platform connecting trucking companies and drivers, streamlining the employment transition process with secure document management and seamless communication.',
    features: [
      'Driver-company matching',
      'Secure document exchange',
      'Streamlined transitions',
      'Automated background checks',
      'Credential verification',
      'Communication tools'
    ],
    image: '/lovable-uploads/b526c888-e2db-4d66-b8eb-fc8218763c99.png'
  },
  {
    id: '3biConnect',
    title: '3BI Connect',
    color: '#F97316',
    description: 'Complete platform for trucking companies',
    fullDescription: 'The complete platform for trucking companies to manage drivers, improve retention, and streamline operations.',
    features: [
      'Driver-centric interface',
      'Data-driven insights',
      'Time-saving automation',
      'Retention analytics',
      'Operations management',
      'Communication tools'
    ],
    image: '/lovable-uploads/c3fa73ab-8505-4e8a-bf40-2d48a383fff8.png'
  }
];

interface ProductsViewProps {
  selectedProduct: ProductType;
}

const ProductsView: React.FC<ProductsViewProps> = ({ selectedProduct }) => {
  // Find the product details based on the selected product
  const productDetail = productDetails.find(
    product => product.id === selectedProduct.href.split('#')[1]
  ) || productDetails[0];

  return (
    <div className="space-y-12">
      {/* Main product content */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-2xl opacity-30" 
              style={{ 
                background: `radial-gradient(circle, ${productDetail.color}40 0%, transparent 70%)`,
                filter: 'blur(20px)'
              }} 
            />
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
            >
              <img 
                src={productDetail.image} 
                alt={productDetail.title} 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-xl">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4" 
              style={{ color: productDetail.color }}
            >
              {productDetail.title}
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              {productDetail.fullDescription}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {productDetail.features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: productDetail.color }}></div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={`/packages?product=${productDetail.id}`}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  View Pricing
                </Button>
              </Link>
              <ScheduleButton variant="outline" size="lg" className="border-gray-700 hover:bg-gray-800">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </ScheduleButton>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl text-white mb-4">Ready to optimize your operations?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <ScheduleButton className="bg-accent hover:bg-accent/80 text-white">
            Get a Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </ScheduleButton>
          <Link to={`/packages?product=${productDetail.id}`}>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
              View Pricing Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
