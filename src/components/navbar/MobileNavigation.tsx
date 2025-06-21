
import React from "react";
import { Link } from "react-router-dom";
import MobileNavLink from "./MobileNavLink";
import MobileServicesMenu from "./MobileServicesMenu";
import { navigationItems, productCategories, securePages } from "./constants";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import UserMenu from "../auth/UserMenu";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const handlePartnerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    // Redirect to contact page when clicking Partners
    window.location.href = '/contact';
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-space-dark-blue border-t border-gray-700">
      <div className="px-4 py-4 space-y-4">
        {navigationItems.map((item) => {
          if (item.name === "Services") {
            return <MobileServicesMenu key={item.name} onClose={onClose} onItemClick={onClose} />;
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
                      onClick={onClose}
                      className="block text-gray-300 hover:text-orange-500 py-2 text-sm"
                    >
                      {product.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          if (item.name === "Partners") {
            return (
              <MobileNavLink 
                key={item.name}
                to={item.href} 
                onClick={handlePartnerClick}
              >
                {item.name}
              </MobileNavLink>
            );
          }

          return (
            <MobileNavLink key={item.name} to={item.href} onClick={onClose}>
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
                onClick={onClose}
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
    </div>
  );
};

export default MobileNavigation;
