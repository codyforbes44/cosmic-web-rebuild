
import React from 'react';
import { TileLayer } from 'react-leaflet';

interface MapTileLayersProps {
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
}

const MapTileLayers = ({ mapType }: MapTileLayersProps) => {
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

  return (
    <TileLayer
      url={getTileLayerUrl()}
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
  );
};

export default MapTileLayers;
