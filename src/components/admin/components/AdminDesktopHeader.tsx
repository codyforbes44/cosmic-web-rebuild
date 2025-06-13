
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Settings, Bell, Menu, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

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
  const { user, signOut } = useAuth();
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSettingsClick = () => {
    // Navigate to system settings tab
    navigate('/admin?tab=system');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="bg-space-deep-blue border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <Button
              onClick={toggleSidebar}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </Button>

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

              {/* Notifications Dropdown */}
              <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white relative"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-gray-800 border-gray-700" align="end">
                  <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700">
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">System Update Available</span>
                      <span className="text-sm text-gray-400">A new system update is ready to install</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700">
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">New User Registration</span>
                      <span className="text-sm text-gray-400">3 new users registered today</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700">
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">Security Alert</span>
                      <span className="text-sm text-gray-400">Login attempt from new location</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 justify-center">
                    View All Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings Button */}
              <Button
                onClick={handleSettingsClick}
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-700 cursor-pointer hover:bg-gray-700/50 rounded-lg p-2 transition-colors">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-medium text-white">Admin User</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end">
                <DropdownMenuLabel className="text-white">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={handleProfileClick}
                  className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/admin?tab=security')}
                  className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Security Center
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleSettingsClick}
                  className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="text-red-400 hover:bg-gray-700 focus:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
