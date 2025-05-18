
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { productCategories } from "@/components/navbar/constants";
import { ArrowRight, Users, BarChart2, Calendar } from 'lucide-react';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeProduct = queryParams.get('product');

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
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
        
        {/* Header Section */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-accent">
              Enterprise Software Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Specialized tools designed to streamline operations, improve efficiency, and drive growth 
              for transportation and logistics companies.
            </p>
          </motion.div>
        </section>

        {/* Product Showcase */}
        <section className="container mx-auto px-4 mb-24 relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-12 md:gap-24"
          >
            {productCategories.map((product, index) => (
              <motion.div 
                key={product.title}
                variants={item}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`order-2 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-auto rounded-lg shadow-xl border border-gray-800"
                  />
                </div>
                <div className={`${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                  <h2 className="text-3xl font-bold mb-4" style={{ color: product.color }}>
                    {product.title}
                  </h2>
                  <p className="text-gray-300 mb-6">{product.description}</p>
                  
                  {product.title === '3BI Connect' && (
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-blue-900/30" style={{ color: product.color }}>
                          <Users size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Driver-Centric</h3>
                          <p className="text-sm text-gray-400">Built with drivers in mind, focusing on improving their experience and satisfaction.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-blue-900/30" style={{ color: product.color }}>
                          <BarChart2 size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Data-Driven</h3>
                          <p className="text-sm text-gray-400">Powerful analytics help you make informed decisions to improve retention and operations.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-blue-900/30" style={{ color: product.color }}>
                          <Calendar size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Time-Saving</h3>
                          <p className="text-sm text-gray-400">Streamlined workflows and automated processes that save you time and reduce paperwork.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {product.title === 'Carrier Partner Network' && (
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-green-900/30" style={{ color: product.color }}>
                          <Users size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Seamless Connections</h3>
                          <p className="text-sm text-gray-400">Connect trucking companies with qualified drivers through a streamlined platform.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-green-900/30" style={{ color: product.color }}>
                          <BarChart2 size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Secure Document Management</h3>
                          <p className="text-sm text-gray-400">Simplify employment transitions with secure document handling and verification.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-green-900/30" style={{ color: product.color }}>
                          <Calendar size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Efficient Communication</h3>
                          <p className="text-sm text-gray-400">Streamlined communication channels between carriers and drivers throughout the hiring process.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {product.title === 'TruckOnboard' && (
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-sky-900/30" style={{ color: product.color }}>
                          <Users size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Remote Onboarding</h3>
                          <p className="text-sm text-gray-400">Digitize your onboarding process for drivers to complete from anywhere.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-sky-900/30" style={{ color: product.color }}>
                          <BarChart2 size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Interactive Training</h3>
                          <p className="text-sm text-gray-400">Engage new drivers with interactive training modules that ensure compliance.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-sky-900/30" style={{ color: product.color }}>
                          <Calendar size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Automated Workflows</h3>
                          <p className="text-sm text-gray-400">Reduce administrative burden with automated document processing and workflow management.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    <Link to={`${product.href}/demo`}>
                      <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                        Try Demo
                      </Button>
                    </Link>
                    <Link to="/get-quote">
                      <Button className="bg-accent/80 hover:bg-accent text-white flex items-center gap-2">
                        Get Pricing <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-gray-800 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your operations?</h2>
              <p className="text-gray-300 mb-8">
                Our team of experts is ready to help you implement the perfect solution for your business. 
                Schedule a personalized demo to see our products in action.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/get-quote">
                  <Button className="bg-accent hover:bg-accent/80 text-white px-8 py-6 text-lg">
                    Request a Demo
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Products;
