
import React from 'react';
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ClientLogoBanner from '@/components/ClientLogoBanner';
import ProductComparison from '@/components/ProductComparison';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductShowcase from '@/components/products/ProductShowcase';
import ProductsTestimonials from '@/components/products/ProductsTestimonials';
import ProductsCTA from '@/components/products/ProductsCTA';
import { productCategories } from "@/components/navbar/constants";

const Products = () => {
  return (
    <>
      <SEO 
        title="Enterprise Software Solutions | ƷBI Products" 
        description="Explore ƷBI's suite of enterprise software solutions designed for trucking companies. Driver management, onboarding, and retention tools to streamline operations."
        keywords="enterprise software, trucking software, driver management, onboarding software, retention tools, ƷBI products"
        image={productCategories[0].image}
      />
      <Navbar />
      <main className="pt-24 pb-16 relative overflow-hidden">
        <StarBackground />
        
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <ProductsHeader />

          {/* Client Logo Banner for social proof */}
          <ClientLogoBanner />
          
          {/* Product Showcase */}
          <ProductShowcase />

          {/* Product Comparison Section */}
          <ProductComparison />
          
          {/* Testimonials Section */}
          <ProductsTestimonials />

          {/* CTA Section */}
          <ProductsCTA />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
