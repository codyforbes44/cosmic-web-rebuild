
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsView from "@/components/products/ProductsView";
import { productCategories } from "@/components/navbar/constants";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";

const Products: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(productCategories[0]);
  
  useEffect(() => {
    // Parse the hash from URL (remove the # character)
    const hash = location.hash.replace('#', '');
    
    // Find the product that matches the hash
    const productFromHash = productCategories.find(product => product.href.includes(hash));
    
    if (productFromHash) {
      // Update selected product if found
      setSelectedProduct(productFromHash);
      // Scroll to top when changing product
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  const handleTabChange = (value: string) => {
    navigate(`/products#${value}`);
  };

  return (
    <>
      <Helmet>
        <title>Products | ƷBI Technology Solutions</title>
        <meta name="description" content="Explore ƷBI's suite of innovative software solutions designed for the transportation and logistics industry." />
      </Helmet>

      <StarBackground />
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 md:px-6"
        >
          <ProductsHeader 
            products={productCategories}
            selectedProduct={selectedProduct}
            onTabChange={handleTabChange}
          />
          <ProductsView selectedProduct={selectedProduct} />
          
          {/* Add related products suggestion for better user journey */}
          <div className="mt-20 mb-12">
            <h2 className="text-2xl font-bold text-center text-white mb-8">Explore Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategories
                .filter(product => product.href !== selectedProduct.href)
                .map(product => (
                  <motion.div
                    key={product.href}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-gray-700/60 cursor-pointer"
                    onClick={() => navigate(product.href)}
                  >
                    <div 
                      className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${product.color}20` }}
                    >
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: product.color }}></div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{product.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                  </motion.div>
                ))}
            </div>
          </div>
          
          {/* Add global CTA */}
          <CTASection />
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
