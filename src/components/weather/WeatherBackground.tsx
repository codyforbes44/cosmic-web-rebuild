
import React from 'react';

interface WeatherBackgroundProps {
  condition: string;
  className?: string;
  isDay?: boolean;
  animated?: boolean;
}

const WeatherBackground = ({ condition, className = '', isDay = true, animated = false }: WeatherBackgroundProps) => {
  const getBackgroundForCondition = (weatherCondition: string, dayTime: boolean) => {
    const normalizedCondition = weatherCondition.toLowerCase();
    
    // Clear sky - more realistic sky colors
    if (normalizedCondition.includes('clear')) {
      return dayTime 
        ? 'bg-gradient-to-b from-sky-300 via-sky-400 to-blue-500'
        : 'bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900';
    }
    
    // Few clouds - lighter cloud coverage
    if (normalizedCondition.includes('few clouds')) {
      return dayTime
        ? 'bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400'
        : 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900';
    }
    
    // Scattered/broken clouds - more overcast appearance
    if (normalizedCondition.includes('scattered') || normalizedCondition.includes('broken') || normalizedCondition === 'clouds') {
      return dayTime
        ? 'bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500'
        : 'bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900';
    }
    
    // Overcast - heavy cloud cover
    if (normalizedCondition.includes('overcast')) {
      return 'bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600';
    }
    
    // Heavy rain - dark stormy skies
    if (normalizedCondition.includes('heavy') && normalizedCondition.includes('rain')) {
      return dayTime
        ? 'bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800'
        : 'bg-gradient-to-b from-slate-900 via-gray-900 to-black';
    }
    
    // Rain - typical rainy day colors
    if (normalizedCondition.includes('rain') && !normalizedCondition.includes('snow')) {
      return dayTime
        ? 'bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600'
        : 'bg-gradient-to-b from-slate-700 via-slate-800 to-gray-900';
    }
    
    // Drizzle - light rain atmosphere
    if (normalizedCondition.includes('drizzle')) {
      return dayTime
        ? 'bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500'
        : 'bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800';
    }
    
    // Thunderstorm - dramatic dark skies
    if (normalizedCondition.includes('thunderstorm')) {
      return 'bg-gradient-to-b from-slate-800 via-gray-900 to-slate-900';
    }
    
    // Snow - winter atmosphere
    if (normalizedCondition.includes('snow') || normalizedCondition.includes('sleet')) {
      return dayTime
        ? 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400'
        : 'bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800';
    }
    
    // Atmospheric conditions - hazy/misty appearance
    if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist') || 
        normalizedCondition.includes('haze') || normalizedCondition.includes('smoke') ||
        normalizedCondition.includes('dust') || normalizedCondition.includes('sand') ||
        normalizedCondition.includes('ash')) {
      return dayTime
        ? 'bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300'
        : 'bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700';
    }
    
    // Tornado/Squall - severe weather
    if (normalizedCondition.includes('tornado') || normalizedCondition.includes('squall')) {
      return 'bg-gradient-to-b from-slate-700 via-slate-800 to-gray-900';
    }
    
    // Hail - stormy conditions
    if (normalizedCondition.includes('hail')) {
      return 'bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700';
    }
    
    // Default fallback
    return dayTime
      ? 'bg-gradient-to-b from-sky-300 via-sky-400 to-blue-500'
      : 'bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900';
  };

  const getWeatherEffects = (weatherCondition: string, isAnimated: boolean) => {
    if (!isAnimated) return null;
    
    const normalizedCondition = weatherCondition.toLowerCase();
    
    // Heavy rain effects
    if (normalizedCondition.includes('heavy') && normalizedCondition.includes('rain')) {
      return 'heavy-rain-effect';
    }
    
    // Regular rain effects
    if (normalizedCondition.includes('rain') || normalizedCondition.includes('shower')) {
      return 'rain-effect';
    }
    
    // Snow effects
    if (normalizedCondition.includes('snow') || normalizedCondition.includes('sleet')) {
      return 'snow-effect';
    }
    
    // Drizzle effects
    if (normalizedCondition.includes('drizzle')) {
      return 'drizzle-effect';
    }
    
    // Cloud effects
    if (normalizedCondition.includes('cloud')) {
      return 'clouds-effect';
    }
    
    // Thunderstorm effects
    if (normalizedCondition.includes('thunderstorm')) {
      return 'storm-effect';
    }
    
    // Fog/Mist effects
    if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist') || 
        normalizedCondition.includes('haze')) {
      return 'fog-effect';
    }
    
    // Wind effects
    if (normalizedCondition.includes('wind') || normalizedCondition.includes('squall')) {
      return 'wind-effect';
    }
    
    return null;
  };

  const backgroundClass = getBackgroundForCondition(condition, isDay);
  const weatherEffect = getWeatherEffects(condition, animated);

  return (
    <div className={`fixed inset-0 ${backgroundClass} ${className} transition-all duration-1000 overflow-hidden`}>
      {/* Atmospheric overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
      
      {/* Weather-specific overlay effects - mobile optimized */}
      {weatherEffect && (
        <div className={`absolute inset-0 ${
          weatherEffect.includes('heavy-rain') ? 'opacity-40 md:opacity-50' :
          weatherEffect.includes('rain') ? 'opacity-30 md:opacity-40' :
          weatherEffect.includes('snow') ? 'opacity-35 md:opacity-45' :
          weatherEffect.includes('drizzle') ? 'opacity-25 md:opacity-30' :
          weatherEffect.includes('cloud') ? 'opacity-25 md:opacity-35' :
          weatherEffect.includes('storm') ? 'opacity-45 md:opacity-60' :
          weatherEffect.includes('fog') ? 'opacity-30 md:opacity-40' :
          weatherEffect.includes('wind') ? 'opacity-20 md:opacity-25' : 'opacity-25 md:opacity-30'
        }`}>
          <div className={`${weatherEffect} mobile-optimized`}></div>
        </div>
      )}
      
      {/* Sun rays for clear weather - mobile optimized */}
      {condition.toLowerCase().includes('clear') && animated && isDay && (
        <div className="absolute inset-0 opacity-15 md:opacity-20">
          <div className="sun-rays mobile-optimized"></div>
        </div>
      )}
      
      {/* Moon and stars for clear night - mobile optimized */}
      {condition.toLowerCase().includes('clear') && animated && !isDay && (
        <>
          <div className="absolute top-16 right-16 md:top-20 md:right-20 w-12 h-12 md:w-16 md:h-16 bg-slate-100 rounded-full opacity-70 md:opacity-80 shadow-lg shadow-slate-100/50"></div>
          <div className="absolute inset-0 opacity-50 md:opacity-60">
            <div className="stars-effect mobile-optimized"></div>
          </div>
        </>
      )}
      
      {/* Cloud layers for realistic depth - mobile optimized */}
      {(condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) && animated && (
        <div className="absolute inset-0 opacity-25 md:opacity-30">
          <div className="cloud-layers mobile-optimized"></div>
        </div>
      )}
      
      {/* Extra atmospheric layer for dramatic weather - mobile optimized */}
      {(condition.toLowerCase().includes('thunderstorm') || 
        condition.toLowerCase().includes('tornado')) && animated && (
        <div className="absolute inset-0 opacity-20 md:opacity-25">
          <div className="wind-effect mobile-optimized"></div>
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
