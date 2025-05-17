
import React from 'react';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { packageData, PackageType } from './packageData';
import PackageCard from './PackageCard';
import { motion } from 'framer-motion';

interface ProductPackagesDialogProps {
  productId: string | null;
  productName: string | null;
}

const ProductPackagesDialog: React.FC<ProductPackagesDialogProps> = ({
  productId,
  productName,
}) => {
  // Filter packages based on selected product
  const filteredPackages = productId 
    ? packageData.filter(pkg => pkg.forProducts?.includes(productId))
    : [];

  return (
    <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto bg-gray-900/95 backdrop-blur-md border-gray-800">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-white">
          {productName} Subscription Plans
        </DialogTitle>
        <DialogDescription className="text-gray-300">
          Choose the perfect plan for your business needs
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-4">
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, index) => (
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
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No subscription plans found for this product.</p>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default ProductPackagesDialog;
