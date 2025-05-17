
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CPNHome: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Carrier Partner Network | ƷBI Technology Solutions</title>
        <meta name="description" content="A comprehensive platform connecting trucking companies and drivers, streamlining the employment transition process." />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient bg-gradient-to-br from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Carrier Partner Network
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Simplifying driver transitions between carriers with secure document management
                and seamless communication tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Get Started
                </Button>
                <Link to="/packages">
                  <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-900/30">
                    View Subscription Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-2xl"></div>
              <img 
                src="/lovable-uploads/b526c888-e2db-4d66-b8eb-fc8218763c99.png" 
                alt="Carrier Partner Network" 
                className="relative z-10 rounded-xl shadow-xl border border-purple-900/50"
              />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Driver-Company Matching",
                description: "Our advanced algorithm matches drivers with the right carriers based on preferences and requirements.",
                icon: "🔍"
              },
              {
                title: "Secure Document Exchange",
                description: "Transfer sensitive documents with enterprise-grade encryption and controlled access permissions.",
                icon: "🔒"
              },
              {
                title: "Streamlined Transitions",
                description: "Reduce onboarding time by up to 80% with our automated workflow and verification system.",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="bg-gray-900/50 border-purple-900/50 h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-purple-400">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-900/50"
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Why Choose Carrier Partner Network?
              </h2>
              <div className="space-y-4">
                {[
                  "Reduce driver transition time by up to 80%",
                  "Minimize paperwork and administrative overhead",
                  "Ensure compliance with regulatory requirements",
                  "Improve driver satisfaction during transitions",
                  "Access a network of verified carriers and drivers",
                  "Detailed analytics and reporting tools"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="text-green-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/contact">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-3xl"></div>
              <img 
                src="/lovable-uploads/b526c888-e2db-4d66-b8eb-fc8218763c99.png" 
                alt="Carrier Partner Network Dashboard" 
                className="relative z-10 rounded-xl shadow-xl border border-purple-900/50"
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-md p-8 md:p-12 rounded-2xl text-center border border-purple-800/50"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to streamline your driver transitions?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join leading carriers who are simplifying their onboarding process and improving driver retention with our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="lg">
                Get Started Today
              </Button>
              <Link to="/packages">
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-900/30" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default CPNHome;
