
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
        relative overflow-hidden rounded-xl mb-6 md:mb-8 text-center
        bg-gradient-to-br from-space-deep-blue/40 via-space-dark-blue/30 to-transparent
        backdrop-blur-sm border border-white/10
        shadow-2xl shadow-space-deep-blue/20
        p-4 sm:p-6 md:p-8
        ${className}
      `}
    >
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 md:mb-4">
          {Icon && (
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-gold drop-shadow-lg flex-shrink-0" />
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg leading-tight">
            {title}
          </h1>
        </div>
        <p className="text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-sm leading-relaxed px-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default PageHeader;
