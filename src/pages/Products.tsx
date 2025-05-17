
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductList from "@/components/products/ProductList";

const Products: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Products | ƷBI Technology Solutions</title>
        <meta name="description" content="Explore ƷBI's suite of innovative software solutions designed for the transportation and logistics industry." />
      </Helmet>

      <StarBackground />
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ProductsHeader />
          <ProductList />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
