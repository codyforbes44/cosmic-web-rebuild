
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { navLinks } from './constants';
import MobileNavItem from './MobileNavItem';
import MobileServiceToggle from './MobileServiceToggle';
import MobileProductToggle from './MobileProductToggle';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface MobileNavigationProps {
  isOpen: boolean;
  isActive: (path: string) => string;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, isActive, onClose }) => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = () => {
    signOut();
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="md:hidden fixed top-0 left-0 right-0 bottom-0 z-50 bg-space-dark-blue/95 backdrop-blur-md shadow-lg pt-20"
      id="mobile-menu"
    >
      <X 
        className="absolute top-4 right-4 text-gray-400 cursor-pointer" 
        size={24} 
        onClick={onClose}
      />
      <div className="py-4 px-4 flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        {navLinks.map((link, index) => {
          // Skip admin-only links if user is not logged in
          if (link.adminOnly && !user) return null;
          
          // Special handling for Services to use dropdown
          if (link.path === '/services') {
            return <MobileServiceToggle key={link.path} onClose={onClose} />;
          }
          
          // Special handling for Products to use dropdown
          if (link.path === '/products') {
            return <MobileProductToggle key={link.path} onClose={onClose} />;
          }
          
          return (
            <MobileNavItem
              key={link.path}
              link={link}
              isActive={isActive(link.path) === 'active'}
              index={index}
              onClose={onClose}
            />
          );
        })}
        
        {user ? (
          <Button 
            variant="ghost" 
            className="justify-start text-gray-200 hover:text-white hover:bg-gray-800 mt-2"
            onClick={handleSignOut}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        ) : (
          <Link to="/auth#top" onClick={onClose}>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-200 hover:text-white hover:bg-gray-800 mt-2"
            >
              <LogIn size={18} className="mr-2" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
