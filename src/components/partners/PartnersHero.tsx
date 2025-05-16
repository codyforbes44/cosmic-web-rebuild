
import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const PartnersHero: React.FC = () => {
  return (
    <section className="bg-space-deep-blue py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Globe size={48} className="text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Strategic Partners
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            We collaborate with industry-leading organizations to deliver exceptional technology 
            solutions and services that drive innovation and business growth.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-brand-gold font-medium">25+ Technology Partners</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-brand-gold font-medium">10+ Solution Providers</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-brand-gold font-medium">Global Network</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background element */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space-dark-blue z-0"></div>
    </section>
  );
};

export default PartnersHero;
