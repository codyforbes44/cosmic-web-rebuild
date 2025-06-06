
import React from "react";
import { Link } from "react-router-dom";
import { 
  ChevronDown, 
  User, 
  LogOut, 
  Settings,
  Star,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import MobileServicesMenu from "./MobileServicesMenu";
import MobileProductsMenu from "./MobileProductsMenu";
import { serviceCategories, productCategories, navLinks } from "./constants";
import { useAuth } from "@/components/auth/AuthProvider";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);

  if (!isOpen) return null;

  const getInitials = () => {
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="md:hidden bg-space-dark-blue/98 backdrop-blur-sm border-t border-white/10">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* User section */}
        {user ? (
          <div className="px-3 py-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={user.email || ''} />
                <AvatarFallback className="bg-brand-gold text-black font-medium">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400">
                  Signed in
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md"
              >
                <User className="h-4 w-4" />
                Profile Settings
              </Link>
              
              <Link
                to="/weather"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md"
              >
                <Star className="h-4 w-4" />
                Favorite Locations
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 rounded-md w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="px-3 py-4 border-b border-white/10 mb-4">
            <Link
              to="/auth"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-gold hover:bg-brand-gold/90 text-black rounded-md font-medium"
            >
              <User className="h-4 w-4" />
              Sign In
            </Link>
          </div>
        )}

        {/* Navigation Links - Using navLinks from constants */}
        {/* Home Link */}
        <Link
          to={navLinks[0].path}
          className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
          onClick={onClose}
        >
          {navLinks[0].name}
        </Link>

        <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md">
            Services
            <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <MobileServicesMenu onClose={onClose} />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={productsOpen} onOpenChange={setProductsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md">
            Products
            <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <MobileProductsMenu onClose={onClose} />
          </CollapsibleContent>
        </Collapsible>

        {/* Remaining navigation links from navLinks array (skipping Home which is first) */}
        {navLinks.slice(1).map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}

        {/* Get Quote Button */}
        <div className="px-3 py-2">
          <Link
            to="/get-quote"
            onClick={onClose}
            className="flex items-center justify-center px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-md font-medium"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
