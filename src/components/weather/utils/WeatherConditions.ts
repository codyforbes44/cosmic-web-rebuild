
export const getBackgroundForCondition = (weatherCondition: string, dayTime: boolean): string => {
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
