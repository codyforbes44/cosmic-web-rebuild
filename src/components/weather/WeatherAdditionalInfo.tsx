
import React from 'react';
import { useWeatherPage } from './WeatherPageProvider';
import AirQualityCard from './AirQualityCard';
import EnhancedWeatherDetails from './EnhancedWeatherDetails';
import WeatherSharing from './WeatherSharing';

const WeatherAdditionalInfo = () => {
  const { weatherData, units } = useWeatherPage();

  if (!weatherData) return null;

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-semibold text-white">Additional Information</h2>
      
      {/* Air Quality and Enhanced Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AirQualityCard airQuality={weatherData.airQuality} />
        <div className="lg:col-span-2">
          <EnhancedWeatherDetails weatherData={weatherData} units={units} />
        </div>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Weather Alerts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weatherData.alerts.map((alert) => (
              <div key={alert.id} className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.severity === 'extreme' ? 'bg-red-600' :
                    alert.severity === 'severe' ? 'bg-orange-500' :
                    alert.severity === 'moderate' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <h4 className="text-white font-semibold">{alert.title}</h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">{alert.description}</p>
                <p className="text-xs text-gray-400">Expires: {alert.expires}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Sharing - Moved to bottom */}
      <div className="mt-8">
        <WeatherSharing 
          weatherData={weatherData.current} 
          units={units}
        />
      </div>
    </div>
  );
};

export default WeatherAdditionalInfo;
