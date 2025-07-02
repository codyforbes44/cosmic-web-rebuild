
import React from "react";
import { Link } from "react-router-dom";
import DesktopNavLink from "./DesktopNavLink";
import ServiceDropdown from "./ServiceDropdown";
import SecureDropdown from "./SecureDropdown";
import { navigationItems, productCategories } from "./constants";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

interface DesktopNavigationProps {
  isActive: (path: string) => string;
  isServicesActive: boolean;
  isProductsActive: boolean;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ 
  isActive, 
  isServicesActive, 
  isProductsActive 
}) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-6">
          {navigationItems.map((item) => {
            if (item.name === "Services") {
              return <ServiceDropdown key={item.name} isActive={isServicesActive} />;
            }
            
            if (item.name === "Products") {
              return (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger 
                    className={`bg-transparent hover:bg-white/10 text-white ${
                      isProductsActive ? 'text-orange-500' : ''
                    }`}
                  >
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      {productCategories.map((product) => (
                        <Link
                          key={product.title}
                          to={product.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-white">
                            {product.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                            {product.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            return (
              <DesktopNavLink 
                key={item.name}
                to={item.href} 
                isActive={isActive(item.href) === 'active'}
              >
                {item.name}
              </DesktopNavLink>
            );
          })}
          
          <SecureDropdown isActive={false} />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
