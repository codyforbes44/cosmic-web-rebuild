
import React from 'react';

interface WeatherOverlaysProps {
  condition: string;
  animated: boolean;
  isDay: boolean;
  weatherEffect: string | null;
  effectOpacity: string;
}

const WeatherOverlays = ({ condition, animated, isDay, weatherEffect, effectOpacity }: WeatherOverlaysProps) => {
  const normalizedCondition = condition.toLowerCase();

  return (
    <>
      {/* Weather-specific overlay effects - mobile optimized */}
      {weatherEffect && (
        <div className={`absolute inset-0 ${effectOpacity}`}>
          <div className={`${weatherEffect} mobile-optimized`}></div>
        </div>
      )}
      
      {/* Sun rays for clear weather - mobile optimized */}
      {normalizedCondition.includes('clear') && animated && isDay && (
        <div className="absolute inset-0 opacity-15 md:opacity-20">
          <div className="sun-rays mobile-optimized"></div>
        </div>
      )}
      
      {/* Moon and stars for clear night - mobile optimized */}
      {normalizedCondition.includes('clear') && animated && !isDay && (
        <>
          <div className="absolute top-16 right-16 md:top-20 md:right-20 w-12 h-12 md:w-16 md:h-16 bg-slate-100 rounded-full opacity-70 md:opacity-80 shadow-lg shadow-slate-100/50"></div>
          <div className="absolute inset-0 opacity-50 md:opacity-60">
            <div className="stars-effect mobile-optimized"></div>
          </div>
        </>
      )}
      
      {/* Cloud layers for realistic depth - mobile optimized */}
      {(normalizedCondition.includes('cloud') || normalizedCondition.includes('overcast')) && animated && (
        <div className="absolute inset-0 opacity-25 md:opacity-30">
          <div className="cloud-layers mobile-optimized"></div>
        </div>
      )}
      
      {/* Extra atmospheric layer for dramatic weather - mobile optimized */}
      {(normalizedCondition.includes('thunderstorm') || 
        normalizedCondition.includes('tornado')) && animated && (
        <div className="absolute inset-0 opacity-20 md:opacity-25">
          <div className="wind-effect mobile-optimized"></div>
        </div>
      )}
    </>
  );
};

export default WeatherOverlays;
