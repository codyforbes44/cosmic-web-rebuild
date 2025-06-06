
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkersProps {
  currentLocation: { lat: number; lng: number } | null;
  originCoords: [number, number] | null;
  destinationCoords: [number, number] | null;
  origin: string;
  destination: string;
}

const MapMarkers = ({ 
  currentLocation, 
  originCoords, 
  destinationCoords, 
  origin, 
  destination 
}: MapMarkersProps) => {
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

  return (
    <>
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
    </>
  );
};

export default MapMarkers;
