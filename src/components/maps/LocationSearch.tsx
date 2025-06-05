
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Navigation, ArrowLeftRight, Clock, Star } from 'lucide-react';

interface LocationSearchProps {
  origin: string;
  destination: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onGetDirections: () => void;
  userLocation: { lat: number; lng: number } | null;
}

const LocationSearch = ({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onGetDirections,
  userLocation
}: LocationSearchProps) => {
  const [showSuggestions, setShowSuggestions] = useState<'origin' | 'destination' | null>(null);

  const recentSearches = [
    'Downtown Oklahoma City, OK',
    'Will Rogers World Airport, Oklahoma City, OK',
    'University of Oklahoma, Norman, OK',
    'Bricktown Entertainment District, Oklahoma City, OK'
  ];

  const popularDestinations = [
    { name: 'Oklahoma City Zoo', address: '2000 Remington Pl, Oklahoma City, OK' },
    { name: 'National Cowboy Museum', address: '1700 NE 63rd St, Oklahoma City, OK' },
    { name: 'Chesapeake Energy Arena', address: '100 W Reno Ave, Oklahoma City, OK' },
    { name: 'Myriad Botanical Gardens', address: '301 W Reno Ave, Oklahoma City, OK' }
  ];

  const handleSwapLocations = () => {
    const temp = origin;
    onOriginChange(destination);
    onDestinationChange(temp);
  };

  const handleUseCurrentLocation = (field: 'origin' | 'destination') => {
    if (userLocation) {
      const locationString = `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`;
      if (field === 'origin') {
        onOriginChange(locationString);
      } else {
        onDestinationChange(locationString);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Inputs */}
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-3">
          {/* Origin Input */}
          <div className="relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-500" />
              <Input
                placeholder="Choose starting point..."
                value={origin}
                onChange={(e) => onOriginChange(e.target.value)}
                onFocus={() => setShowSuggestions('origin')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
                className="pl-12 pr-12 bg-space-deep-blue/50 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleUseCurrentLocation('origin')}
                className="absolute right-2 top-2 h-6 w-6 p-0 text-blue-400 hover:text-blue-300"
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
            
            {showSuggestions === 'origin' && (
              <Card className="absolute top-full mt-1 w-full z-20 bg-space-deep-blue border-white/20 p-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Clock className="w-3 h-3" />
                    Recent
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => onOriginChange(search)}
                      className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-white/10 rounded"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Destination Input */}
          <div className="relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-red-500" />
              <Input
                placeholder="Choose destination..."
                value={destination}
                onChange={(e) => onDestinationChange(e.target.value)}
                onFocus={() => setShowSuggestions('destination')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
                className="pl-12 pr-12 bg-space-deep-blue/50 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleUseCurrentLocation('destination')}
                className="absolute right-2 top-2 h-6 w-6 p-0 text-blue-400 hover:text-blue-300"
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </div>

            {showSuggestions === 'destination' && (
              <Card className="absolute top-full mt-1 w-full z-20 bg-space-deep-blue border-white/20 p-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Star className="w-3 h-3" />
                    Popular Destinations
                  </div>
                  {popularDestinations.map((place, index) => (
                    <button
                      key={index}
                      onClick={() => onDestinationChange(place.address)}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-white/10 rounded"
                    >
                      <div className="text-gray-300 font-medium">{place.name}</div>
                      <div className="text-gray-500 text-xs">{place.address}</div>
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Swap Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleSwapLocations}
          className="self-center bg-transparent border-white/20 text-white hover:bg-white/10"
          disabled={!origin && !destination}
        >
          <ArrowLeftRight className="w-4 h-4" />
        </Button>

        {/* Get Directions Button */}
        <Button
          onClick={onGetDirections}
          disabled={!origin || !destination}
          className="bg-brand-gold text-black hover:bg-brand-gold/80 font-medium px-6"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Directions
        </Button>
      </div>
    </div>
  );
};

export default LocationSearch;
