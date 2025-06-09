
export const getWeatherEffects = (weatherCondition: string, isAnimated: boolean): string | null => {
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

export const getEffectOpacity = (weatherEffect: string): string => {
  if (weatherEffect.includes('heavy-rain')) return 'opacity-40 md:opacity-50';
  if (weatherEffect.includes('rain')) return 'opacity-30 md:opacity-40';
  if (weatherEffect.includes('snow')) return 'opacity-35 md:opacity-45';
  if (weatherEffect.includes('drizzle')) return 'opacity-25 md:opacity-30';
  if (weatherEffect.includes('cloud')) return 'opacity-25 md:opacity-35';
  if (weatherEffect.includes('storm')) return 'opacity-45 md:opacity-60';
  if (weatherEffect.includes('fog')) return 'opacity-30 md:opacity-40';
  if (weatherEffect.includes('wind')) return 'opacity-20 md:opacity-25';
  return 'opacity-25 md:opacity-30';
};
