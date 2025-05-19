
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serviceCategories } from './constants';

interface MobileServicesMenuProps {
  onClose: () => void;
}

const MobileServicesMenu = ({ onClose }: MobileServicesMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-2"
    >
      <div className="space-y-3 grid grid-cols-1 gap-1">
        {serviceCategories.map((service, index) => (
          <motion.div
            key={service.href}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Link 
              to={service.href} 
              className="block text-lg py-2 px-4 rounded-md text-center hover:bg-space-deep-blue/60 transition-all"
              onClick={onClose}
              style={{ color: service.color }}
            >
              {service.title}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileServicesMenu;
