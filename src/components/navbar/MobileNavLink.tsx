
import { motion } from 'framer-motion';
import { Ban } from 'lucide-react';
import { NavLink } from './constants';
import ScrollToTopLink from '../ScrollToTopLink';

interface MobileNavLinkProps {
  link: NavLink;
  isActive: boolean;
  index: number;
  onClose: () => void;
}

const MobileNavLink = ({ link, isActive, index, onClose }: MobileNavLinkProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {link.disabled ? (
        <span className="nav-link text-xl text-gray-500 cursor-not-allowed flex items-center py-2">
          {link.name}
          <Ban size={18} className="ml-2 opacity-70" />
        </span>
      ) : (
        <ScrollToTopLink 
          to={link.path} 
          className={`nav-link text-xl block py-2 ${isActive ? 'active' : ''}`}
          onClick={onClose}
          aria-current={isActive ? 'page' : undefined}
        >
          {link.name}
        </ScrollToTopLink>
      )}
    </motion.div>
  );
};

export default MobileNavLink;
