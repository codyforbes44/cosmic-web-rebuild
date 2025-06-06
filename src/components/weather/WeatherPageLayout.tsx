
import React, { useState } from 'react';
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import StarBackground from "@/components/StarBackground";
import WeatherBackground from "./WeatherBackground";
import WeatherPageHeader from "./WeatherPageHeader";
import WeatherPageTabs from "./WeatherPageTabs";
import WeatherPageContent from "./WeatherPageContent";
import WeatherLoadingState from "./WeatherLoadingState";
import WeatherErrorCard from "./WeatherErrorCard";
import WeatherAlerts from "./WeatherAlerts";
import LocationSearch from "./LocationSearch";
import WeatherAdditionalInfo from "./WeatherAdditionalInfo";
import { useWeatherPage } from './WeatherPageProvider';
import { useIsMobile } from "@/hooks/use-mobile";
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
      
      {/* Dynamic Weather Background */}
      {weatherData && (
        <WeatherBackground 
          condition={weatherData.current.condition}
          isDay={isDay}
          className="z-0"
        />
      )}
      
      {/* Star Background Overlay */}
      <StarBackground />
      
      <main className={`min-h-screen ${isMobile ? 'py-20 px-3' : 'py-16 md:py-24 px-4'} relative`}>
        <div className={`container mx-auto ${isMobile ? 'max-w-full' : 'max-w-7xl'} relative z-10`}>
          <WeatherPageHeader />

          {error && <WeatherErrorCard error={error} />}

          {/* Location Search - Mobile Optimized */}
          <div className={`${isMobile ? 'mb-4' : 'mb-6'}`}>
            <LocationSearch 
              onLocationChange={handleLocationChange}
              currentLocation={currentLocation}
            />
          </div>

          {weatherData && (
            <>
              <WeatherPageTabs onTabChange={handleTabChange}>
                <WeatherPageContent
                  weatherData={weatherData}
                  units={units}
                  onUnitsChange={handleUnitsChange}
                />
              </WeatherPageTabs>

              {/* Only show Additional Information on Current tab */}
              {currentTab === "current" && <WeatherAdditionalInfo />}
            </>
          )}

          <WeatherAlerts />
        </div>
      </main>
    </>
  );
};

export default WeatherPageLayout;
