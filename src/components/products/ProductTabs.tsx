
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCategory } from '@/components/navbar/constants';

interface ProductTabsProps {
  products: ProductCategory[];
  selectedProductId: string;
  onTabChange: (value: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ products, selectedProductId, onTabChange }) => {
  const selectedProduct = products.find(product => product.href === selectedProductId) || products[0];

  return (
    <Tabs 
      value={selectedProduct.href} 
      onValueChange={onTabChange}
      className="justify-center w-full"
    >
      <TabsList className="bg-gray-800/60 flex flex-wrap justify-center p-2 rounded-xl max-w-full overflow-hidden">
        {products.map((product) => (
          <TabsTrigger 
            key={product.href} 
            value={product.href}
            className="data-[state=active]:text-white text-sm px-4 py-2 m-1 rounded-md transition-colors duration-200"
            style={{ 
              borderBottom: selectedProduct.href === product.href ? `2px solid ${product.color}` : 'none',
              color: selectedProduct.href === product.href ? product.color : 'inherit'
            }}
          >
            {product.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ProductTabs;
