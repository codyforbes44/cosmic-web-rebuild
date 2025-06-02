
import { Cloud, CloudSun, Sun, CloudRain, CloudSnow } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number;
}

const WeatherIcon = ({ condition, size = 28 }: WeatherIconProps) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun size={size} className="text-yellow-400" />;
    case 'clouds':
      return <Cloud size={size} className="text-gray-400" />;
    case 'rain':
    case 'drizzle':
      return <CloudRain size={size} className="text-blue-400" />;
    case 'snow':
      return <CloudSnow size={size} className="text-blue-200" />;
    default:
      return <CloudSun size={size} className="text-yellow-300" />;
  }
};

export default WeatherIcon;
