
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ban } from 'lucide-react';
import { NavLink } from './constants';

interface MobileNavItemProps {
  link: NavLink;
  isActive: boolean;
  index: number;
  onClose: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ link, isActive, index, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative"
    >
      {link.disabled ? (
        <span className="nav-link text-lg text-gray-500 cursor-not-allowed flex items-center py-3 px-4">
          {link.name}
          <Ban size={18} className="ml-2 opacity-70" />
          <span className="sr-only">Unauthorized</span>
        </span>
      ) : (
        <Link 
          to={link.path} 
          className={`nav-link text-lg ${isActive ? 'active' : ''} py-3 px-4 block w-full hover:text-white transition-colors duration-200`}
          onClick={onClose}
          aria-current={isActive ? 'page' : undefined}
        >
          {link.name}
          {isActive && <span className="h-0.5 bg-accent block mt-1 rounded"></span>}
        </Link>
      )}
    </motion.div>
  );
};

export default MobileNavItem;
