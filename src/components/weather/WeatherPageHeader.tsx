
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WeatherPageHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

const WeatherPageHeader = ({ onRefresh, refreshing }: WeatherPageHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Weather Center</h1>
          <p className="text-gray-400 flex items-center gap-2 text-sm md:text-base">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            Complete weather information for your location
          </p>
        </div>
        <Button
          onClick={onRefresh}
          variant="outline"
          size={isMobile ? "sm" : "default"}
          className="bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default WeatherPageHeader;
