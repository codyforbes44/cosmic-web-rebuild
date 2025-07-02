
import React from "react";
import { Link } from "react-router-dom";
import DesktopNavLink from "./DesktopNavLink";
import ServiceDropdown from "./ServiceDropdown";
import SecureDropdown from "./SecureDropdown";
import { navigationItems, productCategories } from "./constants";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
                    className={`nav-link bg-transparent h-10 px-3 py-2 ${
                      isProductsActive ? 'active' : ''
                    }`}
                  >
                    Products
                    {isProductsActive && (
                      <div className="h-0.5 bg-accent absolute bottom-0 left-0 right-0" />
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-gray-800 border border-gray-700">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {productCategories.map((product) => (
                        <li key={product.href}>
                          <Link
                            to={product.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 focus:bg-gray-700"
                            )}
                          >
                            <div className="text-sm font-medium leading-none text-white">
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
