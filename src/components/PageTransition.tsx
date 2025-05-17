
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  
  useEffect(() => {
    if (location !== displayLocation) {
      // Only show loader for 600ms minimum
      setIsLoading(true);
      setTransitionStage('fadeOut');
      
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 300);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [location, displayLocation]);
  
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-space-dark-blue/80 backdrop-blur-sm z-50"
          >
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
              <p className="text-white mt-4 font-medium">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        key={displayLocation.pathname}
        className="page-transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
