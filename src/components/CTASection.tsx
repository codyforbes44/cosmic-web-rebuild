
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-space-dark-blue z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-space-dark-blue via-space-deep-blue/80 to-space-dark-blue z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto bg-space-deep-blue/40 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-gray-800 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-accent font-medium inline-block mb-4 bg-accent/10 px-4 py-1 rounded-full text-sm">LIMITED TIME OFFER</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to transform your business?</h2>
              <p className="text-gray-300 text-lg mb-8">
                Get a free consultation and discover how our technology solutions can help you achieve your business goals.
              </p>
              
              <Link to="/get-quote">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white flex items-center">
                  Schedule Your Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">What you'll get:</h3>
              {[
                "Free 30-minute consultation with our experts",
                "Custom solution recommendations for your business",
                "Detailed pricing and timeline estimates",
                "Insights into industry best practices"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-200">{item}</p>
                </div>
              ))}
              
              <div className="pt-4">
                <Link to="/packages" className="text-brand-gold hover:text-brand-gold/80 underline underline-offset-4">
                  Or browse our service packages →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
