
import { ForecastDay } from './WeatherService';
import WeatherIcon from './WeatherIcon';

interface WeatherForecastProps {
  forecast: ForecastDay[];
  units: 'imperial' | 'metric';
}

const WeatherForecast = ({ forecast, units }: WeatherForecastProps) => {
  return (
    <div className="border-t border-gray-700 pt-3">
      <h4 className="text-sm font-medium text-gray-400 mb-3">7-Day Forecast</h4>
      <div className="grid grid-cols-7 gap-1 text-center">
        {forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center p-1">
            <span className="text-xs text-gray-400 mb-1">{day.date}</span>
            <WeatherIcon condition={day.condition} size={16} />
            <div className="mt-1">
              <div className="text-xs font-medium text-white">
                {day.temp_max}°
              </div>
              <div className="text-xs text-gray-500">
                {day.temp_min}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
