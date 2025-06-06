
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WeatherMapContainerProps {
  activeMap: string;
  location: string;
  isMobile: boolean;
}

const WeatherMapContainer = ({ activeMap, location, isMobile }: WeatherMapContainerProps) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(4);

  // Custom location icon
  const locationIcon = new L.DivIcon({
    html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>`,
    className: 'custom-div-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  // Get weather overlay URL based on active map type
  const getWeatherOverlayUrl = () => {
    const baseUrl = 'https://tile.openweathermap.org/map';
    switch (activeMap) {
      case 'radar':
        return `${baseUrl}/precipitation_new/{z}/{x}/{y}.png?appid=demo`;
      case 'temperature':
        return `${baseUrl}/temp_new/{z}/{x}/{y}.png?appid=demo`;
      case 'wind':
        return `${baseUrl}/wind_new/{z}/{x}/{y}.png?appid=demo`;
      default:
        return `${baseUrl}/precipitation_new/{z}/{x}/{y}.png?appid=demo`;
    }
  };

  // Get layer description for display
  const getLayerDescription = () => {
    switch (activeMap) {
      case 'radar':
        return 'Precipitation & Storm Activity';
      case 'temperature':
        return 'Surface Temperature';
      case 'wind':
        return 'Wind Speed & Direction';
      default:
        return 'Weather Data';
    }
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
    <div className={`relative rounded-lg border border-gray-700 ${isMobile ? 'h-64' : 'h-96'} overflow-hidden`}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        zoomControl={!isMobile}
      >
        {/* Base map layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Weather overlay layer */}
        <TileLayer
          url={getWeatherOverlayUrl()}
          opacity={0.6}
          attribution='Weather data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
        />
        
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
      
      {/* Layer type indicator */}
      <div className={`absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg ${isMobile ? 'text-xs' : 'text-sm'}`}>
        <div className="flex items-center gap-2">
          {activeMap === 'radar' && <Radar className="w-4 h-4" />}
          {activeMap === 'temperature' && <Thermometer className="w-4 h-4" />}
          {activeMap === 'wind' && <Wind className="w-4 h-4" />}
          <span>{getLayerDescription()}</span>
        </div>
      </div>

      {/* Layer opacity control */}
      <div className={`absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg ${isMobile ? 'text-xs' : 'text-sm'}`}>
        <span>Weather Layer Active</span>
      </div>
    </div>
  );
};

export default WeatherMapContainer;
