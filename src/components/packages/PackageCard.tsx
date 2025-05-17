
import React from 'react';
import { Button } from '@/components/ui/button';
import { PackageType } from './packageData';
import { useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

interface PackageCardProps {
  package: PackageType;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productFilter = queryParams.get('product');
  
  // Check if this package is specifically for the current product filter
  const isForCurrentProduct = productFilter && pkg.forProducts?.includes(productFilter);
  
  return (
    <div 
      className={`relative rounded-xl border p-6 shadow-lg transition-all duration-300 h-full flex flex-col
        ${pkg.popular ? 'scale-105 z-10' : ''} 
        ${isForCurrentProduct ? 'ring-2 ring-offset-2 ring-offset-background' : 'hover:border-accent/50'}
      `}
      style={{ 
        backgroundColor: 'rgba(17, 24, 39, 0.7)', 
        backdropFilter: 'blur(8px)',
        borderColor: isForCurrentProduct ? pkg.color : 'rgb(75, 85, 99, 0.3)',
        boxShadow: isForCurrentProduct ? `0 0 15px ${pkg.color}40` : ''
      }}
    >
      {pkg.popular && (
        <div 
          className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 px-3 py-1 text-xs font-medium rounded-full"
          style={{ backgroundColor: pkg.color }}
        >
          Popular
        </div>
      )}
      
      {isForCurrentProduct && (
        <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2 px-3 py-1 text-xs font-medium rounded-full bg-accent text-white">
          Recommended
        </div>
      )}
      
      <div className="mb-5">
        <h3 className="text-xl font-bold" style={{ color: pkg.color }}>{pkg.name}</h3>
        <p className="text-gray-400 mt-1 text-sm">{pkg.description}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-white">{pkg.price}</span>
          <span className="text-gray-400 ml-1">/month</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-8 flex-grow">
        {pkg.features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-auto">
        <Button 
          className="w-full mb-3" 
          style={{ backgroundColor: pkg.color, color: 'white' }}
        >
          Subscribe Now
        </Button>
        <Button variant="outline" className="w-full">
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;
