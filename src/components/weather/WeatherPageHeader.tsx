
import React from 'react';
import { Cloud } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const WeatherPageHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-dark-blue via-space-deep-blue to-space-purple"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-brand-gold`} />
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold text-white`}>Ʒʙɪ Weather Center</h1>
          </div>
          <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} text-gray-300 max-w-2xl mx-auto px-4`}>
            {isMobile ? "Real-time weather data and forecasts" : "Comprehensive weather information, forecasts, and interactive maps for your location"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeatherPageHeader;
