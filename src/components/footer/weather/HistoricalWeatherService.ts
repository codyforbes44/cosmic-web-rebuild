
export interface HistoricalWeather {
  date: string;
  temperature: number;
  condition: string;
  comparison: string;
}

export const generateDemoHistory = (units: 'imperial' | 'metric'): HistoricalWeather[] => ([
  {
    date: '1 year ago',
    temperature: units === 'imperial' ? 68 : 20,
    condition: 'Sunny',
    comparison: '4° warmer than today'
  },
  {
    date: '5 years ago',
    temperature: units === 'imperial' ? 74 : 23,
    condition: 'Partly Cloudy',
    comparison: '2° cooler than today'
  }
]);
