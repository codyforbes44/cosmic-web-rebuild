
import React from 'react';
import { ProductCategory } from '@/components/navbar/constants';

interface ProductTestimonialProps {
  product: ProductCategory;
}

const ProductTestimonial: React.FC<ProductTestimonialProps> = ({ product }) => {
  return (
    <section className="mb-16 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <blockquote className="text-xl md:text-2xl italic text-gray-300 mb-6">
          "Implementing {product.title} completely transformed our driver onboarding process. 
          What used to take days now takes hours, and our driver satisfaction scores have improved significantly."
        </blockquote>
        <cite className="block text-gray-400 not-italic">
          — John Smith, Fleet Manager at TransCo Logistics
        </cite>
      </div>
    </section>
  );
};

export default ProductTestimonial;
