
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Star, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LocationSearchProps {
  onLocationChange: (location: string) => void;
  currentLocation: string;
}

const LocationSearch = ({ onLocationChange, currentLocation }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('weather_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('weather_recent');
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onLocationChange(searchQuery.trim());
      
      // Add to recent searches
      const updated = [searchQuery.trim(), ...recentSearches.filter(s => s !== searchQuery.trim())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('weather_recent', JSON.stringify(updated));
      
      setSearchQuery('');
      toast({
        title: "Location updated",
        description: `Showing weather for ${searchQuery.trim()}`,
      });
    }
  };

  const addToFavorites = () => {
    if (!favorites.includes(currentLocation)) {
      const updated = [...favorites, currentLocation];
      setFavorites(updated);
      localStorage.setItem('weather_favorites', JSON.stringify(updated));
      toast({
        title: "Added to favorites",
        description: `${currentLocation} has been saved to your favorites.`,
      });
    }
  };

  const removeFromFavorites = (location: string) => {
    const updated = favorites.filter(fav => fav !== location);
    setFavorites(updated);
    localStorage.setItem('weather_favorites', JSON.stringify(updated));
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city name..."
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} size="icon" variant="outline">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-white text-sm">{currentLocation}</span>
          <Button
            onClick={addToFavorites}
            size="sm"
            variant="ghost"
            className="text-yellow-400 hover:text-yellow-300"
            disabled={favorites.includes(currentLocation)}
          >
            <Star className={`w-4 h-4 ${favorites.includes(currentLocation) ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {favorites.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Favorites</span>
            </div>
            <div className="space-y-1">
              {favorites.map((location, index) => (
                <div key={index} className="flex items-center justify-between bg-white/10 p-2 rounded">
                  <button
                    onClick={() => onLocationChange(location)}
                    className="text-white text-sm hover:text-brand-gold"
                  >
                    {location}
                  </button>
                  <button
                    onClick={() => removeFromFavorites(location)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Recent</span>
            </div>
            <div className="space-y-1">
              {recentSearches.map((location, index) => (
                <button
                  key={index}
                  onClick={() => onLocationChange(location)}
                  className="block w-full text-left text-white text-sm hover:text-brand-gold bg-white/10 p-2 rounded"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSearch;
