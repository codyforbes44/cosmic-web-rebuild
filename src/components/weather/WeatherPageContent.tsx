
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { WeatherResponse } from "@/components/footer/weather/WeatherService";
import CurrentWeatherDetails from "@/components/weather/CurrentWeatherDetails";
import ExtendedForecast from "@/components/weather/ExtendedForecast";
import HourlyForecast from "@/components/weather/HourlyForecast";
import WeatherMaps from "@/components/weather/WeatherMaps";
import WeatherSettings from "@/components/weather/WeatherSettings";

interface WeatherPageContentProps {
  weatherData: WeatherResponse;
  units: 'imperial' | 'metric';
  onUnitsChange: (newUnits: 'imperial' | 'metric') => void;
}

const WeatherPageContent = ({ weatherData, units, onUnitsChange }: WeatherPageContentProps) => {
  return (
    <>
      <TabsContent value="current">
        <CurrentWeatherDetails weatherData={weatherData.current} units={units} />
      </TabsContent>

      <TabsContent value="hourly">
        <HourlyForecast units={units} location={weatherData.current.location} />
      </TabsContent>

      <TabsContent value="forecast">
        <ExtendedForecast forecast={weatherData.forecast} units={units} />
      </TabsContent>

      <TabsContent value="maps">
        <WeatherMaps location={weatherData.current.location} />
      </TabsContent>

      <TabsContent value="settings">
        <WeatherSettings 
          currentUnits={units} 
          onUnitsChange={onUnitsChange}
          location={weatherData.current.location}
        />
      </TabsContent>
    </>
  );
};

export default WeatherPageContent;
