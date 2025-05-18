
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MobileNavLink from './MobileNavLink';
import { navLinks } from './constants';
import { Phone, BarChart2 } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  isActive: (path: string) => string;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, isActive, onClose }: MobileNavigationProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-10 bg-space-dark-blue/95 backdrop-blur-sm md:hidden"
        >
          <div className="h-full flex flex-col justify-between py-20 px-6 overflow-y-auto">
            <div>
              <div className="mb-8 pb-4 border-b border-gray-700">
                <Link to="/get-quote" onClick={onClose} className="block mb-4">
                  <Button className="w-full bg-accent hover:bg-accent/80 text-white py-5 font-semibold text-base">
                    Get a Free Quote
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <a href="tel:+11234567890" className="flex items-center justify-center gap-2 flex-1 py-3 text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-800 transition-colors">
                    <Phone size={18} />
                    <span className="font-medium">(123) 456-7890</span>
                  </a>
                  
                  <Link 
                    to="/analytics" 
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white bg-accent/20 border border-accent/30 rounded-md hover:bg-accent/30 transition-colors"
                  >
                    <BarChart2 size={18} />
                    <span className="font-medium">Analytics</span>
                  </Link>
                </div>
              </div>
              
              <nav className="space-y-5">
                {/* All nav links */}
                {navLinks.map((link, index) => (
                  <MobileNavLink 
                    key={link.name}
                    link={link} 
                    isActive={isActive(link.path) === 'active'} 
                    index={index}
                    onClose={onClose}
                  />
                ))}
              </nav>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="py-6 space-y-4"
            >
              <div className="text-sm text-center space-y-2">
                <p className="text-gray-400">Trusted by industry leaders</p>
                <div className="flex justify-center space-x-4">
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
