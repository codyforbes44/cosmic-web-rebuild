
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { generateHazards } from '../services/TrafficService';

const MapHazards = () => {
  const hazards = generateHazards();

  const createHazardIcon = (type: string, severity: string) => {
    const color = severity === 'high' ? '#ef4444' : severity === 'medium' ? '#f59e0b' : '#3b82f6';
    const emoji = type === 'construction' ? '🚧' : type === 'accident' ? '⚠️' : '☁️';
    
    return new L.DivIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-lg" style="background-color: ${color}">
               <span style="font-size: 16px;">${emoji}</span>
             </div>`,
      className: 'custom-hazard-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
  };

  return (
    <>
      {hazards.map((hazard) => (
        <Marker
          key={hazard.id}
          position={hazard.location}
          icon={createHazardIcon(hazard.type, hazard.severity)}
        >
          <Popup>
            <div className="text-black">
              <h4 className="font-semibold">{hazard.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{hazard.description}</p>
              <div className="text-xs text-gray-500">
                <div>Reported: {hazard.timeReported}</div>
                {hazard.estimatedClearance && (
                  <div>Expected clear: {hazard.estimatedClearance}</div>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapHazards;
