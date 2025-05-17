
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ScheduleButton from '@/components/calendly/ScheduleButton';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl p-8 md:p-12 shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to transform your business?</h2>
              <p className="text-lg text-gray-200 mb-6">
                Our team of experts is ready to help you implement the right solutions for your specific needs.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-gray-200">Personalized consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-gray-200">Tailored solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-gray-200">Ongoing support and maintenance</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <ScheduleButton className="bg-accent hover:bg-accent/80 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center min-w-[200px]">
                Schedule a Call <ArrowRight className="ml-2 h-4 w-4" />
              </ScheduleButton>
              <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 py-3 px-6" asChild>
                <Link to="/get-quote">
                  Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
