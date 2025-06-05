
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Crosshair } from 'lucide-react';

interface MapInterfaceProps {
  origin: string;
  destination: string;
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  showDirections: boolean;
  onLocationUpdate: (location: { lat: number; lng: number }) => void;
}

const MapInterface = ({ 
  origin, 
  destination, 
  mapType, 
  showDirections,
  onLocationUpdate 
}: MapInterfaceProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          onLocationUpdate(location);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Default to a central location if geolocation fails
          const defaultLocation = { lat: 39.8283, lng: -98.5795 }; // Geographic center of US
          setCurrentLocation(defaultLocation);
          onLocationUpdate(defaultLocation);
        }
      );
    }
  }, [onLocationUpdate]);

  return (
    <div className="h-full w-full relative">
      {/* Interactive Map Placeholder */}
      <div 
        ref={mapRef} 
        className="h-full w-full bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-lg border border-gray-700 relative overflow-hidden"
      >
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border border-gray-600/30"></div>
            ))}
          </div>
        </div>

        {/* Current Location Indicator */}
        {currentLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              <div className="absolute -top-2 -left-2 w-10 h-10 bg-blue-500/20 rounded-full animate-ping"></div>
            </div>
          </div>
        )}

        {/* Origin Marker */}
        {origin && (
          <div className="absolute top-1/4 left-1/4 z-10">
            <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Start</span>
            </div>
          </div>
        )}

        {/* Destination Marker */}
        {destination && (
          <div className="absolute top-3/4 right-1/4 z-10">
            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">End</span>
            </div>
          </div>
        )}

        {/* Route Line */}
        {showDirections && origin && destination && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
            <defs>
              <pattern id="routePattern" patternUnits="userSpaceOnUse" width="20" height="10">
                <rect width="20" height="10" fill="none"/>
                <rect width="10" height="10" fill="#3B82F6"/>
              </pattern>
            </defs>
            <path
              d="M 25% 25% Q 50% 10% 75% 75%"
              stroke="#3B82F6"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* Map Type Indicator */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="text-sm capitalize">{mapType} View</span>
        </div>

        {/* Coordinates Display */}
        {currentLocation && (
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
            <span className="text-sm">
              {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </span>
          </div>
        )}

        {/* Interactive Map Notice */}
        <div className="absolute top-4 left-4 bg-brand-gold/90 text-black px-4 py-2 rounded-lg">
          <p className="text-sm font-medium">Interactive Map Interface</p>
          <p className="text-xs opacity-75">Real map integration would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default MapInterface;
