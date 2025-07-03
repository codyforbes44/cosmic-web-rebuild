
import React from "react";
import { Link } from "react-router-dom";
import MobileNavLink from "./MobileNavLink";
import { navigationItems, productCategories, securePages, serviceCategories } from "./constants";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import UserMenu from "../auth/UserMenu";

interface MobileMenuContentProps {
  onClose: () => void;
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({ onClose }) => {
  const handleItemClick = () => {
    onClose();
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {navigationItems.map((item) => {
        if (item.name === "Services") {
          return (
            <Collapsible key={item.name}>
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-white hover:text-orange-500 py-2">
                Services
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 space-y-2">
                {serviceCategories.map((service) => (
                  <Link
                    key={service.title}
                    to={service.href}
                    onClick={handleItemClick}
                    className="block text-gray-300 hover:text-orange-500 py-2 text-sm"
                  >
                    {service.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }
        
        if (item.name === "Products") {
          return (
            <Collapsible key={item.name}>
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-white hover:text-orange-500 py-2">
                Products
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 space-y-2">
                {productCategories.map((product) => (
                  <Link
                    key={product.title}
                    to={product.href}
                    onClick={handleItemClick}
                    className="block text-gray-300 hover:text-orange-500 py-2 text-sm"
                  >
                    {product.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        return (
          <MobileNavLink key={item.name} to={item.href} onClick={handleItemClick}>
            {item.name}
          </MobileNavLink>
        );
      })}

      {/* Secure Pages Section */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-white hover:text-orange-500 py-2">
          Secure Access
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 space-y-2">
          {securePages.map((page) => (
            <Link
              key={page.title}
              to={page.href}
              onClick={handleItemClick}
              className="block text-gray-300 hover:text-orange-500 py-2 text-sm"
            >
              {page.title}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* User Menu */}
      <div className="pt-4 border-t border-gray-700">
        <UserMenu />
      </div>
    </div>
  );
};
