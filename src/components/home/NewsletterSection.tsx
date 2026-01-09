
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Store subscription in contact_submissions with a newsletter subject
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: 'Newsletter Subscriber',
          email: email.trim(),
          subject: 'Newsletter Subscription',
          message: 'User subscribed to the newsletter'
        });

      if (error) throw error;

      setIsSuccess(true);
      setEmail('');
      toast.success('Successfully subscribed to our newsletter!');
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-accent/10 to-purple-600/10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <Mail className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Get the latest insights on business technology and innovation delivered to your inbox
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isSuccess}
              className="bg-space-dark-blue border-gray-700 text-white placeholder-gray-400"
            />
            <Button 
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="bg-accent hover:bg-accent/90 text-white min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <p className="text-gray-400 text-sm mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
