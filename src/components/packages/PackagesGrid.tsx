
import React from 'react';
import { useLocation } from 'react-router-dom';
import { packageData } from './packageData';
import PackageCard from './PackageCard';
import { motion } from 'framer-motion';

const PackagesGrid: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productFilter = queryParams.get('product');
  
  // Filter packages based on product if specified
  const filteredPackages = productFilter 
    ? packageData.filter(pkg => pkg.forProducts?.includes(productFilter))
    : packageData;
    
  // If we have a product filter but no packages match, show all packages
  const packagesToDisplay = filteredPackages.length > 0 ? filteredPackages : packageData;
  
  return (
    <div className="py-8">
      {productFilter && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-accent mb-8"
        >
          Showing subscription plans for {getProductName(productFilter)}
        </motion.p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packagesToDisplay.map((pkg, index) => (
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
    </div>
  );
};

// Helper function to get product name from ID
function getProductName(productId: string): string {
  switch(productId) {
    case 'truckOnboard':
      return 'TruckOnboard';
    case 'cpn':
      return 'Carrier Partner Network';
    case '3biConnect':
      return '3BI Connect';
    default:
      return 'Selected Product';
  }
}

export default PackagesGrid;
