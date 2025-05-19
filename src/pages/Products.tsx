
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ClientLogoBanner from '@/components/ClientLogoBanner';
import ProductComparison from '@/components/ProductComparison';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductsTestimonials from '@/components/products/ProductsTestimonials';
import ProductsCTA from '@/components/products/ProductsCTA';
import ProductTabs from '@/components/products/ProductTabs';
import { productCategories } from "@/components/navbar/constants";
import ProductCard from '@/components/products/ProductCard';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(productCategories[0].href);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productParam = searchParams.get('product');
    
    if (productParam) {
      const foundProduct = productCategories.find(product => product.href === productParam);
      if (foundProduct) {
        setSelectedProductId(foundProduct.href);
      }
    }
  }, [location.search]);

  const handleTabChange = (value: string) => {
    // Instead of updating the URL query parameter, we'll navigate to the product page directly
    // This function now serves as a callback for the tabs component but actual navigation
    // happens in the Link component within ProductTabs
    setSelectedProductId(value);
  };

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

          {/* Product Tabs */}
          <div className="mb-8">
            <ProductTabs 
              products={productCategories}
              selectedProductId={selectedProductId}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Client Logo Banner for social proof */}
          <ClientLogoBanner />
          
          {/* Product Content */}
          <Tabs value={selectedProductId} className="mb-16">
            {productCategories.map((product) => (
              <TabsContent key={product.href} value={product.href} className="mt-0 animate-in fade-in-50">
                <ProductCard product={product} index={0} />
              </TabsContent>
            ))}
          </Tabs>

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
