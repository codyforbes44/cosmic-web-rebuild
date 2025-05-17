
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productCategories } from './constants';
import { cn } from "@/lib/utils";
import { ExternalLink } from 'lucide-react';
import { simulateSubdomain } from '@/lib/subdomain';
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
  // Handler for CPN subdomain simulation in development
  const handleCPNClick = (e: React.MouseEvent) => {
    // In development environment, simulate the subdomain
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      e.preventDefault();
      simulateSubdomain('cpn');
    }
    // In production, this would navigate to the actual subdomain
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative"
    >
      <NavigationMenu className="z-50">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`nav-link bg-transparent ${isActive ? 'active' : ''} font-medium hover:text-white transition-colors duration-200 px-4 py-2`}>
              Products
              {isActive && (
                <motion.div 
                  className="h-0.5 bg-accent mt-1 absolute bottom-0 left-0 right-0" 
                  layoutId="navbar-indicator"
                />
              )}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 border border-gray-700">
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                {productCategories.map((product) => {
                  // Special handling for Carrier Partner Network to use subdomain
                  if (product.href.includes('cpn')) {
                    return (
                      <li key={product.href}>
                        <a
                          href="https://cpn.zbi-consulting.com"
                          onClick={handleCPNClick}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 focus:bg-gray-700"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium leading-none" style={{ color: product.color }}>
                              {product.title}
                            </span>
                            <ExternalLink size={14} className="text-gray-400" />
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-400 mt-1">
                            {product.description} (Dedicated Portal)
                          </p>
                        </a>
                      </li>
                    );
                  }
                  
                  // Regular product links
                  return (
                    <li key={product.href}>
                      <Link
                        to={product.href}
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
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
};

export default ProductDropdown;
