
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Sunset, Sunrise } from 'lucide-react';
import { WeatherData } from '@/components/footer/weather/WeatherService';
import WeatherIcon from '@/components/footer/weather/WeatherIcon';
import { useIsMobile } from "@/hooks/use-mobile";

interface CurrentWeatherDetailsProps {
  weatherData: WeatherData;
  units: 'imperial' | 'metric';
}

const CurrentWeatherDetails = ({ weatherData, units }: CurrentWeatherDetailsProps) => {
  const isMobile = useIsMobile();

  // Mock additional weather data for demo purposes
  const additionalData = {
    feelsLike: units === 'imperial' ? weatherData.temperature + 3 : weatherData.temperature + 2,
    visibility: units === 'imperial' ? '10 mi' : '16 km',
    pressure: units === 'imperial' ? '30.12 in' : '1020 hPa',
    uvIndex: 5,
    sunrise: '6:45 AM',
    sunset: '7:20 PM',
    dewPoint: units === 'imperial' ? weatherData.temperature - 10 : weatherData.temperature - 5,
  };

  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-3 gap-6'}`}>
      {/* Main Current Weather */}
      <Card className={`${isMobile ? 'col-span-1' : 'lg:col-span-2'} bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/10`}>
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className={isMobile ? 'text-lg' : 'text-xl'}>{weatherData.location}</span>
            <WeatherIcon condition={weatherData.condition} size={isMobile ? 32 : 40} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-8'}`}>
            <div className="text-center md:text-left">
              <div className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-bold text-white mb-2`}>
                {weatherData.temperature}°{units === 'imperial' ? 'F' : 'C'}
              </div>
              <div className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-300 mb-4`}>{weatherData.condition}</div>
              <div className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-400`}>
                Feels like {additionalData.feelsLike}°{units === 'imperial' ? 'F' : 'C'}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
                <div className="bg-white/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">Humidity</span>
                  </div>
                  <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-white`}>{weatherData.humidity}%</div>
                </div>
                
                <div className="bg-white/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Wind</span>
                  </div>
                  <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-white`}>
                    {weatherData.windSpeed} {units === 'imperial' ? 'mph' : 'm/s'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Weather Details */}
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className={`text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Visibility</span>
            </div>
            <span className="text-white text-sm">{additionalData.visibility}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Pressure</span>
            </div>
            <span className="text-white text-sm">{additionalData.pressure}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">UV Index</span>
            </div>
            <span className="text-white text-sm">{additionalData.uvIndex}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Dew Point</span>
            </div>
            <span className="text-white text-sm">{additionalData.dewPoint}°</span>
          </div>
          
          <div className="border-t border-gray-700 pt-3 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sunrise className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">Sunrise</span>
              </div>
              <span className="text-white text-sm">{additionalData.sunrise}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sunset className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-300">Sunset</span>
              </div>
              <span className="text-white text-sm">{additionalData.sunset}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeatherDetails;
