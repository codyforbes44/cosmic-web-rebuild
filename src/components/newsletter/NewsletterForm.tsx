
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { submitToSupabase } from '@/lib/supabase';
import { trackFormSubmission } from '@/lib/tracking';
import { useLocation } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const location = useLocation();

  const validateEmail = (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !isValid) {
      toast.error("Please enter a valid email address");
      setIsValid(false);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { success, error } = await submitToSupabase('newsletter_subscribers', {
        email,
        created_at: new Date().toISOString()
      });
      
      if (!success) throw error;
      
      // Track newsletter subscription
      await trackFormSubmission('newsletter', { email }, location.pathname);
      
      toast.success("Thank you! Your free guide has been sent to your email.");
      setEmail('');
      setIsValid(null);
      setIsSubscribed(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (error: any) {
      // Check if it's a duplicate email error
      if (error?.message?.includes('duplicate') || error?.message?.includes('unique constraint')) {
        toast.error("This email is already subscribed to our newsletter.");
      } else {
        toast.error(error?.message || "Failed to subscribe. Please try again.");
      }
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-4 text-white">Download Your Free Guide</h3>
      
      <div className="relative">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={handleInputChange}
          className={`px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            isValid === false
              ? 'bg-red-900/20 border border-red-500/50 focus:ring-red-500'
              : isValid === true
              ? 'bg-green-900/20 border border-green-500/50 focus:ring-green-500'
              : 'bg-gray-800 border border-gray-700 focus:ring-accent'
          }`}
          disabled={isSubmitting || isSubscribed}
          aria-label="Email address"
          aria-invalid={isValid === false}
          aria-describedby={isValid === false ? 'email-error' : undefined}
        />
        
        {isValid === false && email && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
        
        {isValid === true && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        )}
        
        {isValid === false && (
          <p id="email-error" className="mt-1 text-sm text-red-500 text-left">
            Please enter a valid email address
          </p>
        )}
      </div>
      
      <div className="mt-3">
        <Button 
          type="submit"
          className={`w-full bg-accent hover:bg-accent/80 text-white px-8 py-3 h-auto ${isSubmitting ? 'opacity-90' : ''}`}
          disabled={isSubmitting || isSubscribed}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : isSubscribed ? (
            <span className="flex items-center justify-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              Guide Sent!
            </span>
          ) : 'Get Instant Access'}
        </Button>
      </div>
      
      <p className="mt-4 text-sm text-gray-400 text-center">
        We respect your privacy and will never share your information.
        <br />
        Unsubscribe anytime with one click.
      </p>
    </motion.form>
  );
};

export default NewsletterForm;
