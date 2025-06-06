
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  X, Star, Phone, Clock, MapPin, Navigation,
  UtensilsCrossed, Fuel, Building2, CreditCard
} from 'lucide-react';
import { generateNearbyPOIs, getCategoryIcon, getCategoryColor } from './services/POIService';

interface POIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: { lat: number; lng: number } | null;
}

const POIPanel = ({ isOpen, onClose, userLocation }: POIPanelProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const pois = userLocation ? generateNearbyPOIs(userLocation) : [];

  if (!isOpen || !userLocation) return null;

  const categories = [
    { id: 'all', label: 'All', icon: MapPin },
    { id: 'restaurant', label: 'Food', icon: UtensilsCrossed },
    { id: 'gas_station', label: 'Gas', icon: Fuel },
    { id: 'hospital', label: 'Health', icon: Building2 },
    { id: 'atm', label: 'ATM', icon: CreditCard }
  ];

  const filteredPOIs = selectedCategory === 'all' 
    ? pois 
    : pois.filter(poi => poi.category === selectedCategory);

  const getPriceLevel = (level?: number) => {
    if (!level) return '';
    return '$'.repeat(level);
  };

  return (
    <div className="absolute top-4 right-4 z-20 w-80">
      <Card className="bg-space-deep-blue/95 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm">Nearby Places</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                size="sm"
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`h-7 text-xs ${
                  selectedCategory === category.id
                    ? "bg-brand-gold text-black hover:bg-brand-gold/90"
                    : "bg-transparent border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <category.icon className="w-3 h-3 mr-1" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* POI List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredPOIs.map((poi) => (
              <Card key={poi.id} className="bg-space-deep-blue/30 border-white/10 hover:bg-white/5 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{getCategoryIcon(poi.category)}</span>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{poi.name}</h4>
                        <p className="text-xs text-gray-400">{poi.address}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                      {poi.distance}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-300">{poi.rating}</span>
                    </div>
                    {poi.priceLevel && (
                      <span className="text-xs text-gray-400">{getPriceLevel(poi.priceLevel)}</span>
                    )}
                    <div className={`w-2 h-2 rounded-full ${poi.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-xs text-gray-400">{poi.hours}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {poi.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs bg-transparent border-white/20 text-white hover:bg-white/10"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 text-xs bg-transparent border-white/20 text-white hover:bg-white/10"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPOIs.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No places found in this category</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default POIPanel;
