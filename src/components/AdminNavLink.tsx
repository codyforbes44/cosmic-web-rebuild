
import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import ScrollToTopLink from './ScrollToTopLink';

interface AdminNavLinkProps {
  className?: string;
}

const AdminNavLink: React.FC<AdminNavLinkProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <ScrollToTopLink 
        to="/admin" 
        className={`flex items-center text-sm px-4 py-2 bg-accent/20 text-accent-foreground rounded-md hover:bg-accent-hover/30 transition-all focus:ring-2 focus:ring-accent ${className}`}
      >
        <Settings size={16} className="mr-2" />
        <span>Admin Dashboard</span>
      </ScrollToTopLink>
    </motion.div>
  );
};

export default AdminNavLink;
