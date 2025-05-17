
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MobileNavLink from './MobileNavLink';
import MobileServicesMenu from './MobileServicesMenu';
import { navLinks } from './constants';

interface MobileNavigationProps {
  isOpen: boolean;
  isActive: (path: string) => string;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, isActive, onClose }: MobileNavigationProps) => {
  const location = useLocation();
  const [showServices, setShowServices] = useState(false);
  
  const toggleServices = () => {
    setShowServices(!showServices);
  };
  
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
          <div className="h-full flex flex-col justify-between py-24 px-6 overflow-y-auto">
            <div>
              <nav className="space-y-6">
                {/* Home Link */}
                {navLinks.slice(0, 1).map((link, index) => (
                  <MobileNavLink 
                    key={link.name}
                    link={link} 
                    isActive={isActive(link.path) === 'active'} 
                    index={index}
                    onClose={onClose}
                  />
                ))}
                
                {/* Services Link/Submenu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <button 
                    className={`nav-link text-xl ${location.pathname === '/services' ? 'active' : ''}`}
                    onClick={toggleServices}
                  >
                    Services
                    <span className="ml-2">{showServices ? '−' : '+'}</span>
                  </button>
                  
                  {showServices && (
                    <MobileServicesMenu onClose={onClose} />
                  )}
                </motion.div>
                
                {/* Remaining Links */}
                {navLinks.slice(1).map((link, index) => (
                  <MobileNavLink 
                    key={link.name}
                    link={link} 
                    isActive={isActive(link.path) === 'active'} 
                    index={index + 2}
                    onClose={onClose}
                  />
                ))}
              </nav>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="py-6"
            >
              <Link to="/get-quote" onClick={onClose}>
                <Button className="w-full bg-accent hover:bg-accent/80 text-white py-6">
                  Get a Free Quote
                </Button>
              </Link>
              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>Need immediate assistance?</p>
                <a href="tel:+11234567890" className="text-accent hover:underline">
                  Call (123) 456-7890
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
