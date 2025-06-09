
import { ForecastDay } from '../types';

export const processForecastData = (forecastList: any[]): ForecastDay[] => {
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

export const generateBasicForecast = (currentWeather: any, units: 'imperial' | 'metric'): ForecastDay[] => {
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
