
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MobileNavLink from './MobileNavLink';
import MobileServicesMenu from './MobileServicesMenu';
import MobileProductsMenu from './MobileProductsMenu';
import { navLinks } from './constants';
import { Phone, Facebook, Twitter, Linkedin } from 'lucide-react';
import WeatherWidget from '../footer/WeatherWidget';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";

interface MobileNavigationProps {
  isOpen: boolean;
  isActive: (path: string) => string;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, isActive, onClose }: MobileNavigationProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
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
          <div className="h-full flex flex-col justify-between overflow-y-auto">
            {/* Top section with call-to-actions and compact weather */}
            <div className="px-6 pt-20 pb-4 sticky top-0 bg-space-dark-blue/95 z-10 shadow-md">
              <div className="grid grid-cols-1 gap-3">
                <WeatherWidget 
                  className="py-1 px-3 bg-space-deep-blue/70 border border-brand-gold/30 rounded-lg shadow-lg mb-3" 
                  title="" 
                  units="imperial"
                />
                
                <Link to="/get-quote" onClick={onClose} className="block">
                  <Button className="w-full bg-accent hover:bg-accent/80 text-white py-5 font-semibold text-base">
                    Get a Free Quote
                  </Button>
                </Link>
                
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full border-gray-600 text-white">
                      <Phone size={18} className="mr-2" />
                      <span className="font-medium">(123) 456-7890</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-space-dark-blue text-white border-t border-gray-700">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Main Line</p>
                          <a href="tel:+11234567890" className="flex items-center text-brand-gold text-lg">
                            <Phone size={18} className="mr-2" />(123) 456-7890
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Support</p>
                          <a href="tel:+18001234567" className="flex items-center text-brand-gold text-lg">
                            <Phone size={18} className="mr-2" />(800) 123-4567
                          </a>
                        </div>
                        <div className="pt-2">
                          <p className="text-center text-sm text-gray-400 mb-3">
                            Our team is available Monday-Friday, 9am-5pm EST
                          </p>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
            
            <nav className="px-6 pb-6 flex-grow overflow-y-auto">
              <div className="space-y-5 py-5">
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
                    className={`nav-link text-xl ${location.pathname === '/services' ? 'active' : ''} flex items-center justify-between w-full`}
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

                {/* Products Link/Submenu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <button 
                    className={`nav-link text-xl ${location.pathname.startsWith('/products') ? 'active' : ''} flex items-center justify-between w-full`}
                    onClick={toggleProducts}
                    aria-expanded={showProducts}
                  >
                    <span>Products</span>
                    <span className="ml-2 text-2xl font-light">{showProducts ? '−' : '+'}</span>
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
              </div>
            </nav>
            
            {/* Social links section at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="py-6 px-6 border-t border-gray-800"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
