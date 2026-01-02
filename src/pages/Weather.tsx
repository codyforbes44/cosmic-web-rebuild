import React from "react";
import { WeatherPageProvider } from "@/components/weather/WeatherPageProvider";
import WeatherPageLayout from "@/components/weather/WeatherPageLayout";
import SEO from "@/components/SEO";
import { QueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';

const Weather: React.FC = () => {
  return (
    <>
      <SEO 
        title="Weather Dashboard - Real-Time Weather Tracking"
        description="Track real-time weather conditions with interactive forecasts, location-based weather data, and detailed meteorological information."
        keywords="weather dashboard, real-time weather, weather forecast, meteorology, weather tracking"
        image="/og-images/weather.png"
      />
      <QueryErrorBoundary
        fallbackTitle="Weather Data Unavailable"
        fallbackDescription="Unable to load weather data. Please try again."
      >
        <WeatherPageProvider>
          <WeatherPageLayout />
        </WeatherPageProvider>
      </QueryErrorBoundary>
    </>
  );
};

export default Weather;
