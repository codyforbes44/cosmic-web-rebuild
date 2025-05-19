import React from 'react';
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const DriversMatter = () => {
  return (
    <>
      <SEO 
        title="Drivers Matter | Advocating for Commercial Drivers' Rights" 
        description="Supporting the backbone of America's economy through advocacy, resources, and community for commercial truck drivers."
        keywords="drivers matter, truck drivers, commercial drivers, drivers rights, trucking advocacy, driver support"
        image="/lovable-uploads/1141a74c-1568-4bb7-b836-c7e5112efacf.png"
      />
      <Navbar />
      <main className="relative overflow-hidden">
        {/* Hero Section with Background Image */}
        <section className="relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/1141a74c-1568-4bb7-b836-c7e5112efacf.png" 
              alt="Commercial truck on highway" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                Advocating for Commercial Drivers' Rights
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-200 mb-8"
              >
                Supporting the backbone of America's economy through advocacy, resources, and community.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-md">
                  Learn More
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3 text-lg rounded-md">
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 relative">
                Our Mission
                <span className="block w-24 h-1 bg-red-600 mx-auto mt-4"></span>
              </h2>
              
              <p className="text-xl text-gray-700 mb-8">
                Drivers Matter is dedicated to protecting and advancing the rights of commercial drivers 
                across the nation. We believe in fair working conditions, proper rest periods, and 
                advocating for policies that recognize the essential role drivers play in our economy.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Advocacy</h3>
                  <p className="text-gray-600">Fighting for fair regulations, compensation, and working conditions for all commercial drivers</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Resources</h3>
                  <p className="text-gray-600">Providing essential tools, information, and education to support drivers in their careers</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
                  <p className="text-gray-600">Building a supportive network where drivers can connect, share experiences, and help each other</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to make a difference?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community of drivers and advocates working together to create positive change in the industry
            </p>
            <Link to="/get-quote">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-md inline-flex items-center gap-2">
                Get Involved <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
        
        <StarBackground />
      </main>
      <Footer />
    </>
  );
};

export default DriversMatter;
