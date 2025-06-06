
export interface TrafficCondition {
  id: string;
  type: 'heavy' | 'moderate' | 'light' | 'clear';
  severity: number; // 1-5 scale
  description: string;
  location: string;
  delay: string;
}

export interface RouteOption {
  id: string;
  name: string;
  duration: string;
  distance: string;
  traffic: 'heavy' | 'moderate' | 'light';
  tollCost?: string;
  description: string;
  coordinates: [number, number][];
}

export interface Hazard {
  id: string;
  type: 'accident' | 'construction' | 'closure' | 'weather';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  location: [number, number];
  timeReported: string;
  estimatedClearance?: string;
}

export const generateDemoTrafficData = (): TrafficCondition[] => [
  {
    id: '1',
    type: 'heavy',
    severity: 4,
    description: 'Heavy congestion on I-35',
    location: 'I-35 North near Exit 126',
    delay: '+15 min'
  },
  {
    id: '2',
    type: 'moderate',
    severity: 2,
    description: 'Moderate traffic on Highway 77',
    location: 'Highway 77 Southbound',
    delay: '+5 min'
  }
];

export const generateAlternativeRoutes = (): RouteOption[] => [
  {
    id: 'fastest',
    name: 'Fastest Route',
    duration: '12 min',
    distance: '8.3 mi',
    traffic: 'light',
    description: 'Via Main St and Broadway Ave'
  },
  {
    id: 'shortest',
    name: 'Shortest Route',
    duration: '15 min',
    distance: '7.1 mi',
    traffic: 'moderate',
    description: 'Via Oak Street',
    coordinates: []
  },
  {
    id: 'scenic',
    name: 'Avoid Traffic',
    duration: '18 min',
    distance: '9.2 mi',
    traffic: 'light',
    tollCost: '$2.50',
    description: 'Via Scenic Highway - toll road',
    coordinates: []
  }
];

export const generateHazards = (): Hazard[] => [
  {
    id: '1',
    type: 'construction',
    severity: 'medium',
    title: 'Lane Closure',
    description: 'Right lane closed for road work',
    location: [35.4676, -97.5164],
    timeReported: '2 hours ago',
    estimatedClearance: '6:00 PM'
  },
  {
    id: '2',
    type: 'accident',
    severity: 'high',
    title: 'Multi-vehicle Accident',
    description: 'Two lanes blocked, emergency vehicles on scene',
    location: [35.4876, -97.5364],
    timeReported: '30 min ago',
    estimatedClearance: '1 hour'
  }
];
