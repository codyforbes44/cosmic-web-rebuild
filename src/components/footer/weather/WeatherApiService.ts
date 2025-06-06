
import { formatTimeDisplay } from '@/utils/timezone';
import { WeatherResponse, WeatherData, ForecastDay } from './types';
import { generateDemoAirQuality } from './AirQualityService';
import { generateDemoAlerts } from './WeatherAlertsService';
import { generateDemoMoonPhase } from './MoonPhaseService';
import { generateDemoTides } from './TidesService';
import { generateDemoHistory } from './HistoricalWeatherService';
import { generateDemoPollen, generateDemoFireWeather } from './EnvironmentalDataService';
import { generateDemoForecast } from './DemoDataService';

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
    // Generate demo forecast if API fails
    forecast = generateDemoForecast(units);
  }
  
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
    uvIndex: 5,
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
      // Use the description from the API for accuracy
      const condition = forecasts[0].weather[0].description;
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        temp_max: Math.round(Math.max(...temps)),
        temp_min: Math.round(Math.min(...temps)),
        condition: condition,
        humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length)
      };
    });
};
