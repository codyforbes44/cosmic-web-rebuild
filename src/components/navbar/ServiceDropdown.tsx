
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serviceCategories } from './constants';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface ServiceDropdownProps {
  isActive: boolean;
}

const ServiceDropdown = ({ isActive }: ServiceDropdownProps) => {
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
            <NavigationMenuTrigger className={`nav-link bg-transparent ${isActive ? 'active' : ''} font-medium hover:text-white transition-colors duration-200`}>
              Services
              {isActive && (
                <motion.div 
                  className="h-0.5 bg-accent mt-1 absolute bottom-0 left-0 right-0" 
                  layoutId="navbar-indicator"
                />
              )}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 border border-gray-700">
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {serviceCategories.map((service) => (
                  <li key={service.href}>
                    <Link
                      to={service.href}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 focus:bg-gray-700"
                      )}
                    >
                      <div className="text-sm font-medium leading-none" style={{ color: service.color }}>
                        {service.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Explore our {service.title.toLowerCase()} solutions tailored for your business needs
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

export default ServiceDropdown;
