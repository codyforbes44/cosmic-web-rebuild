
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

const MobileNavItem = ({ link, isActive, index, onClose }: MobileNavItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {link.disabled ? (
        <span className="nav-link text-xl text-gray-500 cursor-not-allowed flex items-center py-3 px-2">
          {link.name}
          <Ban size={18} className="ml-2 opacity-70" />
          <span className="sr-only">Unauthorized</span>
        </span>
      ) : (
        <Link 
          to={link.path} 
          className={`nav-link text-xl ${isActive ? 'active' : ''} py-3 px-2 block w-full`}
          onClick={onClose}
          aria-current={isActive ? 'page' : undefined}
        >
          {link.name}
        </Link>
      )}
    </motion.div>
  );
};

export default MobileNavItem;
