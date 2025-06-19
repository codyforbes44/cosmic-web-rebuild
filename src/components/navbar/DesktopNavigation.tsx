
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { navLinks } from './constants';
import DesktopNavLink from './DesktopNavLink';
import ServiceDropdown from './ServiceDropdown';
import SecureDropdown from './SecureDropdown';
import ScrollToTopLink from '../ScrollToTopLink';
import { useAuth } from '@/components/auth/AuthProvider';

interface DesktopNavigationProps {
  isActive: (path: string) => string;
  isServicesActive: boolean;
  isProductsActive: boolean;
}

const DesktopNavigation = ({ isActive, isServicesActive }: DesktopNavigationProps) => {
  const { user } = useAuth();
  
  // Check if any secure page is active
  const isSecureActive = ['/admin', '/analytics', '/projects', '/weather', '/calculator', '/openai', '/huggingface', '/features', '/medical-diagnosis'].some(path => 
    isActive(path) === 'active'
  );

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

      {/* Remaining links */}
      {navLinks.slice(1).map((link, index) => (
        <DesktopNavLink 
          key={link.name}
          link={link} 
          isActive={isActive(link.path) === 'active'} 
          index={index + 1}
        />
      ))}

      {/* Secure Pages Dropdown - Moved to far right, only show if user is logged in */}
      {user && (
        <SecureDropdown isActive={isSecureActive} />
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <ScrollToTopLink to="/demo">
          <Button className="bg-accent hover:bg-accent/80 text-white">View Demo</Button>
        </ScrollToTopLink>
      </motion.div>
    </nav>
  );
};

export default DesktopNavigation;
