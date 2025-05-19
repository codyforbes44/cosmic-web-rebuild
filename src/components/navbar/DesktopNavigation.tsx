
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { navLinks } from './constants';
import DesktopNavLink from './DesktopNavLink';
import ServiceDropdown from './ServiceDropdown';
import ProductDropdown from './ProductDropdown';

interface DesktopNavigationProps {
  isActive: (path: string) => string;
  isServicesActive: boolean;
  isProductsActive: boolean;
}

const DesktopNavigation = ({ isActive, isServicesActive, isProductsActive }: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      {/* Home link */}
      <DesktopNavLink 
        key={navLinks[0].name}
        link={navLinks[0]} 
        isActive={isActive(navLinks[0].path) === 'active'} 
        index={0}
      />

      {/* Services Dropdown */}
      <ServiceDropdown isActive={isServicesActive} />

      {/* Products Dropdown */}
      <ProductDropdown isActive={isProductsActive} />

      {/* Remaining links */}
      {navLinks.slice(1).map((link, index) => (
        <DesktopNavLink 
          key={link.name}
          link={link} 
          isActive={isActive(link.path) === 'active'} 
          index={index + 1}
        />
      ))}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Link to="/get-quote">
          <Button className="bg-accent hover:bg-accent/80 text-white">Get a Quote</Button>
        </Link>
      </motion.div>
    </nav>
  );
};

export default DesktopNavigation;
