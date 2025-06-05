
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  X, Clock, MapPin, Car, Bike, FootprintsIcon as Walking,
  ArrowRight, TurnRight, TurnLeft, Straight, Navigation,
  Info, AlertTriangle, Phone, Share
} from 'lucide-react';

interface DirectionsPanelProps {
  origin: string;
  destination: string;
  onClose: () => void;
}

const DirectionsPanel = ({ origin, destination, onClose }: DirectionsPanelProps) => {
  const [routeType, setRouteType] = useState<'driving' | 'walking' | 'cycling'>('driving');

  const routeOptions = [
    { id: 'driving', icon: Car, label: 'Driving', time: '12 min', distance: '8.3 mi' },
    { id: 'walking', icon: Walking, label: 'Walking', time: '1h 45m', distance: '8.3 mi' },
    { id: 'cycling', icon: Bike, label: 'Cycling', time: '35 min', distance: '8.5 mi' }
  ];

  const directions = [
    { icon: Straight, instruction: 'Head north on Main St', distance: '0.3 mi', time: '1 min' },
    { icon: TurnRight, instruction: 'Turn right onto Broadway Ave', distance: '1.2 mi', time: '3 min' },
    { icon: TurnLeft, instruction: 'Turn left onto 5th Street', distance: '0.8 mi', time: '2 min' },
    { icon: Straight, instruction: 'Continue straight for 2 miles', distance: '2.1 mi', time: '4 min' },
    { icon: TurnRight, instruction: 'Turn right onto Destination Blvd', distance: '0.5 mi', time: '1 min' },
    { icon: MapPin, instruction: 'Arrive at destination', distance: '0 mi', time: '0 min' }
  ];

  const traffic = [
    { type: 'info', message: 'Moderate traffic on Broadway Ave', delay: '+2 min' },
    { type: 'warning', message: 'Construction on 5th Street', delay: '+5 min' }
  ];

  return (
    <div className="w-96 h-full bg-space-deep-blue border-l border-white/20 overflow-y-auto">
      <Card className="h-full rounded-none border-0 bg-transparent">
        <CardHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Directions</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Route Summary */}
          <div className="space-y-3 mt-4">
            <div className="text-sm text-gray-300">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-green-500" />
                <span className="truncate">{origin}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="truncate">{destination}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <Tabs value={routeType} onValueChange={(value) => setRouteType(value as any)}>
            {/* Route Type Selector */}
            <TabsList className="grid w-full grid-cols-3 bg-space-deep-blue/50 border border-white/10">
              {routeOptions.map((option) => (
                <TabsTrigger
                  key={option.id}
                  value={option.id}
                  className="data-[state=active]:bg-brand-gold data-[state=active]:text-black"
                >
                  <option.icon className="w-4 h-4" />
                </TabsTrigger>
              ))}
            </TabsList>

            {routeOptions.map((option) => (
              <TabsContent key={option.id} value={option.id} className="mt-4">
                {/* Route Stats */}
                <Card className="bg-space-deep-blue/50 border-white/10 mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <option.icon className="w-6 h-6 text-brand-gold" />
                        <div>
                          <div className="text-white font-semibold">{option.time}</div>
                          <div className="text-gray-400 text-sm">{option.distance}</div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-brand-gold text-black hover:bg-brand-gold/80">
                        <Navigation className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Traffic Alerts */}
                {traffic.length > 0 && (
                  <Card className="bg-yellow-500/10 border-yellow-500/30 mb-4">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        {traffic.map((alert, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-sm text-yellow-200">{alert.message}</div>
                              <div className="text-xs text-yellow-400">{alert.delay}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Turn-by-Turn Directions */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold">Turn-by-turn directions</h3>
                  {directions.map((step, index) => (
                    <Card key={index} className="bg-space-deep-blue/30 border-white/10">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-brand-gold/20 p-2 rounded-full">
                            <step.icon className="w-4 h-4 text-brand-gold" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-sm">{step.instruction}</div>
                            <div className="text-gray-400 text-xs mt-1">
                              {step.distance} • {step.time}
                            </div>
                          </div>
                          <div className="text-gray-500 text-xs">
                            {index + 1}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DirectionsPanel;
