
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MobileNavLink from './MobileNavLink';
import MobileServicesMenu from './MobileServicesMenu';
import { navLinks } from './constants';
import { Phone } from 'lucide-react';

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
          <div className="h-full flex flex-col justify-between py-20 px-6 overflow-y-auto">
            <div>
              <div className="mb-8 pb-6 border-b border-gray-700">
                <Link to="/get-quote" onClick={onClose} className="block mb-5">
                  <Button className="w-full bg-accent hover:bg-accent/80 text-white py-6 font-semibold text-base">
                    Get a Free Consultation
                  </Button>
                </Link>
                <a href="tel:+18177572828" className="flex items-center justify-center gap-2 w-full py-4 text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-800 transition-colors">
                  <Phone size={18} />
                  <span className="font-medium">(817) 757-2828</span>
                </a>
              </div>
              
              <nav className="space-y-6">
                {/* Home Link */}
                <MobileNavLink 
                  key={navLinks[0].name}
                  link={navLinks[0]} 
                  isActive={isActive(navLinks[0].path) === 'active'} 
                  index={0}
                  onClose={onClose}
                />
                
                {/* Services Link/Submenu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <button 
                    className={`nav-link ${location.pathname === '/services' ? 'active' : ''} flex items-center justify-between w-full text-xl font-medium py-2`}
                    onClick={toggleServices}
                    aria-expanded={showServices}
                  >
                    <span>Services</span>
                    <span className="ml-2 text-2xl font-light">{showServices ? '−' : '+'}</span>
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
                    index={index + 1}
                    onClose={onClose}
                  />
                ))}
              </nav>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="py-6 space-y-4 mt-8"
            >
              <div className="text-sm text-center space-y-3">
                <p className="text-gray-400">Trusted by industry leaders</p>
                <div className="flex justify-center space-x-6">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
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
