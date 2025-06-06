import React from 'react';
import { Cloud } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
const WeatherPageHeader = () => {
  const isMobile = useIsMobile();
  return <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
      <div className="flex items-center justify-center gap-3 mb-4">
        <Cloud className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-brand-gold`} />
        <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold text-white`}>Ʒʙɪ Weather Center</h1>
      </div>
      <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} text-gray-300 max-w-2xl mx-auto px-4`}>
        {isMobile ? "Real-time weather data and forecasts" : "Comprehensive weather information, forecasts, and interactive maps for your location"}
      </p>
    </div>;
};
export default WeatherPageHeader;