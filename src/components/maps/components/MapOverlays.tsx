
import React from 'react';

interface MapOverlaysProps {
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  currentLocation: { lat: number; lng: number } | null;
}

const MapOverlays = ({ mapType, currentLocation }: MapOverlaysProps) => {
  return (
    <>
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
    </>
  );
};

export default MapOverlays;
