
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ProductCategory } from '@/components/navbar/constants';

interface ProductCTAProps {
  product: ProductCategory;
  openDemoModal: () => void;
}

const ProductCTA: React.FC<ProductCTAProps> = ({ product, openDemoModal }) => {
  return (
    <section className="container mx-auto px-4 relative z-10">
      <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-300 mb-8">
            Join hundreds of transportation companies already using {product.title} to 
            transform their operations and improve driver satisfaction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-accent hover:bg-accent/80 text-white px-8 py-6 text-lg"
              onClick={openDemoModal}
            >
              Schedule a Demo
            </Button>
            <Link to="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCTA;
