import React from 'react';
import { getEnvBadgeInfo, ENV, FEATURES } from '@/config/environment';
import { Settings, Bug } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

/**
 * EnvironmentBadge - Shows current environment in non-production
 * 
 * Features:
 * - Only visible in development/staging
 * - Click to see feature flags status
 * - Helps identify which environment you're viewing
 */
export const EnvironmentBadge: React.FC = () => {
  const badgeInfo = getEnvBadgeInfo();
  
  if (!badgeInfo) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`fixed top-20 left-4 z-50 px-2 py-1 text-xs font-bold text-white rounded-md shadow-lg flex items-center gap-1 ${badgeInfo.color} hover:opacity-90 transition-opacity`}
          aria-label={`Environment: ${badgeInfo.label}`}
        >
          <Bug className="w-3 h-3" />
          {badgeInfo.label}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <h4 className="font-semibold text-sm">Environment Info</h4>
          </div>
          
          <div className="text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Environment:</span>
              <span className="font-medium">{ENV}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Component Catalog:</span>
              <span className={FEATURES.showComponentCatalog ? 'text-green-500' : 'text-red-500'}>
                {FEATURES.showComponentCatalog ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Debug Mode:</span>
              <span className={FEATURES.enableDebugMode ? 'text-green-500' : 'text-red-500'}>
                {FEATURES.enableDebugMode ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Analytics:</span>
              <span className={FEATURES.enableAnalytics ? 'text-green-500' : 'text-red-500'}>
                {FEATURES.enableAnalytics ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground border-t pt-2">
            Override flags via URL: ?feature_[name]=true
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EnvironmentBadge;
