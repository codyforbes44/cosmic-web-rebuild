
import React from 'react';
import { Link } from 'react-router-dom';
import { Ban } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from './constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DesktopNavItemProps {
  link: NavLink;
  isActive: boolean;
  index: number;
}

const DesktopNavItem = ({ link, isActive, index }: DesktopNavItemProps) => {
  return (
    <motion.div
      key={link.name}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {link.disabled ? (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="nav-link text-gray-500 cursor-not-allowed flex items-center text-base font-medium">
                {link.name}
                <Ban size={16} className="ml-1 opacity-70" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Unauthorized</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Link 
          to={link.path} 
          className={`nav-link ${isActive ? 'active' : ''} text-base font-medium`}
          aria-current={isActive ? 'page' : undefined}
        >
          {link.name}
          {isActive && (
            <motion.div 
              className="h-0.5 bg-accent mt-1" 
              layoutId="navbar-indicator"
            />
          )}
        </Link>
      )}
    </motion.div>
  );
};

export default DesktopNavItem;
