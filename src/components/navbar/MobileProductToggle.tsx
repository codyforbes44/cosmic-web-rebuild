
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileProductMenu from './MobileProductMenu';

interface MobileProductToggleProps {
  onClose: () => void;
}

const MobileProductToggle: React.FC<MobileProductToggleProps> = ({ onClose }) => {
  const location = useLocation();
  const [showProducts, setShowProducts] = useState(false);
  
  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <button 
        className={`nav-link ${location.pathname === '/products' ? 'active' : ''} flex items-center justify-between w-full text-lg font-medium py-2`}
        onClick={toggleProducts}
        aria-expanded={showProducts}
      >
        <span>Products</span>
        <span className="ml-2 text-2xl font-light">{showProducts ? '−' : '+'}</span>
      </button>
      
      {showProducts && <MobileProductMenu onClose={onClose} />}
    </motion.div>
  );
};

export default MobileProductToggle;
