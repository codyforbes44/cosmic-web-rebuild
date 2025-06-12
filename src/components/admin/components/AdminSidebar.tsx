
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Settings, 
  Shield, 
  Bot, 
  Key,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  { id: 'overview', title: 'Overview', icon: BarChart3, description: 'Dashboard overview' },
  { id: 'analytics', title: 'Analytics', icon: Activity, description: 'Performance metrics' },
  { id: 'users', title: 'Users', icon: Users, description: 'User management' },
  { id: 'verification', title: 'Admin Check', icon: Shield, description: 'Admin verification' },
  { id: 'chatbot', title: 'Chatbot', icon: Bot, description: 'AI assistant' },
  { id: 'api', title: 'API & Secrets', icon: Key, description: 'API management' },
  { id: 'system', title: 'System', icon: Settings, description: 'System settings' },
  { id: 'security', title: 'Security', icon: Shield, description: 'Security center' },
];

export const AdminSidebar: React.FC = () => {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentTab = new URLSearchParams(location.search).get('tab') || 'overview';
  const isCollapsed = state === 'collapsed';

  const isActive = (tabId: string) => currentTab === tabId;

  return (
    <Sidebar className={`${isCollapsed ? 'w-16' : 'w-72'} bg-space-deep-blue border-r border-gray-700 transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-gray-400">Management Console</p>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-gray-400 px-4 py-2 ${isCollapsed ? 'hidden' : 'block'}`}>
            Management Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={`/admin?tab=${item.id}`}
                      className={`flex items-center gap-3 px-3 py-3 text-sm transition-all duration-200 rounded-lg group ${
                        isActive(item.id)
                          ? 'bg-accent text-white font-medium shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    >
                      <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive(item.id) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                      {!isCollapsed && (
                        <div className="flex flex-col min-w-0">
                          <span className="truncate">{item.title}</span>
                          <span className="text-xs text-gray-500 group-hover:text-gray-400 truncate">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700 mt-auto">
          <div className="text-center">
            <p className="text-xs text-gray-500">Admin Dashboard v2.0</p>
            <p className="text-xs text-gray-600 mt-1">Secure Management Portal</p>
          </div>
        </div>
      )}
    </Sidebar>
  );
};
