
import React from 'react';
import { useWeatherPage } from './WeatherPageProvider';
import { useIsMobile } from "@/hooks/use-mobile";
import AirQualityCard from './AirQualityCard';
import EnhancedWeatherDetails from './EnhancedWeatherDetails';
import WeatherSharing from './WeatherSharing';

const WeatherAdditionalInfo = () => {
  const { weatherData, units } = useWeatherPage();
  const isMobile = useIsMobile();

  if (!weatherData) return null;

  return (
    <div className={`${isMobile ? 'mt-6 space-y-4' : 'mt-8 space-y-6'}`}>
      <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-white`}>Additional Information</h2>
      
      {/* Air Quality and Enhanced Details */}
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-3 gap-6'}`}>
        <AirQualityCard airQuality={weatherData.airQuality} />
        <div className={isMobile ? '' : 'lg:col-span-2'}>
          <EnhancedWeatherDetails weatherData={weatherData} units={units} />
        </div>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <div>
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-white mb-4`}>Weather Alerts</h3>
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-2 gap-4'}`}>
            {weatherData.alerts.map((alert) => (
              <div key={alert.id} className={`bg-red-900/20 border border-red-500/50 ${isMobile ? 'p-3' : 'p-4'} rounded-lg`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.severity === 'extreme' ? 'bg-red-600' :
                    alert.severity === 'severe' ? 'bg-orange-500' :
                    alert.severity === 'moderate' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <h4 className={`text-white font-semibold ${isMobile ? 'text-sm' : ''}`}>{alert.title}</h4>
                </div>
                <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>{alert.description}</p>
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-400`}>Expires: {alert.expires}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Sharing - Moved to bottom */}
      <div className={`${isMobile ? 'mt-6' : 'mt-8'}`}>
        <WeatherSharing 
          weatherData={weatherData.current} 
          units={units}
        />
      </div>
    </div>
  );
};

export default WeatherAdditionalInfo;
