
import { useState, useEffect } from 'react';
import { Cloud, CloudSun, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';

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
  title = "Your Local Weather",
  units = 'imperial'
}: WeatherWidgetProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // First get the user's location based on IP
        const geoResponse = await fetch('https://ipapi.co/json/');
        const geoData = await geoResponse.json();
        
        if (!geoData.city) {
          throw new Error('Could not determine location');
        }
        
        // Now fetch weather data using the OpenWeatherMap API
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${geoData.city}&units=${units}&appid=9de243494c0b295cca9337e1e96b00e2`
        );
        
        if (!weatherResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const weatherResult = await weatherResponse.json();
        
        // Format location as City, ST, CO where ST is state/region code and CO is country code
        const formattedLocation = `${geoData.city}, ${geoData.region_code || ''}, ${geoData.country_code || ''}`;
        
        setWeatherData({
          location: formattedLocation,
          temperature: Math.round(weatherResult.main.temp),
          condition: weatherResult.weather[0].main,
          humidity: weatherResult.main.humidity,
          windSpeed: Math.round(weatherResult.wind.speed),
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Unable to load weather');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [units]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun size={24} className="text-yellow-400" />;
      case 'clouds':
        return <Cloud size={24} className="text-gray-400" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain size={24} className="text-blue-400" />;
      case 'snow':
        return <CloudSnow size={24} className="text-blue-200" />;
      default:
        return <CloudSun size={24} className="text-yellow-300" />;
    }
  };

  if (loading) {
    return (
      <div className={`bg-transparent backdrop-blur-sm p-4 rounded-lg ${className}`}>
        <h3 className="text-lg font-medium mb-2 text-white">{title}</h3>
        <div className="text-gray-400 animate-pulse">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-transparent backdrop-blur-sm p-4 rounded-lg ${className}`}>
        <h3 className="text-lg font-medium mb-2 text-white">{title}</h3>
        <div className="text-gray-400">{error}</div>
      </div>
    );
  }

  return (
    <div className={`bg-transparent backdrop-blur-sm p-4 rounded-lg ${className}`}>
      <h3 className="text-lg font-medium mb-3 text-white">{title}</h3>
      {weatherData && (
        <div className="text-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{weatherData.location}</span>
            {getWeatherIcon(weatherData.condition)}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-400">Temperature</span>
              <span className="text-2xl font-bold text-white">{weatherData.temperature}°{units === 'imperial' ? 'F' : 'C'}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-400">Condition</span>
              <span>{weatherData.condition}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-400">Humidity</span>
              <span>{weatherData.humidity}%</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-400">Wind</span>
              <div className="flex items-center">
                <Wind size={14} className="mr-1" />
                <span>{weatherData.windSpeed} {units === 'imperial' ? 'mph' : 'm/s'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
