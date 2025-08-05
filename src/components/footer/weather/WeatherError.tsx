
import React from 'react';
import { WifiOff, MapPin, Info, AlertTriangle } from 'lucide-react';

interface WeatherErrorProps {
  error: string;
}

const WeatherError = ({ error }: WeatherErrorProps) => {
  const getIcon = () => {
    if (error.includes('location') || error.includes('default location')) {
      return <MapPin size={16} className="text-amber-400" />;
    }
    if (error.includes('demo data')) {
      return <Info size={16} className="text-amber-400" />;
    }
    if (error.includes('Failed to load')) {
      return <WifiOff size={16} className="text-amber-400" />;
    }
    return <AlertTriangle size={16} className="text-amber-400" />;
  };

  const getDisplayText = () => {
    if (error.includes('default location')) {
      return 'Enable location for local weather';
    }
    if (error.includes('demo data')) {
      return 'Demo data';
    }
    if (error.includes('Failed to load')) {
      return 'Weather unavailable';
    }
    return 'Weather error';
  };

  return (
    <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">
      {getIcon()}
      <span className="font-medium">{getDisplayText()}</span>
    </div>
  );
};

export default WeatherError;
