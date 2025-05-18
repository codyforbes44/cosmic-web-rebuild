
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serviceCategories } from './constants';

interface MobileServicesMenuProps {
  onClose: () => void;
}

const MobileServicesMenu = ({ onClose }: MobileServicesMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="nav-link text-xl">Services</div>
      <div className="pl-4 mt-2 space-y-2">
        {serviceCategories.map((service) => (
          <Link 
            key={service.href}
            to={service.href} 
            className="block text-gray-300 hover:text-white py-1"
            onClick={onClose}
            style={{ color: service.color }}
          >
            {service.title}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileServicesMenu;
