
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Navigation } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import AddToFavorites from './AddToFavorites';

interface LocationSearchProps {
  onLocationChange: (location: string) => void;
  currentLocation: string;
}

const LocationSearch = ({ onLocationChange, currentLocation }: LocationSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useIsMobile();

  const handleSearch = () => {
    if (searchValue.trim()) {
      onLocationChange(searchValue);
      setSearchValue('');
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardContent className={isMobile ? 'p-3' : 'p-4'}>
        <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <Input
              placeholder="Search for a city or location..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`${isMobile ? 'pl-9 text-sm h-10' : 'pl-12 h-12'} bg-space-deep-blue/50 border-gray-600 text-white placeholder-gray-400 focus:border-brand-gold touch-manipulation`}
            />
          </div>
          
          <Button
            onClick={handleSearch}
            disabled={!searchValue.trim()}
            className={`${isMobile ? 'px-3 h-10' : 'px-4 h-12'} bg-brand-gold text-black hover:bg-brand-gold/90 disabled:opacity-50 touch-manipulation`}
          >
            <Search className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            {!isMobile && <span className="ml-2">Search</span>}
          </Button>
          
          <Button
            onClick={handleUseCurrentLocation}
            variant="outline"
            className={`${isMobile ? 'px-3 h-10' : 'px-4 h-12'} bg-transparent border-white/20 text-white hover:bg-white/10 touch-manipulation`}
          >
            <Navigation className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            {!isMobile && <span className="ml-2">Use Location</span>}
          </Button>
        </div>
        
        <div className={`flex items-center justify-between ${isMobile ? 'gap-1 mt-2' : 'gap-2 mt-3'}`}>
          <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'} text-gray-400`}>
            <MapPin className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} truncate`}>Current: {currentLocation}</span>
          </div>
          
          <AddToFavorites location={currentLocation} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSearch;
