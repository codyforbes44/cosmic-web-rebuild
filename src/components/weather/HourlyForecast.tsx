
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeatherIcon from '@/components/footer/weather/WeatherIcon';
import { Droplets } from 'lucide-react';

interface HourlyForecastProps {
  units: 'imperial' | 'metric';
  location: string;
}

const HourlyForecast = ({ units, location }: HourlyForecastProps) => {
  // Generate mock hourly data for the next 24 hours
  const generateHourlyData = () => {
    const hours = [];
    const currentTime = new Date();
    const conditions = ['Clear', 'Clouds', 'Rain', 'Clear', 'Clouds'];
    
    for (let i = 0; i < 24; i++) {
      const time = new Date(currentTime.getTime() + i * 60 * 60 * 1000);
      const baseTemp = units === 'imperial' ? 70 : 21;
      const tempVariation = Math.sin(i * Math.PI / 12) * 10; // Temperature curve
      
      hours.push({
        time: time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temperature: Math.round(baseTemp + tempVariation),
        condition: conditions[i % conditions.length],
        humidity: 40 + (i % 30),
        precipitation: Math.random() > 0.7 ? Math.round(Math.random() * 20) : 0,
      });
    }
    
    return hours;
  };

  const hourlyData = generateHourlyData();

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white">24-Hour Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ minWidth: '1200px' }}>
            {hourlyData.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-space-deep-blue/50 rounded-lg border border-gray-700 min-w-[100px]"
              >
                <div className="text-sm text-gray-300 mb-2">
                  {index === 0 ? 'Now' : hour.time}
                </div>
                
                <WeatherIcon condition={hour.condition} size={20} />
                
                <div className="text-lg font-semibold text-white my-2">
                  {hour.temperature}°
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-gray-400">{hour.humidity}%</span>
                </div>
                
                {hour.precipitation > 0 && (
                  <div className="text-xs text-blue-300">
                    {hour.precipitation}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
