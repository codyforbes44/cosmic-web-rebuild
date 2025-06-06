
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface WeatherPageTabsProps {
  children: React.ReactNode;
  onTabChange?: (value: string) => void;
}

const WeatherPageTabs = ({ children, onTabChange }: WeatherPageTabsProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("current");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  const handleMobileTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    onTabChange?.(tabValue);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} bg-space-deep-blue/50 border border-white/10`}>
        <TabsTrigger 
          value="current" 
          className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
        >
          Current
        </TabsTrigger>
        <TabsTrigger 
          value="hourly" 
          className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
        >
          Hourly
        </TabsTrigger>
        <TabsTrigger 
          value="forecast" 
          className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
        >
          {isMobile ? '7-Day' : '7-Day'}
        </TabsTrigger>
        {!isMobile && (
          <>
            <TabsTrigger 
              value="maps" 
              className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
            >
              Maps
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
            >
              Settings
            </TabsTrigger>
          </>
        )}
      </TabsList>

      {/* Mobile-specific tabs for maps and settings */}
      {isMobile && (
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'maps' ? 'default' : 'outline'}
            size="sm"
            className={`flex-1 ${
              activeTab === 'maps' 
                ? 'bg-brand-gold text-black hover:bg-brand-gold/90' 
                : 'bg-transparent border-white/20 text-white hover:bg-white/10'
            }`}
            onClick={() => handleMobileTabClick('maps')}
          >
            Maps
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'outline'}
            size="sm"
            className={`flex-1 ${
              activeTab === 'settings' 
                ? 'bg-brand-gold text-black hover:bg-brand-gold/90' 
                : 'bg-transparent border-white/20 text-white hover:bg-white/10'
            }`}
            onClick={() => handleMobileTabClick('settings')}
          >
            Settings
          </Button>
        </div>
      )}

      {children}
    </Tabs>
  );
};

export default WeatherPageTabs;
