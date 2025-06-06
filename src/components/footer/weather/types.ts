
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

export interface AirQualityData {
  aqi: number;
  level: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2?: number;
    co?: number;
  };
  healthRecommendations: string[];
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  expires: string;
}

export interface MoonPhase {
  phase: string;
  illumination: number;
  nextFullMoon: string;
  moonrise?: string;
  moonset?: string;
}

export interface TideData {
  high: { time: string; height: number }[];
  low: { time: string; height: number }[];
}

export interface HistoricalWeather {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  temperature: number;
  comparison: string;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastDay[];
  airQuality?: AirQualityData | null;
  alerts?: WeatherAlert[] | null;
  moonPhase?: MoonPhase | null;
  tides?: TideData | null;
  history?: HistoricalWeather[] | null;
  pollen?: {
    overall: number;
    grass: number;
    weeds: number;
    trees: number;
  } | null;
  fireWeather?: {
    index: number;
    risk: string;
    recommendations: string[];
  } | null;
}
