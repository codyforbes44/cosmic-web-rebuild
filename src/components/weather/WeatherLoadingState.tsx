import React from 'react';
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import { WeatherSkeleton } from "@/components/ui/UnifiedLoading";

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
          <WeatherSkeleton />
        </div>
      </main>
    </>
  );
};

export default WeatherLoadingState;
