
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    
    // Only show the consent banner if the user hasn't consented yet
    if (!hasConsented) {
      // Small delay to prevent the banner from showing immediately on page load
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Store consent in localStorage
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const handleDecline = () => {
    // Store limited consent
    localStorage.setItem("cookieConsent", "limited");
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="bg-space-dark-blue/95 backdrop-blur-md border-t border-white/10 p-4 md:p-6 shadow-lg">
            <div className="container mx-auto max-w-screen-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Shield size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Cookie Consent</h3>
                    <p className="text-sm text-gray-300 max-w-2xl">
                      We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                      By clicking "Accept", you consent to our use of cookies. Read our{" "}
                      <Link to="/privacy" className="text-accent hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      to learn more.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 ml-0 md:ml-6 mt-3 md:mt-0">
                  <Button
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-800 text-gray-300"
                    onClick={handleDecline}
                  >
                    Decline
                  </Button>
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-white"
                    onClick={handleAccept}
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
