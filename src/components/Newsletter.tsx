
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { submitToSupabase } from '@/lib/supabase';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate email
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      // Submit to Supabase
      const { success, error } = await submitToSupabase('newsletter_subscribers', {
        email,
        createdAt: new Date().toISOString()
      });
      
      if (!success) throw error;
      
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail('');
    } catch (error: any) {
      toast.error(error?.message || "Failed to subscribe. Please try again.");
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-space-dark-blue relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Stay Updated with Cosmic Discoveries
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Subscribe to our newsletter to receive the latest astronomical news, events, and breathtaking images 
            directly to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent flex-grow max-w-md"
              required
            />
            <Button 
              type="submit"
              className="bg-accent hover:bg-accent/80 text-white px-8 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </span>
              ) : 'Subscribe'}
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
