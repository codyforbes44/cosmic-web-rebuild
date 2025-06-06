
import { 
  Cloud, 
  CloudSun, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Wind,
  Snowflake,
  CloudHail,
  Moon
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number;
  isDay?: boolean;
}

const WeatherIcon = ({ condition, size = 28, isDay = true }: WeatherIconProps) => {
  const normalizedCondition = condition.toLowerCase();
  
  // Handle all OpenWeatherMap weather conditions
  switch (normalizedCondition) {
    // Clear sky - handle both "clear" and "clear sky"
    case 'clear':
    case 'clear sky':
      return isDay ? 
        <Sun size={size} className="text-yellow-400" /> :
        <Moon size={size} className="text-blue-200" />;
    
    // Few clouds (11-25%)
    case 'few clouds':
      return isDay ? 
        <CloudSun size={size} className="text-yellow-300" /> : 
        <Cloud size={size} className="text-blue-300" />;
    
    // Scattered clouds (25-50%) or broken clouds (51-84%)
    case 'scattered clouds':
    case 'broken clouds':
    case 'clouds':
      return isDay ? 
        <Cloud size={size} className="text-gray-400" /> :
        <Cloud size={size} className="text-gray-300" />;
    
    // Overcast clouds (85-100%)
    case 'overcast clouds':
      return <Cloud size={size} className="text-gray-500" />;
    
    // Shower rain
    case 'shower rain':
    case 'light intensity shower rain':
    case 'heavy intensity shower rain':
    case 'ragged shower rain':
      return <CloudRain size={size} className="text-blue-500" />;
    
    // Rain
    case 'rain':
    case 'light rain':
    case 'moderate rain':
    case 'heavy intensity rain':
    case 'very heavy rain':
    case 'extreme rain':
    case 'freezing rain':
      return <CloudRain size={size} className="text-blue-400" />;
    
    // Drizzle
    case 'drizzle':
    case 'light intensity drizzle':
    case 'drizzle rain':
    case 'heavy intensity drizzle':
    case 'light intensity drizzle rain':
    case 'shower drizzle':
      return <CloudDrizzle size={size} className="text-blue-300" />;
    
    // Thunderstorm
    case 'thunderstorm':
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'light thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      return <CloudLightning size={size} className="text-purple-400" />;
    
    // Snow
    case 'snow':
    case 'light snow':
    case 'heavy snow':
    case 'sleet':
    case 'light shower sleet':
    case 'shower sleet':
    case 'light rain and snow':
    case 'rain and snow':
    case 'light shower snow':
    case 'shower snow':
    case 'heavy shower snow':
      return <CloudSnow size={size} className="text-blue-200" />;
    
    // Atmosphere conditions
    case 'mist':
    case 'fog':
    case 'haze':
    case 'smoke':
    case 'dust':
    case 'sand':
    case 'ash':
    case 'squall':
      return <CloudFog size={size} className="text-gray-300" />;
    
    // Tornado
    case 'tornado':
      return <Wind size={size} className="text-gray-600" />;
    
    // Hail
    case 'hail':
      return <CloudHail size={size} className="text-blue-100" />;
    
    // Default fallback
    default:
      console.log('Unknown weather condition:', condition);
      return isDay ? 
        <CloudSun size={size} className="text-yellow-300" /> : 
        <Cloud size={size} className="text-gray-400" />;
  }
};

export default WeatherIcon;
