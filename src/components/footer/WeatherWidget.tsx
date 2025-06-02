
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { fetchWeatherData, WeatherResponse } from './weather/WeatherService';
import CurrentWeather from './weather/CurrentWeather';
import WeatherForecast from './weather/WeatherForecast';
import WeatherError from './weather/WeatherError';

interface WeatherWidgetProps {
  className?: string;
  units?: 'imperial' | 'metric';
}

const WeatherWidget = ({ 
  className = "",
  units = 'imperial'
}: WeatherWidgetProps) => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchWeatherData(units);
        
        if (data) {
          setWeatherData(data);
          // Check if this is demo data
          if (data.current.location === 'Demo City') {
            setError('Unable to fetch local weather - showing demo data');
          }
        }
      } catch (err) {
        console.error('Weather widget error:', err);
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [units]);

  if (loading) {
    return (
      <div className={cn(`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[300px] flex flex-col`, className)}>
        <div className="text-gray-400 animate-pulse flex-grow flex items-center justify-center">
          Detecting your location...
        </div>
      </div>
    );
  }

  return (
    <div className={cn(`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[300px] flex flex-col`, className)}>
      {error && (
        <div className="flex justify-end mb-2">
          <WeatherError error={error} />
        </div>
      )}
      
      {weatherData && (
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <CurrentWeather 
              weatherData={weatherData.current} 
              units={units} 
              hasTitle={false}
            />
          </div>
          
          <div className="mt-auto pt-4">
            <WeatherForecast 
              forecast={weatherData.forecast} 
              units={units}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
