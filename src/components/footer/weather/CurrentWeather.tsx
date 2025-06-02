
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
    <div className="text-gray-200 flex-grow flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="font-medium text-white">{weatherData.location}</span>
        <WeatherIcon condition={weatherData.condition} />
      </div>
      
      <div className={`mt-2 ${!hasTitle ? 'mb-2' : 'mb-4'} flex items-center gap-4`}>
        {/* Temperature Section - Left 50% */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Thermometer size={18} className="mr-2 text-brand-gold" />
            <span className="text-gray-400">Temperature</span>
          </div>
          <span className="text-3xl font-bold text-white block ml-6">
            {weatherData.temperature}°{units === 'imperial' ? 'F' : 'C'}
          </span>
        </div>
        
        {/* Humidity and Wind Section - Right 50% */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col bg-space-deep-blue/50 p-2 rounded-lg">
            <div className="flex items-center mb-1">
              <Droplets size={14} className="mr-2 text-blue-400" />
              <span className="text-gray-400 text-xs">Humidity</span>
            </div>
            <span className="text-sm font-medium ml-4">{weatherData.humidity}%</span>
          </div>
          
          <div className="flex flex-col bg-space-deep-blue/50 p-2 rounded-lg">
            <div className="flex items-center mb-1">
              <Wind size={14} className="mr-2 text-gray-400" />
              <span className="text-gray-400 text-xs">Wind</span>
            </div>
            <span className="text-sm font-medium ml-4">
              {weatherData.windSpeed} {units === 'imperial' ? 'mph' : 'm/s'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
