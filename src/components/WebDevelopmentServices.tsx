import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import DemoRequestModal from './products/DemoRequestModal';

const WebDevelopmentServices = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const services = [
    {
      icon: Globe,
      title: "Custom Websites",
      description: "Professional, responsive websites tailored to your business needs",
      color: "#3B82F6"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      color: "#10B981"
    },
    {
      icon: Code,
      title: "Web Applications",
      description: "Complex web apps with advanced functionality and user management",
      color: "#8B5CF6"
    },
    {
      icon: Zap,
      title: "E-commerce Solutions",
      description: "Complete online stores with payment processing and inventory management",
      color: "#F59E0B"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-space-deep-blue/20 to-space-dark-blue/40 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <DemoRequestModal 
        isOpen={demoModalOpen} 
        onOpenChange={setDemoModalOpen} 
        productTitle="Web Development Services"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Professional Web Development
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-8">
              Launch your digital presence with our expert web development services.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-space-deep-blue/50 border-gray-800 hover:border-gray-600 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <service.icon className="h-8 w-8 mr-3" style={{ color: service.color }} />
                    <CardTitle className="text-white text-lg">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-accent/10 to-purple-600/10 border border-accent/20 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Ready to Launch Your Website?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their business with our web development services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
              onClick={() => setDemoModalOpen(true)}
            >
              Start Your Project Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg w-full sm:w-auto"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              No upfront payment required
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              30-day money-back guarantee
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Free consultation included
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebDevelopmentServices;