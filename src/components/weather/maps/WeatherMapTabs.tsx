
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radar, Thermometer, Wind } from 'lucide-react';

interface WeatherMapTabsProps {
  activeMap: string;
  setActiveMap: (map: string) => void;
  isMobile: boolean;
  children: React.ReactNode;
}

const WeatherMapTabs = ({ activeMap, setActiveMap, isMobile, children }: WeatherMapTabsProps) => {
  const mapTypes = [
    { id: 'radar', label: 'Radar', icon: Radar },
    { id: 'temperature', label: 'Temperature', icon: Thermometer },
    { id: 'wind', label: 'Wind', icon: Wind },
  ];

  return (
    <Tabs value={activeMap} onValueChange={setActiveMap}>
      <TabsList className={`grid w-full grid-cols-3 bg-space-deep-blue/50 border border-white/10`}>
        {mapTypes.map((type) => (
          <TabsTrigger 
            key={type.id} 
            value={type.id}
            className={`data-[state=active]:bg-brand-gold data-[state=active]:text-black ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            <type.icon className="w-4 h-4 mr-1 md:mr-2" />
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {mapTypes.map((type) => (
        <TabsContent key={type.id} value={type.id} className={`${isMobile ? 'mt-4' : 'mt-6'}`}>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default WeatherMapTabs;
