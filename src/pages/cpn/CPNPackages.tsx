
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { packageData } from '@/components/packages/packageData';
import PackageCard from '@/components/packages/PackageCard';
import { motion } from 'framer-motion';

const CPNPackages: React.FC = () => {
  // Filter packages for CPN
  const cpnPackages = packageData.filter(pkg => pkg.forProducts?.includes('cpn'));
  
  return (
    <>
      <Helmet>
        <title>Subscription Packages | Carrier Partner Network</title>
        <meta name="description" content="Choose the perfect subscription package for your carrier network needs. Flexible solutions for businesses of all sizes." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800/40 mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Carrier Partner Network Subscriptions
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Choose the perfect plan for your business needs. Our flexible packages are designed to provide you with the right level of features and support.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          {cpnPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PackageCard package={pkg} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-8 text-white">Need Help Choosing?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We understand that each business has unique needs. Let our experts help you choose the right package for your specific requirements.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md shadow-lg"
          >
            Schedule a Consultation
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default CPNPackages;
