
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface WeatherPageTabsProps {
  children: React.ReactNode;
}

const WeatherPageTabs = ({ children }: WeatherPageTabsProps) => {
  const isMobile = useIsMobile();

  return (
    <Tabs defaultValue="current" className="space-y-6">
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
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
            onClick={() => {
              const tabsList = document.querySelector('[role="tablist"]');
              const mapsTab = document.querySelector('[value="maps"]');
              if (tabsList && mapsTab) {
                (mapsTab as HTMLElement).click();
              }
            }}
          >
            Maps
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
            onClick={() => {
              const tabsList = document.querySelector('[role="tablist"]');
              const settingsTab = document.querySelector('[value="settings"]');
              if (tabsList && settingsTab) {
                (settingsTab as HTMLElement).click();
              }
            }}
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
