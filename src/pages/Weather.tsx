import React, { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import StarBackground from "@/components/StarBackground";
import WeatherBackground from "@/components/weather/WeatherBackground";
import { fetchWeatherData, WeatherResponse } from "@/components/footer/weather/WeatherService";
import WeatherPageHeader from "@/components/weather/WeatherPageHeader";
import WeatherPageTabs from "@/components/weather/WeatherPageTabs";
import WeatherPageContent from "@/components/weather/WeatherPageContent";
import WeatherLoadingState from "@/components/weather/WeatherLoadingState";
import WeatherErrorCard from "@/components/weather/WeatherErrorCard";
import WeatherAlerts from "@/components/weather/WeatherAlerts";
import AirQualityCard from "@/components/weather/AirQualityCard";
import WeatherSharing from "@/components/weather/WeatherSharing";
import LocationSearch from "@/components/weather/LocationSearch";
import EnhancedWeatherDetails from "@/components/weather/EnhancedWeatherDetails";
import "@/components/weather/WeatherBackground.css";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial');
  const [currentLocation, setCurrentLocation] = useState<string>('');

  // Helper function to determine if it's day or night
  const isDay = (sunrise: string, sunset: string): boolean => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Parse sunrise and sunset times (assuming format like "6:45 AM")
    const sunriseHour = parseInt(sunrise.split(':')[0]) + (sunrise.includes('PM') && !sunrise.startsWith('12') ? 12 : 0);
    const sunsetHour = parseInt(sunset.split(':')[0]) + (sunset.includes('PM') && !sunset.startsWith('12') ? 12 : 0);
    
    return currentHour >= sunriseHour && currentHour < sunsetHour;
  };

  const loadWeatherData = async (location?: string, forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Clear cache if force refresh is requested
      if (forceRefresh) {
        localStorage.removeItem(`weather_data_${units}`);
        console.log('Weather cache cleared - forcing fresh data fetch');
      }
      
      const data = await fetchWeatherData(units);
      
      if (data) {
        setWeatherData(data);
        setCurrentLocation(data.current.location);
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

  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
    // In a real app, you would fetch weather for the new location
    loadWeatherData(newLocation, true);
  };

  useEffect(() => {
    // Force refresh on initial load
    loadWeatherData(undefined, true);
  }, []);

  useEffect(() => {
    // Force refresh when units change
    loadWeatherData(undefined, true);
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
        title="Ʒʙɪ Weather Center"
        description="Comprehensive weather information and forecasts for your location. Real-time conditions, hourly forecasts, and interactive weather maps."
        keywords="weather, forecast, current conditions, temperature, humidity, wind, weather maps, Ʒʙɪ weather"
        image="/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png"
        type="website"
      />
      <Navbar />
      
      {/* Dynamic Weather Background */}
      {weatherData && (
        <WeatherBackground 
          condition={weatherData.current.condition}
          isDay={isDay(weatherData.current.sunrise || '6:00 AM', weatherData.current.sunset || '6:00 PM')}
          className="z-0"
        />
      )}
      
      {/* Star Background Overlay */}
      <StarBackground />
      
      <main className="min-h-screen py-16 md:py-24 px-4 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <WeatherPageHeader />

          {error && <WeatherErrorCard error={error} />}

          {/* Location Search */}
          <div className="mb-6">
            <LocationSearch 
              onLocationChange={handleLocationChange}
              currentLocation={currentLocation}
            />
          </div>

          {weatherData && (
            <>
              <WeatherPageTabs>
                <WeatherPageContent
                  weatherData={weatherData}
                  units={units}
                  onUnitsChange={handleUnitsChange}
                />
              </WeatherPageTabs>

              {/* Enhanced Weather Information */}
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-semibold text-white">Additional Information</h2>
                
                {/* Air Quality */}
                {weatherData.airQuality && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <AirQualityCard airQuality={weatherData.airQuality} />
                    <div className="lg:col-span-2">
                      <EnhancedWeatherDetails weatherData={weatherData} units={units} />
                    </div>
                  </div>
                )}

                {/* Weather Alerts */}
                {weatherData.alerts && weatherData.alerts.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Weather Alerts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {weatherData.alerts.map((alert) => (
                        <div key={alert.id} className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full ${
                              alert.severity === 'extreme' ? 'bg-red-600' :
                              alert.severity === 'severe' ? 'bg-orange-500' :
                              alert.severity === 'moderate' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}></div>
                            <h4 className="text-white font-semibold">{alert.title}</h4>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{alert.description}</p>
                          <p className="text-xs text-gray-400">Expires: {alert.expires}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Weather Sharing - Moved to bottom */}
              <div className="mt-8">
                <WeatherSharing 
                  weatherData={weatherData.current} 
                  units={units}
                />
              </div>
            </>
          )}

          <WeatherAlerts />
        </div>
      </main>
    </>
  );
};

export default Weather;
