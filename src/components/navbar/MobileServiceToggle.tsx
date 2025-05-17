
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileServiceMenu from './MobileServiceMenu';

interface MobileServiceToggleProps {
  onClose: () => void;
}

const MobileServiceToggle = ({ onClose }: MobileServiceToggleProps) => {
  const location = useLocation();
  const [showServices, setShowServices] = useState(false);
  
  const toggleServices = () => {
    setShowServices(!showServices);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <button 
        className={`nav-link ${location.pathname === '/services' ? 'active' : ''} flex items-center justify-between w-full text-xl font-medium py-2`}
        onClick={toggleServices}
        aria-expanded={showServices}
      >
        <span>Services</span>
        <span className="ml-2 text-2xl font-light">{showServices ? '−' : '+'}</span>
      </button>
      
      {showServices && <MobileServiceMenu onClose={onClose} />}
    </motion.div>
  );
};

export default MobileServiceToggle;
