
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productCategories } from './constants';

interface MobileProductsMenuProps {
  onClose: () => void;
}

const MobileProductsMenu = ({ onClose }: MobileProductsMenuProps) => {
  return (
    <div className="pb-2 space-y-3 flex flex-col items-center mt-2">
      {productCategories.map((product, index) => (
        <motion.div
          key={product.href}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 * index }}
          className="text-center w-full"
        >
          <Link 
            to={product.href} 
            className="block text-lg py-2 px-4 rounded-md text-center hover:bg-space-deep-blue/60"
            onClick={onClose}
            style={{ color: product.color }}
          >
            {product.title}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default MobileProductsMenu;
