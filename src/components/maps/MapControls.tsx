
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Layers, Compass, ZoomIn, ZoomOut, RotateCcw, 
  Satellite, Map, Mountain, Navigation, Plus, Minus,
  Settings, Eye, EyeOff
} from 'lucide-react';

interface MapControlsProps {
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  onMapTypeChange: (type: 'roadmap' | 'satellite' | 'hybrid' | 'terrain') => void;
  userLocation: { lat: number; lng: number } | null;
}

const MapControls = ({ mapType, onMapTypeChange, userLocation }: MapControlsProps) => {
  const [showControls, setShowControls] = useState(false);
  const [overlays, setOverlays] = useState({
    traffic: true,
    transit: false,
    bike: false,
    terrain: false
  });

  const mapTypes = [
    { id: 'roadmap', icon: Map, label: 'Map' },
    { id: 'satellite', icon: Satellite, label: 'Satellite' },
    { id: 'hybrid', icon: Layers, label: 'Hybrid' },
    { id: 'terrain', icon: Mountain, label: 'Terrain' }
  ];

  const toggleOverlay = (overlay: keyof typeof overlays) => {
    setOverlays(prev => ({
      ...prev,
      [overlay]: !prev[overlay]
    }));
  };

  const handleCenterOnLocation = () => {
    if (userLocation) {
      console.log('Centering on user location:', userLocation);
      // In a real implementation, this would center the map on user location
    }
  };

  return (
    <div className="space-y-2">
      {/* Toggle Controls Button */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => setShowControls(!showControls)}
        className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {/* Zoom Controls */}
      <Card className="bg-black/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-2">
          <div className="flex flex-col gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      <Card className="bg-black/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-2">
          <div className="flex flex-col gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCenterOnLocation}
              disabled={!userLocation}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Navigation className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Compass className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Extended Controls Panel */}
      {showControls && (
        <Card className="bg-black/80 backdrop-blur-sm border-white/20 w-64">
          <CardContent className="p-4">
            <Tabs defaultValue="layers">
              <TabsList className="grid w-full grid-cols-2 bg-space-deep-blue/50">
                <TabsTrigger value="layers">Layers</TabsTrigger>
                <TabsTrigger value="overlays">Overlays</TabsTrigger>
              </TabsList>

              <TabsContent value="layers" className="mt-4">
                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm mb-3">Map Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {mapTypes.map((type) => (
                      <Button
                        key={type.id}
                        size="sm"
                        variant={mapType === type.id ? "default" : "outline"}
                        onClick={() => onMapTypeChange(type.id as any)}
                        className={`flex flex-col gap-1 h-auto py-2 ${
                          mapType === type.id 
                            ? "bg-brand-gold text-black" 
                            : "bg-transparent border-white/20 text-white hover:bg-white/10"
                        }`}
                      >
                        <type.icon className="w-4 h-4" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="overlays" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm">Map Overlays</h4>
                  
                  {Object.entries(overlays).map(([key, enabled]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm capitalize">{key}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleOverlay(key as keyof typeof overlays)}
                        className="text-white hover:bg-white/20 h-6 w-6 p-0"
                      >
                        {enabled ? (
                          <Eye className="w-3 h-3 text-green-400" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapControls;
