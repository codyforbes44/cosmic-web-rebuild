
export interface AirQualityData {
  aqi: number;
  level: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  healthRecommendations: string[];
}

export const generateDemoAirQuality = (): AirQualityData => ({
  aqi: 42,
  level: 'Good',
  pollutants: {
    pm25: 8.5,
    pm10: 15.2,
    o3: 65.1,
    no2: 12.3,
    so2: 2.1,
    co: 0.8
  },
  healthRecommendations: [
    'Air quality is good - ideal for outdoor activities',
    'No health precautions necessary'
  ]
});
