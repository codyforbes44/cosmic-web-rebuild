
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Map, Satellite, Zap, Cloud } from 'lucide-react';

interface WeatherMapTabsProps {
  activeMap: string;
  setActiveMap: (map: string) => void;
  isMobile: boolean;
  children: React.ReactNode;
}

const WeatherMapTabs = ({ activeMap, setActiveMap, isMobile, children }: WeatherMapTabsProps) => {
  const mapTypes = [
    { id: 'radar', label: 'Radar', icon: Cloud },
    { id: 'satellite', label: 'Satellite', icon: Satellite },
    { id: 'temperature', label: 'Temp', icon: Map },
    { id: 'precipitation', label: 'Rain', icon: Zap },
  ];

  return (
    <Tabs value={activeMap} onValueChange={setActiveMap}>
      <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} bg-space-deep-blue/50 border border-white/10`}>
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

      {/* Mobile: Show only 2 tabs at a time with secondary navigation */}
      {isMobile && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button
            variant={activeMap === 'temperature' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveMap('temperature')}
            className={activeMap === 'temperature' 
              ? 'bg-brand-gold text-black' 
              : 'bg-transparent border-white/20 text-white hover:bg-white/10'
            }
          >
            <Map className="w-4 h-4 mr-1" />
            Temp
          </Button>
          <Button
            variant={activeMap === 'precipitation' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveMap('precipitation')}
            className={activeMap === 'precipitation' 
              ? 'bg-brand-gold text-black' 
              : 'bg-transparent border-white/20 text-white hover:bg-white/10'
            }
          >
            <Zap className="w-4 h-4 mr-1" />
            Rain
          </Button>
        </div>
      )}

      {mapTypes.map((type) => (
        <TabsContent key={type.id} value={type.id} className={`${isMobile ? 'mt-4' : 'mt-6'}`}>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default WeatherMapTabs;
