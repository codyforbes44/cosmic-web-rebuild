
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { navLinks } from './constants';
import MobileNavLink from './MobileNavLink';
import MobileServicesMenu from './MobileServicesMenu';

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
          id="mobile-menu"
          className="md:hidden bg-space-deep-blue/95 backdrop-blur-lg fixed top-0 left-0 w-full h-full pt-20 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="container mx-auto px-4 flex flex-col space-y-6">
            {/* Regular links */}
            {navLinks.slice(0, 1).map((link, index) => (
              <MobileNavLink 
                key={link.name}
                link={link} 
                isActive={isActive(link.path) === 'active'} 
                index={index}
                onClose={onClose}
              />
            ))}

            {/* Services with dropdown */}
            <MobileServicesMenu onClose={onClose} />

            {/* Remaining links */}
            {navLinks.slice(1).map((link, index) => (
              <MobileNavLink 
                key={link.name}
                link={link} 
                isActive={isActive(link.path) === 'active'} 
                index={index + 2}
                onClose={onClose}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Link to="/get-quote" onClick={onClose}>
                <Button className="btn-primary mt-4 w-full">Get a Quote</Button>
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
