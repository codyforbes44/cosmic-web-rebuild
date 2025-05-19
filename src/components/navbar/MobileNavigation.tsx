
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MobileNavLink from './MobileNavLink';
import MobileServicesMenu from './MobileServicesMenu';
import MobileProductsMenu from './MobileProductsMenu';
import { navLinks } from './constants';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import WeatherWidget from '../footer/WeatherWidget';

interface MobileNavigationProps {
  isOpen: boolean;
  isActive: (path: string) => string;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, isActive, onClose }: MobileNavigationProps) => {
  const location = useLocation();
  const [showServices, setShowServices] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  
  const toggleServices = () => {
    setShowServices(!showServices);
    if (!showServices) setShowProducts(false);
  };

  const toggleProducts = () => {
    setShowProducts(!showProducts);
    if (!showProducts) setShowServices(false);
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
          <div className="h-full flex flex-col justify-between py-6 overflow-y-auto">
            {/* Top action area with fixed position */}
            <div className="sticky top-0 z-20 px-6 pb-4 pt-2 bg-space-dark-blue/90 backdrop-blur-md border-b border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <WeatherWidget 
                  className="py-1 px-2 bg-space-deep-blue/70 border border-brand-gold/30 rounded-lg flex-1" 
                  title="" 
                  units="imperial"
                />
              </div>
            </div>
            
            {/* Main navigation area with scrolling - Added mt-4 for margin between header and nav */}
            <nav className="flex-1 px-6 py-5 space-y-4 overflow-y-auto mt-4">
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
                  className={`nav-link text-xl ${location.pathname === '/services' ? 'active' : ''} flex items-center justify-between w-full py-2`}
                  onClick={toggleServices}
                  aria-expanded={showServices}
                >
                  <span>Services</span>
                  <span className="ml-2 text-xl leading-none">{showServices ? '−' : '+'}</span>
                </button>
                
                {showServices && (
                  <MobileServicesMenu onClose={onClose} />
                )}
              </motion.div>

              {/* Products Link/Submenu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <button 
                  className={`nav-link text-xl ${location.pathname.startsWith('/products') ? 'active' : ''} flex items-center justify-between w-full py-2`}
                  onClick={toggleProducts}
                  aria-expanded={showProducts}
                >
                  <span>Products</span>
                  <span className="ml-2 text-xl leading-none">{showProducts ? '−' : '+'}</span>
                </button>
                
                {showProducts && (
                  <MobileProductsMenu onClose={onClose} />
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
            
            {/* Social links section - fixed at bottom */}
            <div className="px-6 pt-4 pb-6 border-t border-gray-800 bg-space-dark-blue/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="space-y-4"
              >
                <div className="text-sm text-center">
                  <p className="text-gray-400 mb-4">Connect with us</p>
                  <div className="flex justify-center space-x-5">
                    <a 
                      href="https://www.facebook.com/3bi.io" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-space-deep-blue/60 p-3 rounded-full hover:bg-space-deep-blue hover:text-brand-gold transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://x.com/3bi_io" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-space-deep-blue/60 p-3 rounded-full hover:bg-space-deep-blue hover:text-brand-gold transition-all"
                      aria-label="Twitter"
                    >
                      <Twitter size={20} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/3biio" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-space-deep-blue/60 p-3 rounded-full hover:bg-space-deep-blue hover:text-brand-gold transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
