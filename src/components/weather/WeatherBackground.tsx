
import React from 'react';

interface WeatherBackgroundProps {
  condition: string;
  className?: string;
  isDay?: boolean;
}

const WeatherBackground = ({ condition, className = '', isDay = true }: WeatherBackgroundProps) => {
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
      return 'bg-gradient-to-b from-gray-900 via-black to-gray-900';
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

  const getWeatherEffects = (weatherCondition: string) => {
    const normalizedCondition = weatherCondition.toLowerCase();
    
    if (normalizedCondition.includes('rain') || normalizedCondition.includes('shower')) {
      return 'rain-effect';
    }
    
    if (normalizedCondition.includes('snow') || normalizedCondition.includes('sleet')) {
      return 'snow-effect';
    }
    
    if (normalizedCondition.includes('drizzle')) {
      return 'drizzle-effect';
    }
    
    if (normalizedCondition.includes('cloud')) {
      return 'clouds-effect';
    }
    
    if (normalizedCondition.includes('thunderstorm')) {
      return 'storm-effect';
    }
    
    return null;
  };

  const backgroundClass = getBackgroundForCondition(condition, isDay);
  const weatherEffect = getWeatherEffects(condition);

  return (
    <div className={`fixed inset-0 ${backgroundClass} ${className}`}>
      {/* Weather-specific overlay effects */}
      {weatherEffect && (
        <div className={`absolute inset-0 ${
          weatherEffect.includes('rain') ? 'opacity-20' :
          weatherEffect.includes('snow') ? 'opacity-30' :
          weatherEffect.includes('drizzle') ? 'opacity-15' :
          weatherEffect.includes('cloud') ? 'opacity-15' :
          weatherEffect.includes('storm') ? 'opacity-25' : 'opacity-20'
        }`}>
          <div className={weatherEffect}></div>
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
