
import React from 'react';
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";

const WeatherLoadingState = () => {
  return (
    <>
      <SEO
        title="Weather | ƷBI"
        description="Comprehensive weather information and forecasts"
        keywords="weather, forecast, current conditions, temperature"
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-space-dark-blue to-space-deep-blue py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center items-center h-32 md:h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-white text-sm md:text-base">Loading weather data...</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default WeatherLoadingState;
