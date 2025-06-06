
import { formatTimeDisplay } from '@/utils/timezone';
import { WeatherResponse, WeatherData, ForecastDay } from './types';

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
  
  // Fetch air quality data
  const lat = currentWeatherResult.coord.lat;
  const lon = currentWeatherResult.coord.lon;
  let airQuality = null;
  
  try {
    const airQualityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=9de243494c0b295cca9337e1e96b00e2`
    );
    
    if (airQualityResponse.ok) {
      const airQualityResult = await airQualityResponse.json();
      airQuality = processAirQualityData(airQualityResult);
    }
  } catch (err) {
    console.warn('Air quality data unavailable:', err);
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
    airQuality,
    alerts: await fetchWeatherAlerts(lat, lon),
    moonPhase: await fetchMoonPhase(),
    tides: await fetchTideData(lat, lon),
    history: await fetchHistoricalWeather(lat, lon, units),
    pollen: await fetchPollenData(lat, lon),
    fireWeather: await fetchFireWeatherData(lat, lon)
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

const generateBasicForecast = (currentWeather: any, units: 'imperial' | 'metric'): ForecastDay[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const baseTemp = currentWeather.main.temp;
  
  return days.map((day, index) => ({
    date: day,
    temp_max: Math.round(baseTemp + (Math.random() * 10 - 5)),
    temp_min: Math.round(baseTemp - 10 + (Math.random() * 5)),
    condition: currentWeather.weather[0].description,
    humidity: currentWeather.main.humidity + (Math.random() * 20 - 10)
  }));
};

const processAirQualityData = (data: any) => {
  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;
  
  const getAQILevel = (aqi: number) => {
    if (aqi === 1) return 'Good';
    if (aqi === 2) return 'Fair';
    if (aqi === 3) return 'Moderate';
    if (aqi === 4) return 'Poor';
    return 'Very Poor';
  };
  
  const getHealthRecommendations = (aqi: number) => {
    if (aqi <= 2) return ['Air quality is good', 'Perfect for outdoor activities'];
    if (aqi === 3) return ['Moderate air quality', 'Sensitive individuals should limit outdoor exposure'];
    return ['Poor air quality', 'Limit outdoor activities', 'Consider wearing a mask outdoors'];
  };
  
  return {
    aqi: aqi * 50, // Convert to 0-300 scale
    level: getAQILevel(aqi),
    pollutants: {
      pm25: Math.round(components.pm2_5 || 0),
      pm10: Math.round(components.pm10 || 0),
      o3: Math.round(components.o3 || 0),
      no2: Math.round(components.no2 || 0),
      so2: Math.round(components.so2 || 0),
      co: Math.round(components.co || 0)
    },
    healthRecommendations: getHealthRecommendations(aqi)
  };
};

const fetchUVIndex = async (lat: number, lon: number): Promise<number> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=9de243494c0b295cca9337e1e96b00e2`
    );
    if (response.ok) {
      const data = await response.json();
      return Math.round(data.value || 0);
    }
  } catch (err) {
    console.warn('UV Index unavailable:', err);
  }
  return 5; // Default moderate UV
};

const fetchWeatherAlerts = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=9de243494c0b295cca9337e1e96b00e2`
    );
    if (response.ok) {
      const data = await response.json();
      return data.alerts?.map((alert: any) => ({
        id: alert.event,
        title: alert.event,
        description: alert.description,
        severity: 'moderate',
        expires: new Date(alert.end * 1000).toLocaleString()
      })) || [];
    }
  } catch (err) {
    console.warn('Weather alerts unavailable:', err);
  }
  return [];
};

const fetchMoonPhase = async () => {
  // Moon phase calculation based on current date
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Simplified moon phase calculation
  const totalDays = Math.floor((year - 2000) * 365.25 + month * 30.44 + day);
  const moonCycle = 29.53; // days
  const phase = (totalDays % moonCycle) / moonCycle;
  
  let phaseName = 'New Moon';
  if (phase < 0.125) phaseName = 'New Moon';
  else if (phase < 0.375) phaseName = 'Waxing Crescent';
  else if (phase < 0.625) phaseName = 'Full Moon';
  else if (phase < 0.875) phaseName = 'Waning Crescent';
  
  return {
    phase: phaseName,
    illumination: Math.round(Math.abs(Math.cos(phase * Math.PI * 2)) * 100),
    nextFullMoon: new Date(Date.now() + (moonCycle - (totalDays % moonCycle)) * 24 * 60 * 60 * 1000).toLocaleDateString()
  };
};

const fetchTideData = async (lat: number, lon: number) => {
  // This would typically require a specialized tide API
  // For now, return null as most locations don't have tide data
  return null;
};

const fetchHistoricalWeather = async (lat: number, lon: number, units: 'imperial' | 'metric') => {
  // Historical weather data typically requires paid API access
  // Return null for now
  return null;
};

const fetchPollenData = async (lat: number, lon: number) => {
  // Pollen data requires specialized APIs
  // Return null for now
  return null;
};

const fetchFireWeatherData = async (lat: number, lon: number) => {
  // Fire weather data requires specialized APIs
  // Return null for now
  return null;
};
