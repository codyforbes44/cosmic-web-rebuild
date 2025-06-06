
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';

interface MapControlsProps {
  isMobile: boolean;
}

const MapControls = ({ isMobile }: MapControlsProps) => {
  const handleCenterOnLocation = () => {
    // This functionality would need to be passed down from parent if needed
    console.log('Center on location clicked');
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className={`text-white ${isMobile ? 'text-base' : 'text-lg'}`}>Map Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          variant="outline" 
          className={`w-full justify-start bg-transparent border-white/20 text-white hover:bg-white/10 ${isMobile ? 'text-sm' : ''}`}
          onClick={handleCenterOnLocation}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Center on Location
        </Button>
        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
          <p>• {isMobile ? 'Pinch to zoom' : 'Pan and zoom to explore'}</p>
          <p>• Switch between weather layers</p>
          <p>• Real-time weather overlays</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapControls;
