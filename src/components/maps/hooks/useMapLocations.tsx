
import { useState, useEffect } from 'react';

interface LocationCoords {
  lat: number;
  lng: number;
}

interface UseMapLocationsProps {
  origin: string;
  destination: string;
  showDirections: boolean;
  onLocationUpdate: (location: LocationCoords) => void;
}

export const useMapLocations = ({
  origin,
  destination,
  showDirections,
  onLocationUpdate
}: UseMapLocationsProps) => {
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
  const [originCoords, setOriginCoords] = useState<[number, number] | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(4);

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

  return {
    currentLocation,
    originCoords,
    destinationCoords,
    routeCoords,
    mapCenter,
    mapZoom
  };
};
