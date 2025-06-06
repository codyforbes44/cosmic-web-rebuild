
export interface TideData {
  high: { time: string; height: number }[];
  low: { time: string; height: number }[];
}

export const generateDemoTides = (): TideData => ({
  high: [
    { time: '6:24 AM', height: 4.2 },
    { time: '6:48 PM', height: 4.8 }
  ],
  low: [
    { time: '12:15 PM', height: 0.8 },
    { time: '12:42 AM', height: 0.3 }
  ]
});
