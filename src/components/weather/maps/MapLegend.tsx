
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MapLegendProps {
  activeMap: string;
  location: string;
  isMobile: boolean;
}

const MapLegend = ({ activeMap, location, isMobile }: MapLegendProps) => {
  const getLegendContent = () => {
    if (activeMap === 'radar') {
      return (
        <>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-300">Light Precipitation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded"></div>
            <span className="text-gray-300">Moderate Precipitation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded"></div>
            <span className="text-gray-300">Heavy Precipitation</span>
          </div>
        </>
      );
    }
    
    if (activeMap === 'temperature') {
      return (
        <>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-600 rounded"></div>
            <span className="text-gray-300">Cold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded"></div>
            <span className="text-gray-300">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded"></div>
            <span className="text-gray-300">Hot</span>
          </div>
        </>
      );
    }
    
    return (
      <div className="text-gray-300">
        Interactive weather visualization for {location}
      </div>
    );
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className={`text-white ${isMobile ? 'text-base' : 'text-lg'}`}>Map Legend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`space-y-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {getLegendContent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapLegend;
