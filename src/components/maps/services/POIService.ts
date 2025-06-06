
export interface PointOfInterest {
  id: string;
  name: string;
  category: 'restaurant' | 'gas_station' | 'hospital' | 'atm' | 'hotel' | 'shopping';
  rating: number;
  distance: string;
  isOpen: boolean;
  hours: string;
  phone?: string;
  address: string;
  coordinates: [number, number];
  priceLevel?: number; // 1-4 scale
}

export const generateNearbyPOIs = (userLocation: { lat: number; lng: number }): PointOfInterest[] => [
  {
    id: 'poi1',
    name: "Joe's Diner",
    category: 'restaurant',
    rating: 4.5,
    distance: '0.3 mi',
    isOpen: true,
    hours: 'Open until 10:00 PM',
    phone: '(555) 123-4567',
    address: '123 Main St',
    coordinates: [userLocation.lat + 0.002, userLocation.lng + 0.001],
    priceLevel: 2
  },
  {
    id: 'poi2',
    name: 'Shell Gas Station',
    category: 'gas_station',
    rating: 4.1,
    distance: '0.5 mi',
    isOpen: true,
    hours: 'Open 24 hours',
    address: '456 Oak Ave',
    coordinates: [userLocation.lat - 0.003, userLocation.lng + 0.004]
  },
  {
    id: 'poi3',
    name: 'City Hospital',
    category: 'hospital',
    rating: 4.3,
    distance: '1.2 mi',
    isOpen: true,
    hours: 'Emergency 24/7',
    phone: '(555) 911-0000',
    address: '789 Health Blvd',
    coordinates: [userLocation.lat + 0.008, userLocation.lng - 0.002]
  },
  {
    id: 'poi4',
    name: 'Chase ATM',
    category: 'atm',
    rating: 3.8,
    distance: '0.7 mi',
    isOpen: true,
    hours: 'Available 24/7',
    address: '321 Bank St',
    coordinates: [userLocation.lat - 0.001, userLocation.lng + 0.006]
  }
];

export const getCategoryIcon = (category: string) => {
  const icons = {
    restaurant: '🍽️',
    gas_station: '⛽',
    hospital: '🏥',
    atm: '🏧',
    hotel: '🏨',
    shopping: '🛍️'
  };
  return icons[category as keyof typeof icons] || '📍';
};

export const getCategoryColor = (category: string) => {
  const colors = {
    restaurant: 'text-orange-500',
    gas_station: 'text-blue-500',
    hospital: 'text-red-500',
    atm: 'text-green-500',
    hotel: 'text-purple-500',
    shopping: 'text-pink-500'
  };
  return colors[category as keyof typeof colors] || 'text-gray-500';
};
