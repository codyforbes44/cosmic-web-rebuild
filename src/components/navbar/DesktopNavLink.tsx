
import { Link } from 'react-router-dom';
import { Ban } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from './constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DesktopNavLinkProps {
  link: NavLink;
  isActive: boolean;
  index: number;
}

const DesktopNavLink = ({ link, isActive, index }: DesktopNavLinkProps) => {
  return (
    <motion.div
      key={link.name}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {link.disabled ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="nav-link text-gray-500 cursor-not-allowed flex items-center">
                {link.name}
                <Ban size={16} className="ml-1 opacity-70" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Link 
          to={link.path} 
          className={`nav-link ${isActive ? 'active' : ''}`}
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

export default DesktopNavLink;
