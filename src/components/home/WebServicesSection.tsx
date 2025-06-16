
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Code, Smartphone, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import DemoRequestModal from '../products/DemoRequestModal';

const WebServicesSection = () => {
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

  const pricingTiers = [
    {
      name: "Starter Website",
      price: "$497",
      originalPrice: "$1,500",
      description: "Perfect for small businesses getting started online",
      features: [
        "5-page responsive website",
        "Mobile-optimized design",
        "Contact form integration",
        "Basic SEO optimization",
        "1 month free support",
        "Free SSL certificate"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Professional Suite",
      price: "$997",
      originalPrice: "$3,500",
      description: "Complete solution for growing businesses",
      features: [
        "Up to 15 pages",
        "Custom design & branding",
        "CMS integration",
        "Advanced SEO package",
        "Analytics dashboard",
        "3 months free support",
        "Payment gateway setup",
        "Social media integration"
      ],
      popular: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Enterprise Platform",
      price: "$1,997",
      originalPrice: "$8,000",
      description: "Full-scale web application for large organizations",
      features: [
        "Unlimited pages",
        "Custom web application",
        "User authentication system",
        "Database integration",
        "API development",
        "6 months free support",
        "Performance optimization",
        "Security implementation",
        "Third-party integrations"
      ],
      popular: false,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-space-deep-blue/20 to-space-dark-blue/40 relative overflow-hidden">
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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent mb-4 text-sm md:text-base tracking-wider font-medium px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              LIMITED TIME OFFER - SAVE UP TO 75%
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Professional Web Development
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-8">
              Launch your digital presence with our expert web development services. 
              <span className="text-accent block mt-2">Introductory pricing available for the first 50 clients!</span>
            </p>
          </motion.div>
        </div>

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

        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Introductory Pricing
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Get professional web development at unbeatable prices. Limited time offer for new clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative ${tier.popular ? 'lg:scale-105' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-accent to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <Card className={`bg-space-deep-blue/60 backdrop-blur-sm border-2 ${tier.popular ? 'border-accent' : 'border-gray-800'} hover:border-gray-600 transition-all duration-300 h-full`}>
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-white mb-2">{tier.name}</CardTitle>
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      <span className="text-gray-400 line-through text-xl">{tier.originalPrice}</span>
                    </div>
                    <div className="text-accent font-semibold">
                      Save {Math.round((1 - parseInt(tier.price.replace('$', '').replace(',', '')) / parseInt(tier.originalPrice.replace('$', '').replace(',', ''))) * 100)}%
                    </div>
                  </div>
                  <p className="text-gray-300">{tier.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white py-6 text-lg font-semibold`}
                    onClick={() => setDemoModalOpen(true)}
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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
            Limited spots available at these introductory prices!
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

export default WebServicesSection;
