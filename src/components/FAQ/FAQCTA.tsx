
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const FAQCTA: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-16 bg-gradient-to-r from-space-dark-blue to-space-deep-blue p-8 rounded-xl border border-gray-700 shadow-xl"
    >
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Our team is ready to answer any additional questions you might have about our services, products, or how we can help your business succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 h-auto rounded-md font-medium transition-all shadow-lg hover:shadow-accent/20 hover:-translate-y-1 flex items-center"
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/get-quote">
            <Button 
              variant="outline"
              className="border-accent/50 hover:bg-accent/10 text-white px-8 py-6 h-auto rounded-md font-medium transition-all shadow-lg hover:shadow-accent/20 hover:-translate-y-1 flex items-center"
            >
              Get a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-12 border-t border-gray-700 pt-8">
        <h3 className="text-xl font-bold text-white mb-6">Why Choose Ʒʙɪ?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Industry Expertise", description: "Domain knowledge across multiple sectors" },
            { title: "Custom Solutions", description: "Tailored to your specific business needs" },
            { title: "Proven Results", description: "Track record of driving client success" }
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-start">
              <div className="mr-3 p-2 rounded-full bg-accent/10">
                <Check className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-medium text-white">{benefit.title}</h4>
                <p className="text-sm text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FAQCTA;
