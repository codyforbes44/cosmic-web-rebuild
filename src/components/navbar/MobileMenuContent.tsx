import React from "react";
import { Link } from "react-router-dom";
import MobileNavLink from "./MobileNavLink";
import { 
  mainNavigation, 
  productCategories, 
  securePages, 
  serviceCategories,
  adminNavigation,
  isExternalLink
} from "@/config/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ExternalLink, Shield, Lock } from "lucide-react";
import UserMenu from "../auth/UserMenu";
import { useAuth } from "../auth/AuthProvider";
import { useAdminRole } from "@/hooks/useAdminRole";

interface MobileMenuContentProps {
  onClose: () => void;
}

/**
 * MobileMenuContent - Mobile navigation menu with improved touch targets
 * 
 * Features:
 * - 44px minimum touch targets (WCAG compliant)
 * - Collapsible sections for organized navigation
 * - Role-based admin section visibility
 * - External link indicators
 */
export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { isAdmin } = useAdminRole();
  
  const handleItemClick = () => {
    onClose();
  };

  return (
    <div className="px-2 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Main Navigation */}
      {mainNavigation.map((item) => {
        if (item.name === "Services") {
          return (
            <Collapsible key={item.name} className="rounded-lg">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-foreground hover:text-primary py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors">
                <span className="font-medium">Services</span>
                <ChevronDown className="h-5 w-5 transition-transform ui-open:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-2 space-y-1 pt-1">
                {serviceCategories.map((service) => (
                  <Link
                    key={service.title}
                    to={service.href}
                    onClick={handleItemClick}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary active:bg-accent/50 py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors"
                  >
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: service.color }}
                    />
                    <span>{service.title}</span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }
        
        if (item.name === "Products") {
          return (
            <Collapsible key={item.name} className="rounded-lg">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-foreground hover:text-primary py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors">
                <span className="font-medium">Products</span>
                <ChevronDown className="h-5 w-5 transition-transform ui-open:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-2 space-y-1 pt-1">
                {productCategories.map((product) => {
                  const isExternal = isExternalLink(product.href);
                  
                  if (isExternal) {
                    return (
                      <a
                        key={product.title}
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleItemClick}
                        className="flex items-center justify-between text-muted-foreground hover:text-primary active:bg-accent/50 py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors"
                      >
                        <span>{product.title}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    );
                  }
                  
                  return (
                    <Link
                      key={product.title}
                      to={product.href}
                      onClick={handleItemClick}
                      className="block text-muted-foreground hover:text-primary active:bg-accent/50 py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors"
                    >
                      {product.title}
                    </Link>
                  );
                })}
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

      {/* Secure Access Section */}
      <Collapsible className="rounded-lg">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-foreground hover:text-primary py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="font-medium">Secure Access</span>
          </div>
          <ChevronDown className="h-5 w-5 transition-transform ui-open:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-2 space-y-1 pt-1">
          {securePages.map((page) => (
            <Link
              key={page.href}
              to={page.href}
              onClick={handleItemClick}
              className="block text-muted-foreground hover:text-primary active:bg-accent/50 py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors"
            >
              {page.name}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Admin Section - Only visible to admins */}
      {user && isAdmin && (
        <Collapsible className="rounded-lg border border-primary/20 bg-primary/5">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-primary py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="font-medium">Admin</span>
            </div>
            <ChevronDown className="h-5 w-5 transition-transform ui-open:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-2 space-y-1 pt-1 pb-2">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleItemClick}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary active:bg-accent/50 py-3 px-4 rounded-md min-h-[44px] touch-manipulation transition-colors"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* User Menu */}
      <div className="pt-4 mt-4 border-t border-border">
        <UserMenu />
      </div>
    </div>
  );
};
