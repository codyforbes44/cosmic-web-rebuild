
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import WeatherMapTabs from './maps/WeatherMapTabs';
import WeatherMapContainer from './maps/WeatherMapContainer';
import MapLegend from './maps/MapLegend';
import MapControls from './maps/MapControls';

interface WeatherMapsProps {
  location: string;
}

const WeatherMaps = ({ location }: WeatherMapsProps) => {
  const [activeMap, setActiveMap] = useState('radar');
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className={`text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>Weather Radar & Layers</CardTitle>
          <p className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Real-time radar, temperature, and wind data for {location}</p>
        </CardHeader>
        <CardContent>
          <WeatherMapTabs
            activeMap={activeMap}
            setActiveMap={setActiveMap}
            isMobile={isMobile}
          >
            <WeatherMapContainer
              activeMap={activeMap}
              location={location}
              isMobile={isMobile}
            />
          </WeatherMapTabs>
        </CardContent>
      </Card>

      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
        <MapControls isMobile={isMobile} />
        <MapLegend activeMap={activeMap} location={location} isMobile={isMobile} />
      </div>
    </div>
  );
};

export default WeatherMaps;
