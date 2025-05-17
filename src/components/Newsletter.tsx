
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { submitToSupabase } from '@/lib/supabase';
import { trackFormSubmission } from '@/lib/tracking';
import { useLocation } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter = () => {
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
    <section className="py-20 bg-space-dark-blue relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            initial={{ opacity: Math.random() * 0.7 + 0.3 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              repeatType: "reverse", 
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: "white",
              borderRadius: "50%",
              position: "absolute"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-space-deep-blue/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  className="bg-accent/10 p-3 rounded-full inline-flex mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Download className="h-6 w-6 text-accent" />
                </motion.div>
                
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Get Our Free Guide: <span className="text-accent">Technology ROI Blueprint</span>
                </motion.h2>
                
                <motion.p 
                  className="text-gray-300 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Learn how to calculate the real ROI of technology investments and convince stakeholders with our step-by-step guide. Plus receive industry insights and exclusive offers.
                </motion.p>
                
                <motion.ul
                  className="space-y-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {[
                    "ROI calculation templates",
                    "Case studies with real numbers",
                    "Stakeholder presentation guide",
                    "Implementation checklist"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </motion.ul>
              </div>
              
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
