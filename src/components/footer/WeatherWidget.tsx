
import { useState, useEffect } from 'react';
import { Cloud, CloudSun, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get user's location from IP
        const geoResponse = await fetch('https://ipapi.co/json/');
        if (!geoResponse.ok) {
          throw new Error('Unable to determine your location');
        }
        
        const geoData = await geoResponse.json();
        const userLocation = geoData.city;
        
        if (!userLocation) {
          throw new Error('Location not available');
        }
        
        // Fetch weather data using OpenWeatherMap API
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&units=${units}&appid=9de243494c0b295cca9337e1e96b00e2`
        );
        
        if (!weatherResponse.ok) {
          throw new Error(`Weather API error: ${weatherResponse.status}`);
        }
        
        const weatherResult = await weatherResponse.json();
        
        setWeatherData({
          location: userLocation,
          temperature: Math.round(weatherResult.main.temp),
          condition: weatherResult.weather[0].main,
          humidity: weatherResult.main.humidity,
          windSpeed: Math.round(weatherResult.wind.speed),
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Unable to fetch local weather');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [units]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun size={28} className="text-yellow-400" />;
      case 'clouds':
        return <Cloud size={28} className="text-gray-400" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain size={28} className="text-blue-400" />;
      case 'snow':
        return <CloudSnow size={28} className="text-blue-200" />;
      default:
        return <CloudSun size={28} className="text-yellow-300" />;
    }
  };

  if (loading) {
    return (
      <div className={`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[320px] flex flex-col ${className}`}>
        {title && <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>}
        <div className="text-gray-400 animate-pulse flex-grow flex items-center justify-center">
          Detecting your location...
        </div>
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className={`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[320px] flex flex-col ${className}`}>
        {title && <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>}
        <div className="text-amber-400 flex-grow flex items-center justify-center text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 flex flex-col ${!title ? 'min-h-[180px]' : 'min-h-[320px]'} ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-5 text-white">{title}</h3>}
      
      {weatherData && (
        <div className="text-gray-200 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-white">{weatherData.location}</span>
            {getWeatherIcon(weatherData.condition)}
          </div>
          
          <div className={`mt-2 ${!title ? 'mb-2' : 'mb-4'}`}>
            <div className="flex items-center mb-2">
              <Thermometer size={18} className="mr-2 text-brand-gold" />
              <span className="text-gray-400">Temperature</span>
            </div>
            <span className="text-3xl font-bold text-white block ml-6">{weatherData.temperature}°{units === 'imperial' ? 'F' : 'C'}</span>
          </div>
          
          <div className="mt-auto grid grid-cols-2 gap-4">
            <div className="flex flex-col bg-space-deep-blue/50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Droplets size={16} className="mr-2 text-blue-400" />
                <span className="text-gray-400 text-sm">Humidity</span>
              </div>
              <span className="text-lg font-medium ml-6">{weatherData.humidity}%</span>
            </div>
            
            <div className="flex flex-col bg-space-deep-blue/50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Wind size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-400 text-sm">Wind</span>
              </div>
              <span className="text-lg font-medium ml-6">{weatherData.windSpeed} {units === 'imperial' ? 'mph' : 'm/s'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
