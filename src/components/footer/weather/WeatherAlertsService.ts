
export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  expires: string;
  areas: string[];
}

export const generateDemoAlerts = (): WeatherAlert[] => ([
  {
    id: '1',
    title: 'Heat Advisory',
    description: 'Hot temperatures and high humidity may cause heat illnesses.',
    severity: 'moderate',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString(),
    areas: ['County Area', 'Metropolitan Region']
  }
]);
