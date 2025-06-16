
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const handleClose = () => {
    localStorage.setItem("cookieConsent", "limited");
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-space-dark-blue/95 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-xl">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Cookie Notice</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-300 mb-3">
              We use cookies to enhance your experience. 
              <Link to="/privacy" className="text-accent hover:underline ml-1">
                Privacy Policy
              </Link>
            </p>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-white text-xs px-3 py-1 h-7"
                onClick={handleAccept}
              >
                Accept
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 hover:bg-gray-800 text-gray-300 text-xs px-3 py-1 h-7"
                onClick={handleClose}
              >
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
