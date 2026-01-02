
import { WeatherResponse } from './types';

const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds

const getCacheKey = (units: 'imperial' | 'metric', location?: string): string => {
  const normalizedLocation = location?.toLowerCase().replace(/\s+/g, '_') || 'default';
  return `weather_data_${units}_${normalizedLocation}`;
};

export const getCachedWeather = (units: 'imperial' | 'metric', location?: string): WeatherResponse | null => {
  try {
    const cacheKey = getCacheKey(units, location);
    const cachedDataString = localStorage.getItem(cacheKey);
    if (!cachedDataString) return null;
    
    const cachedData: WeatherResponse = JSON.parse(cachedDataString);
    
    // Return null if the cache is old (older than 30 minutes)
    if (!cachedData.current.timestamp || Date.now() - cachedData.current.timestamp > CACHE_EXPIRY) {
      console.log('Cached weather data expired');
      return null;
    }
    
    return cachedData;
  } catch (err) {
    console.error('Error retrieving cached weather:', err);
    return null;
  }
};

export const cacheWeatherData = (data: WeatherResponse, units: 'imperial' | 'metric', location?: string) => {
  try {
    const cacheKey = getCacheKey(units, location);
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (err) {
    console.error('Error caching weather data:', err);
  }
};

export const isCacheExpired = (timestamp: number): boolean => {
  return Date.now() - timestamp > CACHE_EXPIRY;
};
