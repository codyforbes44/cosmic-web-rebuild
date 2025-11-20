
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import ServiceCaseStudy from "@/components/ServiceCaseStudy";
import SEO from "@/components/SEO";
import { digitalService } from "@/data/services/digitalService";
import LiveChat from "@/components/LiveChat/LiveChat";
import DigitalMarketingPackages from "@/components/services/DigitalMarketingPackages";

const DigitalMarketing: React.FC = () => {
  const service = digitalService;
  
  return (
    <>
      <SEO 
        title="Digital Marketing Services - Grow Your Business Online" 
        description="Strategic digital marketing solutions to attract customers and grow your business. Targeted campaigns, performance analytics, and conversion optimization."
        keywords="digital marketing, online advertising, targeted campaigns, performance analytics, conversion optimization, digital growth"
        image="/og-images/digital-marketing.png"
      />
      <Navbar />
      <StarBackground />
      
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: service.color }}>
                  Digital Marketing Solutions
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/get-quote">
                    <Button 
                      size="lg"
                      style={{ backgroundColor: service.color }}
                      className="text-white hover:opacity-90"
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Features */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Digital Marketing Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-space-deep-blue/30 p-6 rounded-xl border border-gray-800"
                >
                  <feature.icon className="w-12 h-12 mb-4" style={{ color: service.color }} />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Packages Section */}
          <DigitalMarketingPackages />
          
          {/* Case Study */}
          <section className="mb-20">
            <ServiceCaseStudy 
              serviceId={service.id}
              title={service.case_study.title}
              client={service.case_study.client}
              description={service.case_study.description}
              results={service.case_study.results}
              color={service.color}
            />
          </section>
          
          {/* CTA Section */}
          <section className="mt-20">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 rounded-2xl border border-gray-700">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Grow Your Business?
                </h2>
                <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                  Get started with our digital marketing services today.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/get-quote">
                    <Button 
                      size="lg"
                      style={{ backgroundColor: service.color }}
                      className="text-white hover:opacity-90"
                    >
                      Get a Quote
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      <LiveChat />
    </>
  );
};

export default DigitalMarketing;
