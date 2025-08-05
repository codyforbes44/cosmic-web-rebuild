
import { WeatherResponse } from './types';
import { getCachedWeather, cacheWeatherData } from './CacheService';
import { fetchOpenAIWeather } from './OpenAIWeatherService';

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
    
    // Generate weather data using OpenAI
    const weatherData = await fetchOpenAIWeather(units);
    
    // Cache the weather data
    cacheWeatherData(weatherData, units);
    return weatherData;
    
  } catch (err) {
    console.error('Weather generation error:', err);
    throw err;
  }
};

// Re-export types for backward compatibility
export type { WeatherData, ForecastDay, WeatherResponse } from './types';
