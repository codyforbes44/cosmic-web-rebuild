
import React from "react";
import { WeatherPageProvider } from "@/components/weather/WeatherPageProvider";
import WeatherPageLayout from "@/components/weather/WeatherPageLayout";
import SEO from "@/components/SEO";

const Weather: React.FC = () => {
  return (
    <>
      <SEO 
        title="Advanced Weather Analytics & Forecasting"
        description="Get comprehensive weather data with real-time conditions, extended forecasts, air quality monitoring, and interactive weather maps."
        keywords="weather forecast, weather maps, air quality, meteorology, weather analytics"
        image="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&h=630&fit=crop&crop=center"
      />
      <WeatherPageProvider>
        <WeatherPageLayout />
      </WeatherPageProvider>
    </>
  );
};

export default Weather;
