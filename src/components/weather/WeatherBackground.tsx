
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
    
    // Clear sky
    if (normalizedCondition.includes('clear')) {
      return dayTime 
        ? 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600'
        : 'bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900';
    }
    
    // Few clouds
    if (normalizedCondition.includes('few clouds')) {
      return dayTime
        ? 'bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500'
        : 'bg-gradient-to-b from-indigo-800 via-purple-800 to-blue-800';
    }
    
    // Scattered/broken clouds
    if (normalizedCondition.includes('scattered') || normalizedCondition.includes('broken') || normalizedCondition === 'clouds') {
      return dayTime
        ? 'bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600'
        : 'bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900';
    }
    
    // Overcast
    if (normalizedCondition.includes('overcast')) {
      return 'bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700';
    }
    
    // Heavy rain
    if (normalizedCondition.includes('heavy') && normalizedCondition.includes('rain')) {
      return dayTime
        ? 'bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900'
        : 'bg-gradient-to-b from-gray-900 via-black to-gray-800';
    }
    
    // Rain (all types)
    if (normalizedCondition.includes('rain') && !normalizedCondition.includes('snow')) {
      return dayTime
        ? 'bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800'
        : 'bg-gradient-to-b from-gray-800 via-gray-900 to-black';
    }
    
    // Drizzle
    if (normalizedCondition.includes('drizzle')) {
      return dayTime
        ? 'bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700'
        : 'bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900';
    }
    
    // Thunderstorm
    if (normalizedCondition.includes('thunderstorm')) {
      return 'bg-gradient-to-b from-gray-900 via-black to-purple-900';
    }
    
    // Snow (all types)
    if (normalizedCondition.includes('snow') || normalizedCondition.includes('sleet')) {
      return dayTime
        ? 'bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400'
        : 'bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600';
    }
    
    // Atmospheric conditions (fog, mist, haze, etc.)
    if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist') || 
        normalizedCondition.includes('haze') || normalizedCondition.includes('smoke') ||
        normalizedCondition.includes('dust') || normalizedCondition.includes('sand') ||
        normalizedCondition.includes('ash')) {
      return 'bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500';
    }
    
    // Tornado/Squall
    if (normalizedCondition.includes('tornado') || normalizedCondition.includes('squall')) {
      return 'bg-gradient-to-b from-gray-800 via-gray-900 to-black';
    }
    
    // Hail
    if (normalizedCondition.includes('hail')) {
      return 'bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800';
    }
    
    // Default fallback
    return dayTime
      ? 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600'
      : 'bg-gradient-to-b from-space-dark-blue to-space-deep-blue';
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
    <div className={`fixed inset-0 ${backgroundClass} ${className} transition-all duration-1000`}>
      {/* Weather-specific overlay effects */}
      {weatherEffect && (
        <div className={`absolute inset-0 ${
          weatherEffect.includes('heavy-rain') ? 'opacity-40' :
          weatherEffect.includes('rain') ? 'opacity-35' :
          weatherEffect.includes('snow') ? 'opacity-45' :
          weatherEffect.includes('drizzle') ? 'opacity-25' :
          weatherEffect.includes('cloud') ? 'opacity-30' :
          weatherEffect.includes('storm') ? 'opacity-50' :
          weatherEffect.includes('fog') ? 'opacity-35' :
          weatherEffect.includes('wind') ? 'opacity-25' : 'opacity-30'
        }`}>
          <div className={weatherEffect}></div>
        </div>
      )}
      
      {/* Additional ambient particles for clear weather */}
      {condition.toLowerCase().includes('clear') && animated && (
        <div className="absolute inset-0 opacity-15">
          <div className="sun-rays"></div>
        </div>
      )}
      
      {/* Extra atmospheric layer for dramatic weather */}
      {(condition.toLowerCase().includes('thunderstorm') || 
        condition.toLowerCase().includes('tornado')) && animated && (
        <div className="absolute inset-0 opacity-20">
          <div className="wind-effect"></div>
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
