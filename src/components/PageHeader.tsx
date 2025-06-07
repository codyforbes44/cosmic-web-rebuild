
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  icon: Icon,
  className = ""
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-card p-8 rounded-xl mb-8 text-center ${className}`}
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        {Icon && <Icon className="w-8 h-8 md:w-12 md:h-12 text-brand-gold" />}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {title}
        </h1>
      </div>
      <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg lg:text-xl">
        {description}
      </p>
    </motion.div>
  );
};

export default PageHeader;
