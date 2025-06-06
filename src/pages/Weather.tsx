
import React, { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import { fetchWeatherData, WeatherResponse } from "@/components/footer/weather/WeatherService";
import WeatherPageHeader from "@/components/weather/WeatherPageHeader";
import WeatherPageTabs from "@/components/weather/WeatherPageTabs";
import WeatherPageContent from "@/components/weather/WeatherPageContent";
import WeatherLoadingState from "@/components/weather/WeatherLoadingState";
import WeatherErrorCard from "@/components/weather/WeatherErrorCard";
import WeatherAlerts from "@/components/weather/WeatherAlerts";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial');

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchWeatherData(units);
      
      if (data) {
        setWeatherData(data);
        if (data.current.location === 'Demo City') {
          setError('Unable to fetch local weather - showing demo data');
        }
      }
    } catch (err) {
      console.error('Weather page error:', err);
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, [units]);

  const handleUnitsChange = (newUnits: 'imperial' | 'metric') => {
    setUnits(newUnits);
  };

  if (loading) {
    return <WeatherLoadingState />;
  }

  return (
    <>
      <SEO
        title="Weather | ƷBI"
        description="Comprehensive weather information and forecasts for your location"
        keywords="weather, forecast, current conditions, temperature, humidity, wind"
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-space-dark-blue to-space-deep-blue py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <WeatherPageHeader />

          {error && <WeatherErrorCard error={error} />}

          {weatherData && (
            <WeatherPageTabs>
              <WeatherPageContent
                weatherData={weatherData}
                units={units}
                onUnitsChange={handleUnitsChange}
              />
            </WeatherPageTabs>
          )}

          <WeatherAlerts />
        </div>
      </main>
    </>
  );
};

export default Weather;
