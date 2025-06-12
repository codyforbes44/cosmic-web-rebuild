
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Settings, Bell } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

interface AdminDesktopHeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  activeTab: string;
  isLoading?: boolean;
}

export const AdminDesktopHeader: React.FC<AdminDesktopHeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  activeTab,
  isLoading = false
}) => {
  const { user } = useAuth();

  return (
    <div className="bg-space-deep-blue border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* System Status */}
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 hidden md:flex">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              System Operational
            </Badge>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {onRefresh && (
                <Button
                  onClick={onRefresh}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Bell className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-gray-700">
              <div className="text-right">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
