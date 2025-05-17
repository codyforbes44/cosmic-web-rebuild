
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MessageSquareText, Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTASection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-space-dark-blue z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-space-dark-blue via-space-deep-blue/80 to-space-dark-blue z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto bg-space-deep-blue/40 backdrop-blur-md p-6 md:p-12 rounded-2xl border border-gray-800 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="text-accent font-medium inline-block mb-3 bg-accent/10 px-3 py-1 rounded-full text-xs md:text-sm">LIMITED TIME OFFER</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Ready to transform your business?</h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              Get a personalized consultation and discover how our technology solutions can help you achieve your business goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="mb-5">
                <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <MessageSquareText className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Chat With Us</h3>
                <p className="text-gray-300 mb-4">Get immediate answers to your questions from our expert team.</p>
              </div>
              <div className="mt-auto">
                <Link to="/contact" className="w-full">
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white">
                    Start a Conversation
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-xl p-6 flex flex-col relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-xs font-medium">MOST POPULAR</div>
              <div className="mb-5">
                <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Free Consultation</h3>
                <p className="text-gray-300 mb-4">Get a comprehensive solution proposal tailored to your business needs.</p>
                <ul className="space-y-2 mb-5">
                  {["30-minute expert consultation", "Custom solution recommendations", "Detailed pricing estimate"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <Link to="/get-quote" className="w-full">
                  <Button className="w-full bg-accent hover:bg-accent/80 text-white">
                    Schedule Now
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="mb-5">
                <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Call Us Directly</h3>
                <p className="text-gray-300 mb-4">Speak directly with our team about your business technology needs.</p>
              </div>
              <div className="mt-auto">
                <a href="tel:+11234567890" className="w-full">
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white">
                    (123) 456-7890
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm">
              Not ready yet? <Link to="/services" className="text-accent underline underline-offset-2 hover:text-accent/80">Learn more about our services</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
