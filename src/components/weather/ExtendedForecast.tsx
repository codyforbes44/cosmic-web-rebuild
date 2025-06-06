
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastDay } from '@/components/footer/weather/WeatherService';
import WeatherIcon from '@/components/footer/weather/WeatherIcon';
import { Droplets } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface ExtendedForecastProps {
  forecast: ForecastDay[];
  units: 'imperial' | 'metric';
}

const ExtendedForecast = ({ forecast, units }: ExtendedForecastProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className={`text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <div
              key={index}
              className={`flex items-center justify-between ${isMobile ? 'p-3' : 'p-4'} bg-space-deep-blue/50 rounded-lg border border-gray-700 hover:bg-space-deep-blue/70 transition-colors`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`text-white font-medium ${isMobile ? 'w-10 text-xs' : 'w-12 text-sm'}`}>
                  {index === 0 ? 'Today' : day.date}
                </div>
                <WeatherIcon condition={day.condition} size={isMobile ? 20 : 24} />
                <div className={`text-gray-300 ${isMobile ? 'text-sm truncate' : ''}`}>{day.condition}</div>
              </div>
              
              <div className={`flex items-center ${isMobile ? 'gap-3' : 'gap-6'}`}>
                {!isMobile && (
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">{day.humidity}%</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <span className={`text-white font-semibold ${isMobile ? 'text-sm' : ''}`}>
                    {day.temp_max}°
                  </span>
                  <span className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>
                    {day.temp_min}°
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtendedForecast;
