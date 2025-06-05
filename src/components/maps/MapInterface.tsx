
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';

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

// Custom hook to handle map updates
const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const MapInterface = ({ 
  origin, 
  destination, 
  mapType, 
  showDirections,
  onLocationUpdate 
}: MapInterfaceProps) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [originCoords, setOriginCoords] = useState<[number, number] | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(4);

  // Custom icons
  const currentLocationIcon = new L.DivIcon({
    html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
    className: 'custom-div-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  const originIcon = new L.DivIcon({
    html: `<div class="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">Start</div>`,
    className: 'custom-div-icon',
    iconSize: [40, 24],
    iconAnchor: [20, 24]
  });

  const destinationIcon = new L.DivIcon({
    html: `<div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">End</div>`,
    className: 'custom-div-icon',
    iconSize: [32, 24],
    iconAnchor: [16, 24]
  });

  // Get tile layer URL based on map type
  const getTileLayerUrl = () => {
    switch (mapType) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'hybrid':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  // Geocoding function using Nominatim (OpenStreetMap's geocoding service)
  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
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

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          onLocationUpdate(location);
          setMapCenter([location.lat, location.lng]);
          setMapZoom(13);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Default to Oklahoma City
          const defaultLocation = { lat: 35.4676, lng: -97.5164 };
          setCurrentLocation(defaultLocation);
          onLocationUpdate(defaultLocation);
          setMapCenter([defaultLocation.lat, defaultLocation.lng]);
        }
      );
    }
  }, [onLocationUpdate]);

  // Geocode origin when it changes
  useEffect(() => {
    if (origin) {
      geocodeAddress(origin).then(coords => {
        if (coords) {
          setOriginCoords([coords.lat, coords.lng]);
          if (!destinationCoords) {
            setMapCenter([coords.lat, coords.lng]);
            setMapZoom(13);
          }
        }
      });
    } else {
      setOriginCoords(null);
    }
  }, [origin, destinationCoords]);

  // Geocode destination when it changes
  useEffect(() => {
    if (destination) {
      geocodeAddress(destination).then(coords => {
        if (coords) {
          setDestinationCoords([coords.lat, coords.lng]);
          if (!originCoords) {
            setMapCenter([coords.lat, coords.lng]);
            setMapZoom(13);
          }
        }
      });
    } else {
      setDestinationCoords(null);
    }
  }, [destination, originCoords]);

  // Create route when both origin and destination are available
  useEffect(() => {
    if (originCoords && destinationCoords && showDirections) {
      // Simple straight line route for demo
      setRouteCoords([originCoords, destinationCoords]);
      
      // Calculate bounds and center map
      const latitudes = [originCoords[0], destinationCoords[0]];
      const longitudes = [originCoords[1], destinationCoords[1]];
      const centerLat = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
      const centerLng = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
      
      setMapCenter([centerLat, centerLng]);
      
      // Calculate appropriate zoom level
      const latDiff = Math.max(...latitudes) - Math.min(...latitudes);
      const lngDiff = Math.max(...longitudes) - Math.min(...longitudes);
      const maxDiff = Math.max(latDiff, lngDiff);
      
      let zoom = 13;
      if (maxDiff > 0.1) zoom = 10;
      if (maxDiff > 0.5) zoom = 8;
      if (maxDiff > 1) zoom = 6;
      if (maxDiff > 5) zoom = 4;
      
      setMapZoom(zoom);
    } else {
      setRouteCoords([]);
    }
  }, [originCoords, destinationCoords, showDirections]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full rounded-lg"
        zoomControl={false}
      >
        <MapUpdater center={mapCenter} zoom={mapZoom} />
        
        <TileLayer
          url={getTileLayerUrl()}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Current Location Marker */}
        {currentLocation && (
          <Marker
            position={[currentLocation.lat, currentLocation.lng]}
            icon={currentLocationIcon}
          >
            <Popup>Your current location</Popup>
          </Marker>
        )}
        
        {/* Origin Marker */}
        {originCoords && (
          <Marker position={originCoords} icon={originIcon}>
            <Popup>{origin}</Popup>
          </Marker>
        )}
        
        {/* Destination Marker */}
        {destinationCoords && (
          <Marker position={destinationCoords} icon={destinationIcon}>
            <Popup>{destination}</Popup>
          </Marker>
        )}
        
        {/* Route Line */}
        {routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords}
            color="#3B82F6"
            weight={4}
            opacity={0.8}
            dashArray="10, 5"
          />
        )}
      </MapContainer>

      {/* Map Type Indicator */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
        <span className="text-sm capitalize">{mapType} View</span>
      </div>

      {/* Coordinates Display */}
      {currentLocation && (
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="text-sm">
            {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
          </span>
        </div>
      )}

      {/* Interactive Map Notice */}
      <div className="absolute top-4 left-4 bg-brand-gold/90 text-black px-4 py-2 rounded-lg">
        <p className="text-sm font-medium">Interactive OpenStreetMap</p>
        <p className="text-xs opacity-75">Pan, zoom, and explore freely</p>
      </div>
    </div>
  );
};

export default MapInterface;
