
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
      className={`
        relative overflow-hidden rounded-xl mb-8 text-center
        bg-gradient-to-br from-space-deep-blue/40 via-space-dark-blue/30 to-transparent
        backdrop-blur-sm border border-white/10
        shadow-2xl shadow-space-deep-blue/20
        p-8
        ${className}
      `}
    >
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          {Icon && (
            <Icon className="w-8 h-8 md:w-12 md:h-12 text-brand-gold drop-shadow-lg" />
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg lg:text-xl drop-shadow-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default PageHeader;
