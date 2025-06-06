
import React from "react";
import { WeatherPageProvider } from "@/components/weather/WeatherPageProvider";
import WeatherPageLayout from "@/components/weather/WeatherPageLayout";

const Weather: React.FC = () => {
  return (
    <WeatherPageProvider>
      <WeatherPageLayout />
    </WeatherPageProvider>
  );
};

export default Weather;
