
import { WeatherResponse, ForecastDay } from './types';

// This file now only serves as an absolute fallback when all APIs fail
export const generateDemoForecast = (units: 'imperial' | 'metric'): ForecastDay[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const conditions = ['clear sky', 'few clouds', 'light rain', 'clear sky', 'scattered clouds', 'clear sky', 'moderate rain'];
  
  return days.map((day, index) => ({
    date: day,
    temp_max: units === 'imperial' ? 75 + index : 24 + index,
    temp_min: units === 'imperial' ? 65 + index : 18 + index,
    condition: conditions[index],
    humidity: 45 + (index * 5)
  }));
};

export const generateFallbackWeatherData = (units: 'imperial' | 'metric'): WeatherResponse => {
  console.warn('Using fallback demo data - all weather APIs failed');
  
  return {
    current: {
      location: 'Demo City',
      temperature: units === 'imperial' ? 72 : 22,
      condition: 'Few clouds',
      humidity: 45,
      windSpeed: units === 'imperial' ? 5 : 8,
      timestamp: Date.now(),
      feelsLike: units === 'imperial' ? 75 : 24,
      pressure: units === 'imperial' ? 30.12 : 1020,
      pressureTrend: 'steady',
      uvIndex: 5,
      visibility: units === 'imperial' ? 10 : 16,
      dewPoint: units === 'imperial' ? 62 : 17,
      sunrise: '6:45 AM',
      sunset: '7:20 PM',
    },
    forecast: generateDemoForecast(units),
    airQuality: null,
    alerts: [],
    moonPhase: null,
    tides: null,
    history: null,
    pollen: null,
    fireWeather: null
  };
};
