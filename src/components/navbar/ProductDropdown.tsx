
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productCategories } from './constants';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface ProductDropdownProps {
  isActive: boolean;
}

const ProductDropdown = ({ isActive }: ProductDropdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <NavigationMenu className="z-50">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`nav-link bg-transparent h-10 px-3 py-2 ${isActive ? 'active' : ''}`}>
              Products
              {isActive && (
                <motion.div 
                  className="h-0.5 bg-accent absolute bottom-0 left-0 right-0" 
                  layoutId="navbar-indicator"
                />
              )}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 border border-gray-700">
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                {productCategories.map((product) => (
                  <li key={product.href}>
                    <Link
                      to={`/products?product=${product.href.split('=')[1]}`}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 focus:bg-gray-700"
                      )}
                    >
                      <div className="text-sm font-medium leading-none" style={{ color: product.color }}>
                        {product.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                        {product.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
};

export default ProductDropdown;
