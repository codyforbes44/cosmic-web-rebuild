
import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from './constants';
import DesktopNavItem from './DesktopNavItem';
import ServiceDropdown from './ServiceDropdown';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DesktopNavigationProps {
  isActive: (path: string) => string;
  isServicesActive: boolean;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ isActive, isServicesActive }) => {
  const { user, signOut } = useAuth();
  
  return (
    <nav className="hidden md:flex items-center space-x-2">
      <ServiceDropdown isActive={isServicesActive} />
      
      {navLinks.map((link, index) => {
        // Skip admin-only links if user is not logged in
        if (link.adminOnly && !user) return null;
        
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
          className="text-gray-200 hover:text-white hover:bg-gray-800"
          onClick={signOut}
        >
          <LogOut size={16} className="mr-1" />
          Logout
        </Button>
      ) : (
        <Link to="/auth">
          <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-gray-800">
            <LogIn size={16} className="mr-1" />
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavigation;
