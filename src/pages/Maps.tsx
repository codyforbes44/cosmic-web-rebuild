
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import StarBackground from '@/components/StarBackground';
import MapInterface from '@/components/maps/MapInterface';
import DirectionsPanel from '@/components/maps/DirectionsPanel';
import LocationSearch from '@/components/maps/LocationSearch';
import MapControls from '@/components/maps/MapControls';
import TrafficPanel from '@/components/maps/TrafficPanel';
import POIPanel from '@/components/maps/POIPanel';
import { MapPin, Navigation, Route, Layers, Car, MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Maps = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [showDirections, setShowDirections] = useState(false);
  const [showTrafficPanel, setShowTrafficPanel] = useState(false);
  const [showPOIPanel, setShowPOIPanel] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleGetDirections = () => {
    if (origin && destination) {
      setShowDirections(true);
      setShowTrafficPanel(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Maps & Directions - Advanced Navigation</title>
        <meta name="description" content="Get detailed maps, turn-by-turn directions, and explore locations with our advanced mapping interface." />
      </Helmet>
      
      <div className="min-h-screen bg-space-dark-blue text-white relative">
        <StarBackground />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="bg-space-deep-blue/50 backdrop-blur-sm border-b border-white/10 p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-brand-gold" />
                <h1 className="text-3xl font-bold text-white">Maps & Directions</h1>
              </div>
              
              {/* Search Interface */}
              <LocationSearch
                origin={origin}
                destination={destination}
                onOriginChange={setOrigin}
                onDestinationChange={setDestination}
                onGetDirections={handleGetDirections}
                userLocation={userLocation}
              />

              {/* Quick Action Buttons */}
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowTrafficPanel(!showTrafficPanel)}
                  className={`bg-transparent border-white/20 text-white hover:bg-white/10 ${
                    showTrafficPanel ? 'border-brand-gold text-brand-gold' : ''
                  }`}
                >
                  <Car className="w-4 h-4 mr-2" />
                  Traffic & Routes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowPOIPanel(!showPOIPanel)}
                  className={`bg-transparent border-white/20 text-white hover:bg-white/10 ${
                    showPOIPanel ? 'border-brand-gold text-brand-gold' : ''
                  }`}
                >
                  <MapIcon className="w-4 h-4 mr-2" />
                  Nearby Places
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex h-[calc(100vh-180px)]">
            {/* Map Interface */}
            <div className="flex-1 relative">
              <MapInterface
                origin={origin}
                destination={destination}
                mapType={mapType}
                showDirections={showDirections}
                onLocationUpdate={setUserLocation}
              />
              
              {/* Map Controls Overlay */}
              <div className="absolute bottom-4 right-4 z-10">
                <MapControls
                  mapType={mapType}
                  onMapTypeChange={setMapType}
                  userLocation={userLocation}
                />
              </div>

              {/* Traffic Panel */}
              <TrafficPanel
                isOpen={showTrafficPanel}
                onClose={() => setShowTrafficPanel(false)}
                origin={origin}
                destination={destination}
              />

              {/* POI Panel */}
              <POIPanel
                isOpen={showPOIPanel}
                onClose={() => setShowPOIPanel(false)}
                userLocation={userLocation}
              />
            </div>

            {/* Directions Panel */}
            {showDirections && (
              <DirectionsPanel
                origin={origin}
                destination={destination}
                onClose={() => setShowDirections(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Maps;
