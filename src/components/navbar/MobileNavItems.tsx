
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import MobileServicesMenu from "./MobileServicesMenu";
import MobileProductsMenu from "./MobileProductsMenu";

interface MobileNavItemsProps {
  onClose: () => void;
}

const MobileNavItems: React.FC<MobileNavItemsProps> = ({ onClose }) => {
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);

  return (
    <div className="px-2 pt-2 pb-3 space-y-1">
      <Link
        to="/"
        className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
        onClick={onClose}
      >
        Home
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

      <Link
        to="/portfolio"
        className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
        onClick={onClose}
      >
        Portfolio
      </Link>
      
      <Link
        to="/news"
        className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
        onClick={onClose}
      >
        News
      </Link>
      
      <Link
        to="/about"
        className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
        onClick={onClose}
      >
        About
      </Link>
      
      <Link
        to="/contact"
        className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
        onClick={onClose}
      >
        Contact
      </Link>
    </div>
  );
};

export default MobileNavItems;
