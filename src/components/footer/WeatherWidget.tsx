
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { MapPin, RefreshCw } from 'lucide-react';
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
  const [locationStatus, setLocationStatus] = useState<string>('Getting your location...');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        setLocationStatus('Getting your location...');
        
        const data = await fetchWeatherData(units);
        
        if (data) {
          setWeatherData(data);
          setLocationStatus('');
          // Check if this is demo data
          if (data.current.location === 'Demo City') {
            setError('Unable to fetch local weather - showing demo data');
          } else if (data.current.location === 'Irving, TX') {
            setError('Using default location - allow location access for local weather');
          }
        }
      } catch (err) {
        console.error('Weather widget error:', err);
        setError('Failed to load weather data');
        setLocationStatus('');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [units, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className={cn(`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 h-full flex flex-col`, className)}>
        <div className="text-gray-400 animate-pulse flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full mx-auto mb-2"></div>
            <div>{locationStatus}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 h-full flex flex-col`, className)}>
      {error && (
        <div className="flex justify-between items-center mb-2">
          <WeatherError error={error} />
          {error.includes('default location') && (
            <button
              onClick={handleRetry}
              className="text-brand-gold hover:text-yellow-300 transition-colors p-1"
              title="Retry location detection"
            >
              <RefreshCw size={14} />
            </button>
          )}
        </div>
      )}
      
      {weatherData && (
        <>
          <CurrentWeather 
            weatherData={weatherData.current} 
            units={units} 
            hasTitle={false}
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
