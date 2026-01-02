/**
 * Weather utility functions
 * Consolidated utilities for weather-related calculations
 */

/**
 * Determines if it's currently daytime based on sunrise and sunset times
 * @param sunrise - Sunrise time string (e.g., "6:45 AM")
 * @param sunset - Sunset time string (e.g., "7:30 PM")
 * @returns boolean indicating if it's currently daytime
 */
export const isDay = (sunrise: string, sunset: string): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Parse sunrise and sunset times (assuming format like "6:45 AM" or "7:30 PM")
  const sunriseHour = parseInt(sunrise.split(':')[0]) + 
    (sunrise.includes('PM') && !sunrise.startsWith('12') ? 12 : 0);
  const sunsetHour = parseInt(sunset.split(':')[0]) + 
    (sunset.includes('PM') && !sunset.startsWith('12') ? 12 : 0);
  
  return currentHour >= sunriseHour && currentHour < sunsetHour;
};

/**
 * Formats temperature with unit
 * @param temp - Temperature value
 * @param unit - Temperature unit ('C' or 'F')
 * @returns Formatted temperature string
 */
export const formatTemperature = (temp: number, unit: 'C' | 'F' = 'F'): string => {
  return `${Math.round(temp)}°${unit}`;
};

/**
 * Converts Celsius to Fahrenheit
 * @param celsius - Temperature in Celsius
 * @returns Temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

/**
 * Converts Fahrenheit to Celsius
 * @param fahrenheit - Temperature in Fahrenheit
 * @returns Temperature in Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5/9;
};

/**
 * Gets wind direction text from degrees
 * @param degrees - Wind direction in degrees
 * @returns Cardinal direction string
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Formats humidity percentage
 * @param humidity - Humidity value (0-100)
 * @returns Formatted humidity string
 */
export const formatHumidity = (humidity: number): string => {
  return `${Math.round(humidity)}%`;
};

/**
 * Formats visibility in miles or kilometers
 * @param visibility - Visibility in meters
 * @param unit - 'mi' for miles, 'km' for kilometers
 * @returns Formatted visibility string
 */
export const formatVisibility = (visibility: number, unit: 'mi' | 'km' = 'mi'): string => {
  if (unit === 'mi') {
    return `${(visibility / 1609.34).toFixed(1)} mi`;
  }
  return `${(visibility / 1000).toFixed(1)} km`;
};
