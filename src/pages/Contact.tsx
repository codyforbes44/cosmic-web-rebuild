
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Contact Us
              </h1>
              <p className="text-gray-300 text-lg">
                Have questions, suggestions, or just want to discuss the cosmos? We'd love to hear from you!
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <div className="space-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Website Feedback</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="education">Educational Programs</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                      required
                    ></textarea>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/80 text-white py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <div className="space-card p-8 rounded-xl mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-accent/20 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Email</h3>
                        <p className="text-gray-300">info@astrovision.com</p>
                        <p className="text-gray-300">support@astrovision.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-accent/20 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Phone</h3>
                        <p className="text-gray-300">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-accent/20 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Location</h3>
                        <p className="text-gray-300">123 Cosmic Way</p>
                        <p className="text-gray-300">Starview, SV 12345</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-card p-8 rounded-xl">
                  <h2 className="text-2xl font-bold mb-6 text-white">Follow Us</h2>
                  <p className="text-gray-300 mb-6">
                    Stay connected with us on social media for the latest updates, stunning images, and cosmic discoveries.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto mt-16">
              <div className="space-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white font-bold mb-2">How can I contribute content?</h3>
                    <p className="text-gray-300">
                      We welcome contributions from passionate astronomers and writers. Please contact us through the form above with samples of your work.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Do you offer educational programs?</h3>
                    <p className="text-gray-300">
                      Yes, we offer virtual workshops, webinars, and educational resources for schools and astronomy clubs. Contact us for more information.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Can I use your images for my project?</h3>
                    <p className="text-gray-300">
                      Many of our images are available under Creative Commons licenses. Please check the specific image rights or contact us for permission.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">How can I support AstroVision?</h3>
                    <p className="text-gray-300">
                      You can support us by subscribing to our newsletter, following us on social media, and sharing our content with others who love astronomy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
