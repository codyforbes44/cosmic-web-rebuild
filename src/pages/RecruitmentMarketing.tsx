
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
import { recruitmentService } from "@/data/services/recruitmentService";
import LiveChat from "@/components/LiveChat/LiveChat";

const RecruitmentMarketing: React.FC = () => {
  const service = recruitmentService;
  
  return (
    <>
      <SEO 
        title="Professional Recruitment Marketing Services" 
        description="Powerful recruitment campaigns for businesses across all industries. Attract, engage and convert qualified candidates while reducing cost-per-hire by up to 40%."
        keywords="recruitment marketing, talent acquisition, candidate recruitment, hiring solutions, professional recruiting, recruitment campaigns, talent sourcing"
        image={service.image}
      />
      <Navbar />
      <StarBackground />
      
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: service.color }}>
                  Professional Recruitment Marketing
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Attract qualified candidates, reduce your cost-per-hire, and build a strong workforce with our specialized recruitment marketing services across all industries.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-quote">
                    <Button 
                      size="lg"
                      style={{ backgroundColor: service.color }}
                      className="text-white hover:opacity-90"
                    >
                      Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">
                      Schedule Consultation
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src={service.image} 
                    alt="Professional Recruitment" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div 
                  className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700"
                  style={{ borderColor: `${service.color}50` }}
                >
                  <p className="text-lg font-bold" style={{ color: service.color }}>
                    Reduce cost-per-hire by up to 40%
                  </p>
                  <p className="text-sm text-gray-300">
                    Based on client performance data
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Industry Stats */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-2" style={{ color: service.color }}>70%</h3>
                <p className="text-gray-300">Of companies struggle to find qualified candidates</p>
              </div>
              <div className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-2" style={{ color: service.color }}>$5,000+</h3>
                <p className="text-gray-300">Average cost-per-hire for skilled professionals</p>
              </div>
              <div className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-2" style={{ color: service.color }}>3+ months</h3>
                <p className="text-gray-300">Average time to fill professional positions</p>
              </div>
            </motion.div>
          </section>
          
          {/* How It Works */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Our Recruitment Marketing Works</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A data-driven approach to finding and converting the right candidates for your organization
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Discovery",
                  description: "We learn about your company, hiring needs, and ideal candidate profile"
                },
                {
                  step: "2",
                  title: "Campaign Strategy",
                  description: "Develop targeted campaigns across multiple channels to reach qualified professionals"
                },
                {
                  step: "3",
                  title: "Conversion Optimization",
                  description: "Build high-converting landing pages and streamlined application processes"
                },
                {
                  step: "4",
                  title: "Analytics & Refinement",
                  description: "Continuously measure results and optimize for better performance"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-space-deep-blue/30 p-6 rounded-xl border border-gray-800"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${service.color}20`, color: service.color }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Benefits */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits of Our Recruitment Marketing</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Targeted strategies that deliver real results for your hiring needs across all industries
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start p-6 bg-space-deep-blue/30 rounded-xl border border-gray-800"
                >
                  <CheckCircle 
                    className="mr-4 mt-1 flex-shrink-0" 
                    size={24} 
                    style={{ color: service.color }} 
                  />
                  <div>
                    <p className="text-lg">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to Solve Your Recruitment Challenges?
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    Schedule a free consultation with our recruitment marketing specialists to discuss your hiring needs.
                  </p>
                  <div className="flex flex-wrap gap-4">
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
                <div className="hidden lg:block">
                  <img 
                    src="/lovable-uploads/7f21da0a-fd77-43ea-a7af-3b11648397c0.png" 
                    alt="Professional Recruitment" 
                    className="w-full h-auto rounded-lg"
                  />
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

export default RecruitmentMarketing;
