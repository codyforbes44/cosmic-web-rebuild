
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { WeatherData } from './WeatherService';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  units: 'imperial' | 'metric';
  hasTitle: boolean;
}

const CurrentWeather = ({ weatherData, units, hasTitle }: CurrentWeatherProps) => {
  return (
    <div className="text-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="font-medium text-white text-lg">{weatherData.location}</span>
        <WeatherIcon condition={weatherData.condition} size={32} />
      </div>
      
      <div className="flex-grow flex flex-col justify-center">
        {/* Temperature Section - Main Display */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Thermometer size={20} className="mr-2 text-brand-gold" />
            <span className="text-gray-300 text-sm">Temperature</span>
          </div>
          <span className="text-4xl font-bold text-white block">
            {weatherData.temperature}°{units === 'imperial' ? 'F' : 'C'}
          </span>
        </div>
        
        {/* Humidity and Wind Section - Compact Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-space-deep-blue/50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center mb-1">
              <Droplets size={16} className="mr-1 text-blue-400" />
              <span className="text-gray-400 text-xs">Humidity</span>
            </div>
            <span className="text-sm font-medium text-white">{weatherData.humidity}%</span>
          </div>
          
          <div className="bg-space-deep-blue/50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center mb-1">
              <Wind size={16} className="mr-1 text-gray-400" />
              <span className="text-gray-400 text-xs">Wind</span>
            </div>
            <span className="text-sm font-medium text-white">
              {weatherData.windSpeed} {units === 'imperial' ? 'mph' : 'm/s'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
