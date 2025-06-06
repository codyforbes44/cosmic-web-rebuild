
export interface MoonPhase {
  phase: string;
  illumination: number;
  moonrise: string;
  moonset: string;
}

export const generateDemoMoonPhase = (): MoonPhase => ({
  phase: 'Waxing Crescent',
  illumination: 25,
  moonrise: '2:45 PM',
  moonset: '11:30 PM'
});
