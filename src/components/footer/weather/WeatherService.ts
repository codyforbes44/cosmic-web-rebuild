
import { WeatherResponse } from './types';
import { getCachedWeather, cacheWeatherData, isCacheExpired } from './CacheService';
import { fetchLocation } from './LocationService';
import { fetchWeatherByLocation } from './WeatherApiService';
import { generateFallbackWeatherData } from './DemoDataService';

const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds

export const fetchWeatherData = async (units: 'imperial' | 'metric'): Promise<WeatherResponse | null> => {
  try {
    // Check for cached weather data first
    const cachedData = getCachedWeather(units);
    if (cachedData) {
      console.log('Using cached weather data');
      
      // If the cache is recent (within 30 minutes), use it
      if (Date.now() - (cachedData.current.timestamp || 0) < CACHE_EXPIRY) {
        return cachedData;
      }
    }
    
    // Fetch fresh data
    const location = await fetchLocation();
    const weatherData = await fetchWeatherByLocation(location, units);
    
    // Cache the weather data
    cacheWeatherData(weatherData, units);
    return weatherData;
    
  } catch (err) {
    console.error('Weather fetch error:', err);
    
    // Provide demo data as fallback
    const fallbackData = generateFallbackWeatherData(units);
    return fallbackData;
  }
};

// Re-export types for backward compatibility
export type { WeatherData, ForecastDay, WeatherResponse } from './types';
