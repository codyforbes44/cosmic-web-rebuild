import React, { useState } from 'react';
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import WeatherBackground from "./WeatherBackground";
import WeatherPageTabs from "./WeatherPageTabs";
import WeatherPageContent from "./WeatherPageContent";
import WeatherLoadingState from "./WeatherLoadingState";
import WeatherErrorCard from "./WeatherErrorCard";
import WeatherAlerts from "./WeatherAlerts";
import LocationSearch from "./LocationSearch";
import WeatherAdditionalInfo from "./WeatherAdditionalInfo";
import { Toaster } from "@/components/ui/toaster";
import { useWeatherPage } from './WeatherPageProvider';
import { useIsMobile } from "@/hooks/use-mobile";
import FavoriteLocations from './FavoriteLocations';
import { Cloud } from 'lucide-react';
import "@/components/weather/WeatherBackground.css";

const WeatherPageLayout = () => {
  
  const { 
    weatherData, 
    loading, 
    error, 
    units, 
    currentLocation, 
    handleUnitsChange, 
    handleLocationChange,
    isDay 
  } = useWeatherPage();
  
  const isMobile = useIsMobile();
  const [currentTab, setCurrentTab] = useState("current");

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
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
      
      {/* Dynamic Weather Background with animations */}
      {weatherData && (
        <WeatherBackground 
          condition={weatherData.current.condition}
          isDay={isDay}
          className="z-0"
          animated={true}
        />
      )}
      
      <main className={`min-h-screen ${isMobile ? 'py-20 px-3' : 'py-16 md:py-24 px-4'} relative`}>
        <div className={`container mx-auto ${isMobile ? 'max-w-full' : 'max-w-7xl'} relative z-10`}>
          {/* Weather Page Header */}
          <PageHeader 
            title="Ʒʙɪ Weather Center"
            description={isMobile ? "Real-time weather data and forecasts" : "Comprehensive weather information, forecasts, and interactive maps for your location"}
            icon={Cloud}
            className={isMobile ? 'mb-6' : 'mb-8'}
          />

          {error && <WeatherErrorCard error={error} />}

          <div className={`${isMobile ? 'grid grid-cols-1 gap-4' : 'grid md:grid-cols-3 gap-6'}`}>
            {/* Location Search - Mobile Optimized */}
            <div className={`${isMobile ? '' : 'md:col-span-2'}`}>
              <LocationSearch 
                onLocationChange={handleLocationChange}
                currentLocation={currentLocation}
              />
            </div>
            
            {/* Favorite Locations - Desktop Only in Main View */}
            {!isMobile && (
              <div>
                <FavoriteLocations 
                  onLocationSelect={handleLocationChange}
                  currentLocation={currentLocation}
                />
              </div>
            )}
          </div>

          {weatherData && (
            <>
              <div className={`${isMobile ? 'mt-4' : 'mt-6'}`}>
                <WeatherPageTabs onTabChange={handleTabChange}>
                  <WeatherPageContent
                    weatherData={weatherData}
                    units={units}
                    onUnitsChange={handleUnitsChange}
                  />
                </WeatherPageTabs>
              </div>

              {/* Only show Additional Information on Current tab */}
              {currentTab === "current" && <WeatherAdditionalInfo />}
            </>
          )}

          <WeatherAlerts />
        </div>
      </main>
      
      {/* Toast notifications */}
      <Toaster />
    </>
  );
};

export default WeatherPageLayout;
