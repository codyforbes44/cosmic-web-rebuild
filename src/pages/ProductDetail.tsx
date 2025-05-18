
import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { productCategories } from "@/components/navbar/constants";
import { Check, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  // Find the corresponding product from our data
  const product = productCategories.find(p => {
    const slug = p.href.split('/').pop();
    return slug === productId;
  });
  
  // Redirect if product not found
  if (!product) {
    return <Navigate to="/products" replace />;
  }
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Demo request submitted! Our team will contact you shortly.");
    setIsDemoModalOpen(false);
  };

  // Content specific to each product
  const renderProductSpecificContent = () => {
    if (productId === '3bi-connect') {
      return (
        <>
          <section className="container mx-auto px-4 mb-16 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose 3BI Connect?</h2>
              <p className="text-gray-300 mb-8">
                We understand the unique challenges faced by trucking companies in managing and 
                retaining drivers. Our platform is built specifically to address these challenges.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Driver-Centric</h3>
                  <p className="text-gray-400">Built with drivers in mind, focusing on improving their experience and satisfaction.</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Data-Driven</h3>
                  <p className="text-gray-400">Powerful analytics help you make informed decisions to improve retention and operations.</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Time-Saving</h3>
                  <p className="text-gray-400">Streamlined workflows and automated processes that save you time and reduce paperwork.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="container mx-auto px-4 mb-16 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Driver profile management",
                  "Performance tracking",
                  "Satisfaction surveys",
                  "Communication tools",
                  "Retention analytics",
                  "Onboarding workflows",
                  "Document management",
                  "Integrated training modules"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 p-1 rounded-full" style={{ color: product.color }}>
                      <Check size={16} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      );
    } else if (productId === 'carrier-partner-network') {
      return (
        <>
          <section className="container mx-auto px-4 mb-16 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">A New Way to Connect</h2>
              <p className="text-gray-300 mb-8">
                Carrier Partner Network streamlines the employment transition process for trucking companies 
                and drivers, making it easier to find the right match and handle the paperwork securely.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Seamless Connections</h3>
                  <p className="text-gray-400">Connect trucking companies with qualified drivers through a streamlined platform.</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Secure Documents</h3>
                  <p className="text-gray-400">Simplify employment transitions with secure document handling and verification.</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Clear Communication</h3>
                  <p className="text-gray-400">Streamlined communication channels between carriers and drivers throughout the hiring process.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="container mx-auto px-4 mb-16 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Driver matching algorithm",
                  "Secure document exchange",
                  "Digital signature capabilities",
                  "Background check integration",
                  "Credential verification",
                  "Communication portal",
                  "Status tracking",
                  "Compliance management"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 p-1 rounded-full" style={{ color: product.color }}>
                      <Check size={16} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      );
    } else if (productId === 'truck-onboard') {
      return (
        <>
          <section className="container mx-auto px-4 mb-16 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Onboarding Made Simple</h2>
              <p className="text-gray-300 mb-8">
                TruckOnboard transforms the traditional driver orientation process into a streamlined 
                digital experience that can be completed remotely, saving time and reducing errors.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Remote Onboarding</h3>
                  <p className="text-gray-400">Digitize your onboarding process for drivers to complete from anywhere.</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Interactive Training</h3>
                  <p className="text-gray-400">Engage new drivers with interactive training modules that ensure compliance.</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Automated Workflows</h3>
                  <p className="text-gray-400">Reduce administrative burden with automated document processing and workflow management.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="container mx-auto px-4 mb-16 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Digital document collection",
                  "Interactive training modules",
                  "Progress tracking dashboard",
                  "Automated notifications",
                  "Electronic signature support",
                  "Compliance verification",
                  "Training assessment tools",
                  "Integration with HR systems"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 p-1 rounded-full" style={{ color: product.color }}>
                      <Check size={16} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      );
    }
  };
  
  return (
    <>
      <SEO 
        title={`${product.title} | ƷBI Enterprise Solutions`}
        description={product.description}
        keywords={`${product.title.toLowerCase()}, trucking software, driver management, enterprise solutions, ƷBI products`}
        image={product.image}
      />
      <Navbar />
      <main className="pt-24 pb-16 relative overflow-hidden">
        <StarBackground />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                  {product.title}
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">{product.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  className="bg-accent hover:bg-accent/80 text-white px-6 py-6 text-lg flex items-center gap-2"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  Request a Demo <ArrowRight size={18} />
                </Button>
                <Link to={`${product.href}/pricing`}>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-6 text-lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <span>Trusted by</span>
                <span className="font-medium">200+</span>
                <span>trucking companies</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="bg-gray-800/30 p-4 rounded-lg border border-gray-700"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-auto rounded shadow-lg"
              />
            </motion.div>
          </div>
        </section>
        
        {/* Product-specific content */}
        {renderProductSpecificContent()}
        
        {/* Testimonial Section */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-xl md:text-2xl italic text-gray-300 mb-6">
              "Implementing {product.title} completely transformed our driver onboarding process. 
              What used to take days now takes hours, and our driver satisfaction scores have improved significantly."
            </blockquote>
            <cite className="block text-gray-400 not-italic">
              — John Smith, Fleet Manager at TransCo Logistics
            </cite>
          </div>
        </section>
        
        {/* Pricing CTA */}
        <section className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-gray-300 mb-8">
                Join hundreds of transportation companies already using {product.title} to 
                transform their operations and improve driver satisfaction.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-accent hover:bg-accent/80 text-white px-8 py-6 text-lg"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  Schedule a Demo
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Demo Request Modal */}
        <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Request a Demo of {product.title}</DialogTitle>
              <DialogDescription>
                Fill out this form to schedule a personalized demo with our product experts.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDemoRequest} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Smith" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your Company" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" type="tel" placeholder="(123) 456-7890" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">What are you most interested in learning about?</Label>
                <Textarea id="message" placeholder="Tell us about your needs..." />
              </div>
              
              <div className="text-xs text-gray-500">
                By submitting this form, you agree to our <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-accent hover:bg-accent/80 text-white">
                  Request Demo
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
