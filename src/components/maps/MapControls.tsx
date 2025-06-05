
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Layers, Compass, ZoomIn, ZoomOut, RotateCcw, 
  Satellite, Map, Mountain, Navigation, Plus, Minus,
  Settings, Eye, EyeOff, Globe
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
    { id: 'roadmap', icon: Map, label: 'Street' },
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
      // The map will handle centering through the MapInterface component
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

      {/* Quick Actions */}
      <Card className="bg-black/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-2">
          <div className="flex flex-col gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCenterOnLocation}
              disabled={!userLocation}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              title="Center on location"
            >
              <Navigation className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              title="Compass"
            >
              <Compass className="w-4 h-4" />
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
                <TabsTrigger value="layers">Map Style</TabsTrigger>
                <TabsTrigger value="info">Map Info</TabsTrigger>
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

              <TabsContent value="info" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm">Map Information</h4>
                  
                  <div className="text-sm text-gray-300 space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <span>OpenStreetMap Data</span>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      <p>• Interactive pan and zoom</p>
                      <p>• Real-time location tracking</p>
                      <p>• Multiple map styles</p>
                      <p>• Free and open source</p>
                    </div>

                    {userLocation && (
                      <div className="mt-3 p-2 bg-blue-500/20 rounded">
                        <p className="text-xs text-blue-200">Current Location:</p>
                        <p className="text-xs font-mono text-blue-100">
                          {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                        </p>
                      </div>
                    )}
                  </div>
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
