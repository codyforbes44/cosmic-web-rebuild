
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CPNNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav when route changes
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Handle scroll events for navbar appearance
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-purple-900/90 backdrop-blur-md py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 z-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xl font-bold text-white">Carrier Partner Network</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <Link 
                to={`${link.path}`} 
                className={`nav-link text-base font-medium hover:text-white transition-colors duration-200 px-4 py-2 block ${
                  location.pathname === link.path ? 'text-white' : 'text-gray-300'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    className="h-0.5 bg-purple-400 mt-1 absolute bottom-0 left-0 right-0" 
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Login Button */}
        <Link to="/auth" className="hidden md:block">
          <Button className="bg-purple-600 hover:bg-purple-700">Login</Button>
        </Link>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-white p-1 z-20" 
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileNavOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileNavOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 z-10 bg-gray-900/95 backdrop-blur-md flex flex-col pt-20 px-4"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-lg py-3 px-4 ${
                  location.pathname === link.path ? 'text-white font-medium' : 'text-gray-300'
                }`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                {link.name}
                {location.pathname === link.path && (
                  <div className="h-0.5 bg-purple-400 mt-1 rounded"></div>
                )}
              </Link>
            ))}
            <Link to="/auth" onClick={() => setIsMobileNavOpen(false)}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
                Login
              </Button>
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default CPNNavbar;
