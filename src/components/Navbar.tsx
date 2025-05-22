
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileNavigation from './navbar/MobileNavigation';

const Navbar = () => {
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

    // Handle escape key for mobile nav
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
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

  const isActive = (path: string) => {
    if (path === '/services') {
      return location.pathname === path ? 'active' : '';
    }
    return location.pathname === path ? 'active' : '';
  };

  const isServicesActive = location.pathname === '/services';
  const isProductsActive = location.pathname.startsWith('/products');

  const closeMobileMenu = () => setIsMobileNavOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-300 ${
        isScrolled ? 'bg-space-dark-blue/90 backdrop-blur-md py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 z-[9991]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" 
              alt="ƷBI Logo" 
              className="h-9 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavigation 
          isActive={isActive} 
          isServicesActive={isServicesActive} 
          isProductsActive={isProductsActive} 
        />

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-white p-1 z-[9992]" 
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-menu"
          style={{ position: 'relative' }}
        >
          {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNavigation 
        isOpen={isMobileNavOpen} 
        isActive={isActive} 
        onClose={closeMobileMenu}
      />
    </header>
  );
};

export default Navbar;
