import React from 'react';
import { useWeatherPage } from './WeatherPageProvider';
import { useIsMobile } from "@/hooks/use-mobile";
import AirQualityCard from './AirQualityCard';
import EnhancedWeatherDetails from './EnhancedWeatherDetails';
import WeatherSharing from './WeatherSharing';
const WeatherAdditionalInfo = () => {
  const {
    weatherData,
    units
  } = useWeatherPage();
  const isMobile = useIsMobile();
  if (!weatherData) return null;
  return;
};
export default WeatherAdditionalInfo;