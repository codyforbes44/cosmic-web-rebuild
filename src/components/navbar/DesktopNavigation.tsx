
import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from './constants';
import DesktopNavItem from './DesktopNavItem';
import ServiceDropdown from './ServiceDropdown';
import ProductDropdown from './ProductDropdown';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DesktopNavigationProps {
  isActive: (path: string) => string;
  isServicesActive: boolean;
  isProductsActive: boolean;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ isActive, isServicesActive, isProductsActive }) => {
  const { user, signOut } = useAuth();
  
  return (
    <nav className="hidden md:flex items-center space-x-4">
      {navLinks.map((link, index) => {
        // Skip admin-only links if user is not logged in
        if (link.adminOnly && !user) return null;
        
        // Special handling for Services to use dropdown
        if (link.path === '/services') {
          return <ServiceDropdown key={link.path} isActive={isServicesActive} />;
        }
        
        // Special handling for Products to use dropdown
        if (link.path === '/products') {
          return <ProductDropdown key={link.path} isActive={isProductsActive} />;
        }
        
        return (
          <DesktopNavItem
            key={link.path}
            path={link.path}
            name={link.name}
            isActive={isActive(link.path) === 'active'}
            index={index}
          />
        );
      })}
      
      {user ? (
        <Button 
          variant="ghost" 
          className="text-gray-200 hover:text-white hover:bg-gray-800 ml-2"
          onClick={signOut}
        >
          <LogOut size={16} className="mr-1" />
          Logout
        </Button>
      ) : (
        <Link to="/auth">
          <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-gray-800 ml-2">
            <LogIn size={16} className="mr-1" />
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavigation;
