
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ban } from 'lucide-react';
import { NavLink } from './constants';

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
      className="w-full"
    >
      {link.disabled ? (
        <span className="nav-link text-xl text-gray-500 cursor-not-allowed flex items-center justify-center py-2 px-4 rounded-md">
          {link.name}
          <Ban size={18} className="ml-2 opacity-70" />
        </span>
      ) : (
        <Link 
          to={link.path} 
          className={`nav-link text-xl ${isActive ? 'active' : ''} block text-center py-2 px-4 rounded-md hover:bg-space-deep-blue/60 transition-all`}
          onClick={onClose}
          aria-current={isActive ? 'page' : undefined}
        >
          {link.name}
        </Link>
      )}
    </motion.div>
  );
};

export default MobileNavLink;
