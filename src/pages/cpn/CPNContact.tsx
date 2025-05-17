
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const CPNContact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message. We will get back to you shortly!');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Carrier Partner Network</title>
        <meta name="description" content="Get in touch with the Carrier Partner Network team. We're here to answer your questions and help you get started." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800/40 mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have questions about Carrier Partner Network? Our team is here to help you get started.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-purple-400">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-gray-300">
                        First Name
                      </label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        placeholder="John" 
                        required 
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-gray-300">
                        Last Name
                      </label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Doe" 
                        required 
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      required 
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-300">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="How can we help you?" 
                      required 
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Please enter your message..." 
                      required 
                      rows={5}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-3 rounded-full mr-4">
                  <Mail className="text-purple-400 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Email Us</h3>
                  <p className="text-gray-400">support@carriernet.example.com</p>
                  <p className="text-gray-400">sales@carriernet.example.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-3 rounded-full mr-4">
                  <Phone className="text-purple-400 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Call Us</h3>
                  <p className="text-gray-400">Support: (800) 555-0123</p>
                  <p className="text-gray-400">Sales: (800) 555-0124</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-3 rounded-full mr-4">
                  <MapPin className="text-purple-400 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Visit Us</h3>
                  <p className="text-gray-400">
                    123 Trucking Lane<br />
                    Transport City, TX 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <h3 className="text-xl font-bold my-6 text-white">Business Hours</h3>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-300">Monday - Friday:</div>
                <div className="text-gray-400">9:00 AM - 6:00 PM EST</div>
                <div className="text-gray-300">Saturday:</div>
                <div className="text-gray-400">10:00 AM - 4:00 PM EST</div>
                <div className="text-gray-300">Sunday:</div>
                <div className="text-gray-400">Closed</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map or Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 rounded-xl overflow-hidden border border-gray-800 h-64 bg-gray-900/50"
        >
          {/* Placeholder for a map */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-900 to-purple-900/30">
            <p className="text-gray-400">Interactive Map Coming Soon</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CPNContact;
