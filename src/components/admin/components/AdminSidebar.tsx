
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Settings, 
  Shield, 
  Bot, 
  Key,
  Activity
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
  { id: 'overview', title: 'Overview', icon: BarChart3 },
  { id: 'analytics', title: 'Analytics', icon: Activity },
  { id: 'users', title: 'Users', icon: Users },
  { id: 'chatbot', title: 'Chatbot', icon: Bot },
  { id: 'api', title: 'API & Secrets', icon: Key },
  { id: 'system', title: 'System', icon: Settings },
  { id: 'security', title: 'Security', icon: Shield },
];

export const AdminSidebar: React.FC = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentTab = new URLSearchParams(location.search).get('tab') || 'overview';

  const isActive = (tabId: string) => currentTab === tabId;

  return (
    <Sidebar className={`${collapsed ? 'w-0' : 'w-64'} bg-space-deep-blue border-r border-gray-700`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className={`text-white font-bold ${collapsed ? 'hidden' : 'block'}`}>
            Admin Dashboard
          </h2>
          <SidebarTrigger className="text-white hover:bg-white/10" />
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 px-4 py-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={`/admin?tab=${item.id}`}
                      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        isActive(item.id)
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
