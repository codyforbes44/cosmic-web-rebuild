
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { useFavoriteLocations } from '@/hooks/useFavoriteLocations';
import FavoriteLocations from './FavoriteLocations';
import { useWeatherPage } from './WeatherPageProvider';

const FavoriteLocationsPanel = () => {
  const isMobile = useIsMobile();
  const { handleLocationChange } = useWeatherPage();
  const { favorites, loading, refetch } = useFavoriteLocations();

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className={`text-white flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
          <Star className="w-5 h-5 text-brand-gold" />
          Favorite Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
          Your saved locations for quick access. Click on a location to view its weather.
        </p>
        
        <FavoriteLocations onLocationSelect={handleLocationChange} />
      </CardContent>
    </Card>
  );
};

export default FavoriteLocationsPanel;
