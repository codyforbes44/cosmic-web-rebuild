
import { WeatherResponse } from './types';
import { getCachedWeather, cacheWeatherData } from './CacheService';
import { fetchLocation } from './LocationService';
import { fetchWeatherByLocation } from './WeatherApiService';

const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds

export const fetchWeatherData = async (
  units: 'imperial' | 'metric',
  location?: string
): Promise<WeatherResponse | null> => {
  try {
    // Detect user's location if not provided
    const userLocation = location || await fetchLocation();
    console.log('Weather: Using location:', userLocation);
    
    // Create cache key that includes location
    const cacheKey = `${units}_${userLocation}`;
    
    // Check for cached weather data first
    const cachedData = getCachedWeather(units, userLocation);
    if (cachedData) {
      console.log('Using cached weather data for:', userLocation);
      
      // If the cache is recent (within 30 minutes), use it
      if (Date.now() - (cachedData.current.timestamp || 0) < CACHE_EXPIRY) {
        return cachedData;
      }
    }
    
    // Fetch real weather data from OpenWeatherMap API
    const weatherData = await fetchWeatherByLocation(userLocation, units);
    
    // Cache the weather data
    cacheWeatherData(weatherData, units, userLocation);
    return weatherData;
    
  } catch (err) {
    console.error('Weather fetch error:', err);
    throw err;
  }
};

// Re-export types for backward compatibility
export type { WeatherData, ForecastDay, WeatherResponse } from './types';
