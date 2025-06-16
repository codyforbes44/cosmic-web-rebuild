
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-accent/10 to-purple-600/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-accent/20 p-4 rounded-full">
              <Mail className="h-8 w-8 text-accent" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Stay Updated with Latest Tech Insights
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get exclusive tips, industry insights, and early access to our latest web development offers. 
            Join our community of forward-thinking business leaders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-space-dark-blue border-gray-700 text-white placeholder-gray-400 flex-1"
            />
            <Button className="bg-accent hover:bg-accent/90 text-white px-6">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
