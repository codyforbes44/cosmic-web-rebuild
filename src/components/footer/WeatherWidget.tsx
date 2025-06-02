
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { fetchWeatherData, WeatherResponse } from './weather/WeatherService';
import CurrentWeather from './weather/CurrentWeather';
import WeatherForecast from './weather/WeatherForecast';
import WeatherError from './weather/WeatherError';

interface WeatherWidgetProps {
  className?: string;
  title?: string;
  units?: 'imperial' | 'metric';
}

const WeatherWidget = ({ 
  className = "",
  title = "Local Weather",
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
      <div className={cn(`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[420px] flex flex-col`, className)}>
        {title && <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>}
        <div className="text-gray-400 animate-pulse flex-grow flex items-center justify-center">
          Detecting your location...
        </div>
      </div>
    );
  }

  return (
    <div className={cn(`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 flex flex-col ${!title ? 'min-h-[280px]' : 'min-h-[420px]'}`, className)}>
      {title && (
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {error && <WeatherError error={error} />}
        </div>
      )}
      
      {weatherData && (
        <>
          <CurrentWeather 
            weatherData={weatherData.current} 
            units={units} 
            hasTitle={!!title}
          />
          
          <WeatherForecast 
            forecast={weatherData.forecast} 
            units={units}
          />
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
