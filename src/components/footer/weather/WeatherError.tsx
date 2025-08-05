
import React from 'react';
import { WifiOff, Signal, MapPin, Info, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WeatherErrorProps {
  error: string;
}

const WeatherError = ({ error }: WeatherErrorProps) => {
  const getIcon = () => {
    if (error.includes('location') || error.includes('default location')) {
      return <MapPin size={18} className="text-amber-400" />;
    }
    if (error.includes('demo data')) {
      return <Info size={18} className="text-amber-400" />;
    }
    if (error.includes('Failed to load')) {
      return <WifiOff size={18} className="text-amber-400" />;
    }
    return <AlertTriangle size={18} className="text-amber-400" />;
  };

  const getTooltipText = () => {
    if (error.includes('default location')) {
      return 'Click the location button in your browser or refresh the page to enable location access for local weather.';
    }
    if (error.includes('demo data')) {
      return 'Weather services are temporarily unavailable. Data shown is for demonstration purposes.';
    }
    return error;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {getIcon()}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 text-gray-100 border-gray-700 max-w-xs">
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WeatherError;
