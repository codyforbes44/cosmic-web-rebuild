import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Satellite, Zap, Cloud, MapPin } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WeatherMapsProps {
  location: string;
}

const WeatherMaps = ({ location }: WeatherMapsProps) => {
  const [activeMap, setActiveMap] = useState('radar');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(4);
  const isMobile = useIsMobile();

  const mapTypes = [
    { id: 'radar', label: 'Radar', icon: Cloud },
    { id: 'satellite', label: 'Satellite', icon: Satellite },
    { id: 'temperature', label: 'Temp', icon: Map },
    { id: 'precipitation', label: 'Rain', icon: Zap },
  ];

  // Custom location icon
  const locationIcon = new L.DivIcon({
    html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>`,
    className: 'custom-div-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  // Get tile layer URL based on active map type
  const getTileLayerUrl = () => {
    switch (activeMap) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'radar':
        // Using OpenWeatherMap's precipitation layer
        return 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo';
      case 'temperature':
        // Using OpenWeatherMap's temperature layer
        return 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=demo';
      case 'precipitation':
        return 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  // Get base map layer (always show streets as base)
  const getBaseMapUrl = () => {
    if (activeMap === 'satellite') {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  // Geocode location to get coordinates
  const geocodeLocation = async (locationName: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  };

  // Get user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(coords);
          setMapCenter([coords.lat, coords.lng]);
          setMapZoom(10);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Try to geocode the provided location
          if (location && location !== 'Demo City') {
            geocodeLocation(location).then(coords => {
              if (coords) {
                setCurrentLocation(coords);
                setMapCenter([coords.lat, coords.lng]);
                setMapZoom(10);
              }
            });
          }
        }
      );
    } else if (location && location !== 'Demo City') {
      // Fallback to geocoding if geolocation not available
      geocodeLocation(location).then(coords => {
        if (coords) {
          setCurrentLocation(coords);
          setMapCenter([coords.lat, coords.lng]);
          setMapZoom(10);
        }
      });
    }
  }, [location]);

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className={`text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>Interactive Weather Maps</CardTitle>
          <p className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Real-time weather data visualization for {location}</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeMap} onValueChange={setActiveMap}>
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} bg-space-deep-blue/50 border border-white/10`}>
              {mapTypes.map((type) => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className={`data-[state=active]:bg-brand-gold data-[state=active]:text-black ${isMobile ? 'text-xs' : 'text-sm'}`}
                >
                  <type.icon className="w-4 h-4 mr-1 md:mr-2" />
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Mobile: Show only 2 tabs at a time with secondary navigation */}
            {isMobile && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                <Button
                  variant={activeMap === 'temperature' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMap('temperature')}
                  className={activeMap === 'temperature' 
                    ? 'bg-brand-gold text-black' 
                    : 'bg-transparent border-white/20 text-white hover:bg-white/10'
                  }
                >
                  <Map className="w-4 h-4 mr-1" />
                  Temp
                </Button>
                <Button
                  variant={activeMap === 'precipitation' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMap('precipitation')}
                  className={activeMap === 'precipitation' 
                    ? 'bg-brand-gold text-black' 
                    : 'bg-transparent border-white/20 text-white hover:bg-white/10'
                  }
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Rain
                </Button>
              </div>
            )}

            {mapTypes.map((type) => (
              <TabsContent key={type.id} value={type.id} className={`${isMobile ? 'mt-4' : 'mt-6'}`}>
                <div className={`relative rounded-lg border border-gray-700 ${isMobile ? 'h-64' : 'h-96'} overflow-hidden`}>
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    className="h-full w-full"
                    zoomControl={!isMobile}
                  >
                    {/* Base map layer */}
                    <TileLayer
                      url={getBaseMapUrl()}
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {/* Weather overlay layer for non-satellite maps */}
                    {activeMap !== 'satellite' && (
                      <TileLayer
                        url={getTileLayerUrl()}
                        opacity={0.6}
                        attribution='Weather data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                      />
                    )}
                    
                    {/* Location marker */}
                    {currentLocation && (
                      <Marker
                        position={[currentLocation.lat, currentLocation.lng]}
                        icon={locationIcon}
                      >
                        <Popup>
                          <div className="text-black">
                            <strong>{location}</strong><br />
                            {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                          </div>
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
                  
                  {/* Map type indicator */}
                  <div className={`absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <span>{type.label} View</span>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className={`text-white ${isMobile ? 'text-base' : 'text-lg'}`}>Map Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className={`w-full justify-start bg-transparent border-white/20 text-white hover:bg-white/10 ${isMobile ? 'text-sm' : ''}`}
              onClick={() => {
                if (currentLocation) {
                  setMapCenter([currentLocation.lat, currentLocation.lng]);
                  setMapZoom(10);
                }
              }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Center on Location
            </Button>
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
              <p>• {isMobile ? 'Pinch to zoom' : 'Pan and zoom to explore'}</p>
              <p>• Switch between weather layers</p>
              <p>• Real-time weather overlays</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className={`text-white ${isMobile ? 'text-base' : 'text-lg'}`}>Map Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`space-y-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {activeMap === 'radar' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-300">Light Precipitation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded"></div>
                    <span className="text-gray-300">Moderate Precipitation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded"></div>
                    <span className="text-gray-300">Heavy Precipitation</span>
                  </div>
                </>
              )}
              {activeMap === 'temperature' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-600 rounded"></div>
                    <span className="text-gray-300">Cold</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-300">Moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded"></div>
                    <span className="text-gray-300">Hot</span>
                  </div>
                </>
              )}
              {(activeMap === 'precipitation' || activeMap === 'satellite') && (
                <div className="text-gray-300">
                  Interactive weather visualization for {location}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherMaps;
