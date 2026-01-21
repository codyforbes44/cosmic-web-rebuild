
import { formatTimeDisplay } from '@/utils/timezone';
import { WeatherResponse, WeatherData, ForecastDay } from './types';
import { processForecastData, generateBasicForecast } from './services/ForecastService';
import { fetchAirQuality } from './services/AirQualityService';
import { fetchUVIndex } from './services/UVIndexService';
import { fetchWeatherAlerts } from './services/WeatherAlertsService';
import { fetchMoonPhase } from './services/MoonPhaseService';
import { 
  fetchTideData, 
  fetchHistoricalWeather, 
  fetchPollenData, 
  fetchFireWeatherData 
} from './services/AdditionalDataService';
import { supabase } from '@/integrations/supabase/client';

// Helper to fetch weather data through our secure edge function
const fetchFromWeatherProxy = async (location: string, units: string, endpoint: string) => {
  const { data, error } = await supabase.functions.invoke('weather-proxy', {
    body: { location, units, endpoint }
  });
  
  if (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
  
  if (data?.error) {
    throw new Error(data.error);
  }
  
  return data;
};

export const fetchWeatherByLocation = async (location: string, units: 'imperial' | 'metric'): Promise<WeatherResponse> => {
  // Fetch current weather through edge function
  const currentWeatherResult = await fetchFromWeatherProxy(location, units, 'weather');
  
  // Fetch 7-day forecast through edge function
  let forecast: ForecastDay[] = [];
  
  try {
    const forecastResult = await fetchFromWeatherProxy(location, units, 'forecast');
    forecast = processForecastData(forecastResult.list);
  } catch (err) {
    console.warn('Forecast API failed, using basic forecast:', err);
    forecast = generateBasicForecast(currentWeatherResult, units);
  }
  
  // Get coordinates for additional data
  const lat = currentWeatherResult.coord.lat;
  const lon = currentWeatherResult.coord.lon;
  
  // Convert sunrise/sunset times to UTC-6
  const sunriseTime = new Date(currentWeatherResult.sys.sunrise * 1000);
  const sunsetTime = new Date(currentWeatherResult.sys.sunset * 1000);
  
  // Get the exact weather condition description from API
  const weatherCondition = currentWeatherResult.weather[0].description;
  
  const current: WeatherData = {
    location: location,
    temperature: Math.round(currentWeatherResult.main.temp),
    condition: weatherCondition,
    humidity: currentWeatherResult.main.humidity,
    windSpeed: Math.round(currentWeatherResult.wind.speed),
    timestamp: Date.now(),
    feelsLike: Math.round(currentWeatherResult.main.feels_like),
    pressure: units === 'imperial' 
      ? parseFloat((currentWeatherResult.main.pressure * 0.02953).toFixed(2))
      : currentWeatherResult.main.pressure,
    pressureTrend: 'steady',
    uvIndex: await fetchUVIndex(lat, lon),
    visibility: units === 'imperial' 
      ? Math.round(currentWeatherResult.visibility * 0.000621371)
      : Math.round(currentWeatherResult.visibility / 1000),
    dewPoint: Math.round(currentWeatherResult.main.temp - ((100 - currentWeatherResult.main.humidity) / 5)),
    sunrise: formatTimeDisplay(sunriseTime),
    sunset: formatTimeDisplay(sunsetTime),
  };
  
  return { 
    current, 
    forecast,
    airQuality: await fetchAirQuality(lat, lon),
    alerts: await fetchWeatherAlerts(lat, lon),
    moonPhase: await fetchMoonPhase(),
    tides: await fetchTideData(lat, lon),
    history: await fetchHistoricalWeather(lat, lon, units),
    pollen: await fetchPollenData(lat, lon),
    fireWeather: await fetchFireWeatherData(lat, lon)
  };
};
