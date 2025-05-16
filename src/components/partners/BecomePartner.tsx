
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Handshake } from "lucide-react";

const BecomePartner: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-tr from-space-deep-blue to-space-dark-blue rounded-2xl p-8 lg:p-12 relative overflow-hidden border border-gray-800 shadow-lg">
            {/* Background accent elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block p-3 bg-accent/20 rounded-full mb-6">
                  <Handshake className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Partner</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Join our partner ecosystem to collaborate on innovative solutions, expand your market reach, and drive mutual business growth.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="#" onClick={(e) => e.preventDefault()}>Download Partner Guide</a>
                  </Button>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-space-purple/20 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-medium mb-4 text-white">Partnership Process</h3>
                <ul className="space-y-3">
                  {[
                    "Initial consultation to understand mutual goals",
                    "Proposal and agreement on partnership terms",
                    "Onboarding and knowledge sharing sessions",
                    "Collaborative project development",
                    "Ongoing partnership management"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 bg-accent/20 text-accent h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomePartner;
