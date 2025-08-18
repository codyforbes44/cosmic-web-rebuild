import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollToTopLink from '@/components/ScrollToTopLink';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';
import ServiceCaseStudy from '@/components/ServiceCaseStudy';
import LiveChat from '@/components/LiveChat/LiveChat';

interface ServicePageLayoutProps {
  children?: React.ReactNode;
  service: {
    id: string;
    name?: string;
    title?: string;
    description: string;
    color: string;
    image?: string;
    features?: any[];
    case_study: {
      title: string;
      client: string;
      description: string;
      results: any[];
    };
  };
  heroButtons?: React.ReactNode;
  showFeatures?: boolean;
  showCaseStudy?: boolean;
  showCTA?: boolean;
  className?: string;
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({
  children,
  service,
  heroButtons,
  showFeatures = true,
  showCaseStudy = true,
  showCTA = true,
  className = ""
}) => {
  const serviceName = service.title || service.name || '';
  
  return (
    <>
      <SEO 
        title={`${serviceName} - Professional Technology Solutions`}
        description={service.description}
        image={service.image}
      />
      <Navbar />
      <StarBackground />
      
      <main className={`min-h-screen pt-24 pb-24 ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: service.color }}>
                  {serviceName}
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  {heroButtons || (
                    <>
                      <ScrollToTopLink to="/get-quote">
                        <Button 
                          size="lg"
                          style={{ backgroundColor: service.color }}
                          className="text-white hover:opacity-90"
                        >
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </ScrollToTopLink>
                      <ScrollToTopLink to="/contact">
                        <Button variant="outline" size="lg">
                          Contact Us
                        </Button>
                      </ScrollToTopLink>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Features */}
          {showFeatures && service.features && (
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-space-deep-blue/30 p-6 rounded-xl border border-gray-800"
                  >
                    {feature.icon && <feature.icon className="w-12 h-12 mb-4" style={{ color: service.color }} />}
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
          
          {/* Custom Content */}
          {children}
          
          {/* Case Study */}
          {showCaseStudy && (
            <section className="mb-20">
              <ServiceCaseStudy 
                serviceId={service.id}
                title={service.case_study.title}
                client={service.case_study.client}
                description={service.case_study.description}
                results={service.case_study.results}
                color={service.color}
              />
            </section>
          )}
          
          {/* CTA Section */}
          {showCTA && (
            <section className="mt-20">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 rounded-2xl border border-gray-700">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to Get Started?
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                    Transform your business with our expert {serviceName.toLowerCase()} solutions.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <ScrollToTopLink to="/get-quote">
                      <Button 
                        size="lg"
                        style={{ backgroundColor: service.color }}
                        className="text-white hover:opacity-90"
                      >
                        Get a Quote
                      </Button>
                    </ScrollToTopLink>
                    <ScrollToTopLink to="/contact">
                      <Button variant="outline" size="lg">
                        Contact Us
                      </Button>
                    </ScrollToTopLink>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
      <LiveChat />
    </>
  );
};

export default ServicePageLayout;