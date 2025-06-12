
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface MobileAdminHeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export const MobileAdminHeader: React.FC<MobileAdminHeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  isLoading = false
}) => {
  return (
    <div className="sticky top-0 z-10 bg-space-dark-blue border-b border-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden text-white hover:bg-white/10" />
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onRefresh && (
            <Button
              onClick={onRefresh}
              variant="outline"
              size="sm"
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline ml-2">Refresh</span>
            </Button>
          )}
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
            System Operational
          </Badge>
        </div>
      </div>
    </div>
  );
};
