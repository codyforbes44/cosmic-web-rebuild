
import React from 'react';
import { Polyline } from 'react-leaflet';

interface MapRouteProps {
  routeCoords: [number, number][];
}

const MapRoute = ({ routeCoords }: MapRouteProps) => {
  if (routeCoords.length === 0) return null;

  return (
    <Polyline
      positions={routeCoords}
      color="#3B82F6"
      weight={4}
      opacity={0.8}
      dashArray="10, 5"
    />
  );
};

export default MapRoute;
