
import React from 'react';
import { MapContainer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapUpdater from './components/MapUpdater';
import MapTileLayers from './components/MapTileLayers';
import MapMarkers from './components/MapMarkers';
import MapRoute from './components/MapRoute';
import MapOverlays from './components/MapOverlays';
import { useMapLocations } from './hooks/useMapLocations';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapInterfaceProps {
  origin: string;
  destination: string;
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  showDirections: boolean;
  onLocationUpdate: (location: { lat: number; lng: number }) => void;
}

const MapInterface = ({ 
  origin, 
  destination, 
  mapType, 
  showDirections,
  onLocationUpdate 
}: MapInterfaceProps) => {
  const {
    currentLocation,
    originCoords,
    destinationCoords,
    routeCoords,
    mapCenter,
    mapZoom
  } = useMapLocations({
    origin,
    destination,
    showDirections,
    onLocationUpdate
  });

  return (
    <div className="h-full w-full relative p-4">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full rounded-lg"
        zoomControl={false}
      >
        <MapUpdater center={mapCenter} zoom={mapZoom} />
        
        <MapTileLayers mapType={mapType} />
        
        <MapMarkers
          currentLocation={currentLocation}
          originCoords={originCoords}
          destinationCoords={destinationCoords}
          origin={origin}
          destination={destination}
        />
        
        <MapRoute routeCoords={routeCoords} />
      </MapContainer>

      <MapOverlays mapType={mapType} currentLocation={currentLocation} />
    </div>
  );
};

export default MapInterface;
