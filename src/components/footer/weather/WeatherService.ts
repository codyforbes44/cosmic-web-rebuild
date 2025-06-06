
interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  timestamp?: number;
  feelsLike?: number;
  pressure?: number;
  pressureTrend?: 'rising' | 'falling' | 'steady';
  uvIndex?: number;
  visibility?: number;
  dewPoint?: number;
  sunrise?: string;
  sunset?: string;
}

interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  condition: string;
  humidity: number;
}

interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastDay[];
  airQuality?: AirQualityData;
  alerts?: WeatherAlert[];
  moonPhase?: MoonPhase;
  tides?: TideData;
  history?: HistoricalWeather[];
  pollen?: {
    overall: number;
    grass: number;
    weeds: number;
    trees: number;
  };
  fireWeather?: {
    index: number;
    risk: string;
    recommendations: string[];
  };
}

import { AirQualityData, generateDemoAirQuality } from './AirQualityService';
import { WeatherAlert, generateDemoAlerts } from './WeatherAlertsService';
import { MoonPhase, generateDemoMoonPhase } from './MoonPhaseService';
import { TideData, generateDemoTides } from './TidesService';
import { HistoricalWeather, generateDemoHistory } from './HistoricalWeatherService';
import { generateDemoPollen, generateDemoFireWeather } from './EnvironmentalDataService';

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
    const fallbackData: WeatherResponse = {
      current: {
        location: 'Demo City',
        temperature: units === 'imperial' ? 72 : 22,
        condition: 'Clouds',
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
      airQuality: generateDemoAirQuality(),
      alerts: generateDemoAlerts(),
      moonPhase: generateDemoMoonPhase(),
      tides: generateDemoTides(),
      history: generateDemoHistory(units),
      pollen: generateDemoPollen(),
      fireWeather: generateDemoFireWeather()
    };
    
    return fallbackData;
  }
};

const fetchLocation = async (): Promise<string> => {
  // Try multiple geo-location services
  let userLocation: string | null = null;
  
  // First attempt: ipapi.co
  try {
    const geoResponse = await fetch('https://ipapi.co/json/');
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      userLocation = geoData.city;
    }
  } catch (err) {
    console.log('Primary location service failed:', err);
  }

  // Second attempt: alternative geo API if first one fails
  if (!userLocation) {
    try {
      const backupGeoResponse = await fetch('https://geolocation-db.com/json/');
      if (backupGeoResponse.ok) {
        const backupGeoData = await backupGeoResponse.json();
        userLocation = backupGeoData.city;
      }
    } catch (err) {
      console.log('Secondary location service failed:', err);
    }
  }
  
  // If both attempts fail, use a default city
  return userLocation || 'New York';
};

const fetchWeatherByLocation = async (location: string, units: 'imperial' | 'metric'): Promise<WeatherResponse> => {
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
    // Generate demo forecast if API fails
    forecast = generateDemoForecast(units);
  }
  
  const current: WeatherData = {
    location: location,
    temperature: Math.round(currentWeatherResult.main.temp),
    condition: currentWeatherResult.weather[0].main,
    humidity: currentWeatherResult.main.humidity,
    windSpeed: Math.round(currentWeatherResult.wind.speed),
    timestamp: Date.now(),
    feelsLike: Math.round(currentWeatherResult.main.feels_like),
    pressure: units === 'imperial' 
      ? parseFloat((currentWeatherResult.main.pressure * 0.02953).toFixed(2))
      : currentWeatherResult.main.pressure,
    pressureTrend: 'steady',
    uvIndex: 5,
    visibility: units === 'imperial' 
      ? Math.round(currentWeatherResult.visibility * 0.000621371)
      : Math.round(currentWeatherResult.visibility / 1000),
    dewPoint: Math.round(currentWeatherResult.main.temp - ((100 - currentWeatherResult.main.humidity) / 5)),
    sunrise: new Date(currentWeatherResult.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    }),
    sunset: new Date(currentWeatherResult.sys.sunset * 1000).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    }),
  };
  
  return { 
    current, 
    forecast,
    airQuality: generateDemoAirQuality(),
    alerts: generateDemoAlerts(),
    moonPhase: generateDemoMoonPhase(),
    tides: generateDemoTides(),
    history: generateDemoHistory(units),
    pollen: generateDemoPollen(),
    fireWeather: generateDemoFireWeather()
  };
};

const processForecastData = (forecastList: any[]): ForecastDay[] => {
  const dailyForecasts: { [key: string]: any[] } = {};
  
  // Group forecasts by date
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(item);
  });
  
  // Process each day and take first 7 days
  return Object.entries(dailyForecasts)
    .slice(0, 7)
    .map(([date, forecasts]) => {
      const temps = forecasts.map(f => f.main.temp);
      const humidities = forecasts.map(f => f.main.humidity);
      const conditions = forecasts.map(f => f.weather[0].main);
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        temp_max: Math.round(Math.max(...temps)),
        temp_min: Math.round(Math.min(...temps)),
        condition: conditions[0],
        humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length)
      };
    });
};

const generateDemoForecast = (units: 'imperial' | 'metric'): ForecastDay[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const conditions = ['Clear', 'Clouds', 'Rain', 'Clear', 'Clouds', 'Clear', 'Rain'];
  
  return days.map((day, index) => ({
    date: day,
    temp_max: units === 'imperial' ? 75 + index : 24 + index,
    temp_min: units === 'imperial' ? 65 + index : 18 + index,
    condition: conditions[index],
    humidity: 45 + (index * 5)
  }));
};

const getCachedWeather = (units: 'imperial' | 'metric'): WeatherResponse | null => {
  try {
    const cachedDataString = localStorage.getItem(`weather_data_${units}`);
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

const cacheWeatherData = (data: WeatherResponse, units: 'imperial' | 'metric') => {
  try {
    localStorage.setItem(`weather_data_${units}`, JSON.stringify(data));
  } catch (err) {
    console.error('Error caching weather data:', err);
  }
};

export type { WeatherData, ForecastDay, WeatherResponse };
