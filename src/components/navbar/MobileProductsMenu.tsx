
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productCategories } from './constants';

interface MobileProductsMenuProps {
  onClose: () => void;
}

const MobileProductsMenu = ({ onClose }: MobileProductsMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="ml-4 mt-1 mb-3 pl-3 border-l-2 border-gray-700 space-y-2">
        {productCategories.map((product, index) => (
          <motion.div
            key={product.href}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.05 * index }}
            className="py-1"
          >
            <Link 
              to={`/products?product=${product.href}`}
              className="block text-center text-base hover:text-white py-1"
              onClick={onClose}
              style={{ color: product.color }}
            >
              {product.title}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileProductsMenu;
