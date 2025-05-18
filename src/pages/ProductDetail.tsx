
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { productCategories } from "@/components/navbar/constants";
import ProductHero from '@/components/products/ProductHero';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductTestimonial from '@/components/products/ProductTestimonial';
import ProductCTA from '@/components/products/ProductCTA';
import DemoRequestModal from '@/components/products/DemoRequestModal';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  // Find the corresponding product from our data
  const product = productCategories.find(p => {
    const slug = p.href.split('/').pop();
    return slug === productId;
  });
  
  // Redirect if product not found
  if (!product) {
    return <Navigate to="/products" replace />;
  }
  
  return (
    <>
      <SEO 
        title={`${product.title} | ƷBI Enterprise Solutions`}
        description={product.description}
        keywords={`${product.title.toLowerCase()}, trucking software, driver management, enterprise solutions, ƷBI products`}
        image={product.image}
      />
      <Navbar />
      <main className="pt-24 pb-16 relative overflow-hidden">
        <StarBackground />
        
        {/* Hero Section */}
        <ProductHero 
          product={product} 
          openDemoModal={() => setIsDemoModalOpen(true)} 
        />
        
        {/* Product-specific content */}
        <ProductFeatures product={product} productId={productId || ''} />
        
        {/* Testimonial Section */}
        <ProductTestimonial product={product} />
        
        {/* Pricing CTA */}
        <ProductCTA 
          product={product} 
          openDemoModal={() => setIsDemoModalOpen(true)} 
        />
        
        {/* Demo Request Modal */}
        <DemoRequestModal 
          isOpen={isDemoModalOpen}
          onOpenChange={setIsDemoModalOpen}
          productTitle={product.title}
        />
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
