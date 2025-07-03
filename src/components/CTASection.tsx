
import React from 'react';
import { motion } from 'framer-motion';
import { MinimizedVoiceChat } from './home/MinimizedVoiceChat';

const CTASection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-space-dark-blue z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-space-dark-blue via-space-deep-blue/80 to-space-dark-blue z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl z-0"></div>
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-accent font-medium inline-block mb-3 bg-accent/10 px-3 py-1 rounded-full text-xs md:text-sm">
              EXPERIENCE THE FUTURE
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
              Try Our Advanced Voice AI Assistant
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8">
              Experience next-generation voice technology with real-time AI conversation and intelligent business consulting.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <MinimizedVoiceChat />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
