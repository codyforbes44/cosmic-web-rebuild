
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Trash2 } from 'lucide-react';
import { useFavoriteLocations } from '@/hooks/useFavoriteLocations';
import { useIsMobile } from "@/hooks/use-mobile";

interface FavoriteLocationsProps {
  onLocationSelect: (location: string) => void;
  currentLocation?: string;
}

const FavoriteLocations = ({ onLocationSelect, currentLocation }: FavoriteLocationsProps) => {
  const { favorites, loading, removeFavorite } = useFavoriteLocations();
  const isMobile = useIsMobile();

  if (loading) {
    return (
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardContent className={isMobile ? 'p-3' : 'p-4'}>
          <div className="flex items-center justify-center p-4">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            <span className="ml-2 text-sm text-white">Loading favorites...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (favorites.length === 0) {
    return (
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardContent className={`${isMobile ? 'p-3' : 'p-4'} text-center`}>
          <Star className="h-5 w-5 text-gray-400 mx-auto mb-2" />
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
            No favorite locations saved yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader className={isMobile ? 'px-3 py-2' : 'px-4 py-3'}>
        <CardTitle className={`text-white flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
          <Star className="w-4 h-4 text-brand-gold" />
          Favorite Locations
        </CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? 'px-3 pb-3 pt-0' : 'px-4 pb-4 pt-0'}>
        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className={`flex items-center justify-between rounded-md p-2 ${
                currentLocation === favorite.location_name
                  ? 'bg-white/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <div 
                className="flex items-center gap-2 flex-1 cursor-pointer truncate"
                onClick={() => onLocationSelect(favorite.location_name)}
              >
                <MapPin className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-brand-gold`} />
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white truncate`}>
                  {favorite.location_name}
                </span>
                {favorite.country && (
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>
                    ({favorite.country})
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                onClick={() => removeFavorite(favorite.id)}
              >
                <Trash2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteLocations;
