
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
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
        to="/analytics" 
        className={`flex items-center text-sm px-4 py-2 bg-accent/20 text-white rounded-md hover:bg-accent/30 transition-all ${className}`}
      >
        <BarChart2 size={16} className="mr-2" />
        <span>Analytics</span>
      </ScrollToTopLink>
    </motion.div>
  );
};

export default AdminNavLink;
