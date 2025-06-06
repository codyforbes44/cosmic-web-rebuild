
import React from 'react';
import { MapPin } from "lucide-react";

const WeatherPageHeader = () => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Ʒʙɪ Weather Center</h1>
          <p className="text-gray-400 flex items-center gap-2 text-sm md:text-base">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            Complete weather information for your location
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherPageHeader;
