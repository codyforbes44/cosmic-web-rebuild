import React from 'react';
import ScrollToTopLink from '../ScrollToTopLink';
import { ExternalLink } from 'lucide-react';

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

/**
 * MobileNavLink - Touch-optimized navigation link for mobile devices
 * 
 * Improvements:
 * - Increased touch target (min 44px height per WCAG guidelines)
 * - Visual feedback on active/hover states
 * - Support for external links and icons
 * - Optional description for context
 */
const MobileNavLink: React.FC<MobileNavLinkProps> = ({ 
  to, 
  children, 
  onClick,
  external = false,
  icon: Icon,
  description
}) => {
  const linkContent = (
    <div className="flex items-center gap-3">
      {Icon && <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
      <div className="flex flex-col min-w-0">
        <span className="font-medium truncate">{children}</span>
        {description && (
          <span className="text-xs text-muted-foreground truncate">{description}</span>
        )}
      </div>
      {external && <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto flex-shrink-0" />}
    </div>
  );

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="block text-foreground hover:text-primary active:bg-accent/50 py-3 px-4 rounded-md transition-colors min-h-[44px] touch-manipulation"
      >
        {linkContent}
      </a>
    );
  }

  return (
    <ScrollToTopLink
      to={to}
      onClick={onClick}
      className="block text-foreground hover:text-primary active:bg-accent/50 py-3 px-4 rounded-md transition-colors min-h-[44px] touch-manipulation"
    >
      {linkContent}
    </ScrollToTopLink>
  );
};

export default MobileNavLink;
