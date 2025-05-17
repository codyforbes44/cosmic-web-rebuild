
import React from 'react';
import { motion } from 'framer-motion';
import { productCategories } from '../navbar/constants';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  // Product details expanded from the constants
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

  return (
    <section className="py-12">
      <div className="space-y-24">
        {productDetails.map((product, index) => (
          <div key={product.id} id={product.id}>
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
