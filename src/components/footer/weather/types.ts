
export interface WeatherData {
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

export interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  condition: string;
  humidity: number;
}

export interface WeatherResponse {
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

import { AirQualityData } from './AirQualityService';
import { WeatherAlert } from './WeatherAlertsService';
import { MoonPhase } from './MoonPhaseService';
import { TideData } from './TidesService';
import { HistoricalWeather } from './HistoricalWeatherService';
