
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

// Define package data
const packages = [
  {
    id: "starter",
    name: "Starter",
    description: "For small businesses getting started with digital services",
    price: "$1,499",
    period: "per month",
    features: [
      "Up to 5 active projects",
      "Basic strategy consultation",
      "Standard implementation",
      "Email support (24h response time)",
      "Monthly reporting"
    ],
    cta: "Get Started",
    color: "#9b87f5", // Purple from your color palette
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing businesses needing comprehensive support",
    price: "$3,999",
    period: "per month",
    features: [
      "Up to 15 active projects",
      "Advanced strategy consultation",
      "Premium implementation",
      "Priority email & phone support",
      "Weekly reporting and insights",
      "Quarterly strategy reviews",
      "Custom integrations",
      "Dedicated account manager"
    ],
    cta: "Get Started",
    color: "#1EAEDB", // Bright Blue from your color palette
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations with complex needs",
    price: "Custom",
    period: "custom pricing",
    features: [
      "Unlimited active projects",
      "Executive strategy consultation",
      "Enterprise-grade implementation",
      "24/7 priority support",
      "Dedicated development team",
      "Custom reporting dashboards",
      "Monthly strategy reviews",
      "Advanced security features",
      "On-site training and support",
      "Custom SLA"
    ],
    cta: "Contact Us",
    color: "#0F172A", // Space dark blue from your color palette
    popular: false
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const Packages = () => {
  return (
    <>
      <Helmet>
        <title>Subscription Packages | ƷBI Technology Solutions</title>
        <meta name="description" content="Choose the perfect subscription package for your business needs. From startups to enterprise, we offer flexible solutions to help you succeed." />
      </Helmet>

      <Navbar />
      <StarBackground />
      
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Subscription Packages
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Choose the perfect plan for your business needs. Our flexible packages are designed to provide you with the right level of support and technology solutions.
            </p>
          </div>

          {/* Packages Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {packages.map((pkg) => (
              <motion.div 
                key={pkg.id} 
                variants={itemVariants}
                className={`relative ${pkg.popular ? 'lg:scale-[1.05]' : ''}`}
              >
                {pkg.popular && (
                  <div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: pkg.color, color: 'white' }}
                  >
                    Most Popular
                  </div>
                )}
                <Card className="h-full space-card overflow-hidden border-opacity-30 relative">
                  <CardHeader className="pb-0">
                    <div 
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: pkg.color }}
                    />
                    <div 
                      className="text-xl font-bold mb-2" 
                      style={{ color: pkg.color }}
                    >
                      {pkg.name}
                    </div>
                    <CardDescription className="text-gray-400">
                      {pkg.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-white">{pkg.price}</span>
                      <span className="text-gray-400 ml-2">{pkg.period}</span>
                    </div>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 shrink-0 text-brand-gold" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-6">
                    <Button 
                      className="w-full text-white transition-all duration-300"
                      style={{ 
                        backgroundColor: pkg.color,
                        boxShadow: `0 4px 14px 0 ${pkg.color}40`
                      }}
                      onClick={() => pkg.id === "enterprise" ? 
                        window.location.href="/contact" : 
                        window.location.href="/get-quote?plan=" + pkg.id
                      }
                    >
                      {pkg.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-gray-300 mb-8">
              Have more questions about our packages? Check out our <a href="/faq" className="underline">FAQ page</a> or <a href="/contact" className="underline">contact us</a>.
            </p>
          </div>

          {/* Compare Packages */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-8 text-white">Need Help Choosing?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We understand that each business has unique needs. Let our experts help you choose the right package for your specific requirements.
            </p>
            <Button 
              className="bg-brand-gold hover:bg-brand-gold/80 text-white"
              onClick={() => window.location.href="/contact?subject=Package%20Consultation"}
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Packages;
