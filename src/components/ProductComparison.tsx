
import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { productCategories } from "@/components/navbar/constants";

const features = [
  { name: "Real-time Analytics", description: "Access analytics dashboards with key metrics" },
  { name: "Mobile App", description: "Manage on-the-go with our mobile application" },
  { name: "API Integration", description: "Connect with existing business systems" },
  { name: "Custom Reporting", description: "Create personalized reports for your business needs" },
  { name: "User Permissions", description: "Control access levels for team members" },
  { name: "Automation Tools", description: "Streamline workflows with smart automation" },
  { name: "24/7 Support", description: "Access to our customer support team" }
];

const productFeatures = {
  "3BI Connect": [true, true, true, true, true, true, true],
  "Carrier Partner Network": [true, true, true, false, true, true, false],
  "TruckOnboard": [true, false, true, false, true, false, true]
};

const ProductComparison = () => {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-accent">Product Comparison</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Compare our product offerings to find the perfect solution for your business needs
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-space-deep-blue/50 text-left rounded-tl-lg">
                  <span className="text-gray-400 font-medium">Features</span>
                </th>
                {productCategories.map((product) => (
                  <th 
                    key={product.title} 
                    className="py-4 px-6 bg-space-deep-blue/50 text-center"
                    style={{ borderBottom: `2px solid ${product.color}` }}
                  >
                    <span className="font-bold text-lg" style={{ color: product.color }}>
                      {product.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={feature.name} className={cn(
                  idx % 2 === 0 ? "bg-space-dark-blue/20" : "bg-transparent",
                )}>
                  <td className="py-4 px-6 border-t border-gray-800">
                    <div>
                      <p className="font-medium text-white">{feature.name}</p>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </td>
                  {productCategories.map((product, productIdx) => {
                    const isIncluded = productFeatures[product.title]?.[idx];
                    return (
                      <td 
                        key={`${product.title}-${feature.name}`} 
                        className="py-4 px-6 border-t border-gray-800 text-center"
                      >
                        {isIncluded ? (
                          <div className="mx-auto inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-900/30">
                            <Check className="h-5 w-5 text-green-400" />
                          </div>
                        ) : (
                          <div className="mx-auto inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-900/20">
                            <X className="h-5 w-5 text-red-400/70" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductComparison;
