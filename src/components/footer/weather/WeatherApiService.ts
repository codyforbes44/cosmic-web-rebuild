
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

export const fetchWeatherByLocation = async (location: string, units: 'imperial' | 'metric'): Promise<WeatherResponse> => {
  // Fetch current weather
  const currentWeatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=9de243494c0b295cca9337e1e96b00e2`
  );
  
  if (!currentWeatherResponse.ok) {
    throw new Error(`Weather API error: ${currentWeatherResponse.status}`);
  }
  
  const currentWeatherResult = await currentWeatherResponse.json();
  
  // Fetch 7-day forecast
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=9de243494c0b295cca9337e1e96b00e2`
  );
  
  let forecast: ForecastDay[] = [];
  
  if (forecastResponse.ok) {
    const forecastResult = await forecastResponse.json();
    forecast = processForecastData(forecastResult.list);
  } else {
    console.warn('Forecast API failed, using basic forecast');
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
