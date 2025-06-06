
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, AlertTriangle, Route, Car, Construction, 
  CloudRain, ThermometerSun, Wind, X, Zap
} from 'lucide-react';
import { generateDemoTrafficData, generateAlternativeRoutes, generateHazards } from './services/TrafficService';

interface TrafficPanelProps {
  isOpen: boolean;
  onClose: () => void;
  origin: string;
  destination: string;
}

const TrafficPanel = ({ isOpen, onClose, origin, destination }: TrafficPanelProps) => {
  const [selectedRoute, setSelectedRoute] = useState('fastest');
  
  const trafficData = generateDemoTrafficData();
  const routes = generateAlternativeRoutes();
  const hazards = generateHazards();

  if (!isOpen) return null;

  const getTrafficColor = (type: string) => {
    switch (type) {
      case 'heavy': return 'bg-red-500';
      case 'moderate': return 'bg-yellow-500';
      case 'light': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'construction': return Construction;
      case 'accident': return AlertTriangle;
      case 'weather': return CloudRain;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="absolute top-4 left-4 z-20 w-80">
      <Card className="bg-space-deep-blue/95 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm">Traffic & Routes</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs defaultValue="routes">
            <TabsList className="grid w-full grid-cols-3 bg-space-deep-blue/50">
              <TabsTrigger value="routes" className="text-xs data-[state=active]:bg-brand-gold data-[state=active]:text-black">Routes</TabsTrigger>
              <TabsTrigger value="traffic" className="text-xs data-[state=active]:bg-brand-gold data-[state=active]:text-black">Traffic</TabsTrigger>
              <TabsTrigger value="hazards" className="text-xs data-[state=active]:bg-brand-gold data-[state=active]:text-black">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="routes" className="mt-3">
              <div className="space-y-3">
                {routes.map((route) => (
                  <Card 
                    key={route.id} 
                    className={`cursor-pointer transition-all ${
                      selectedRoute === route.id 
                        ? 'bg-brand-gold/20 border-brand-gold' 
                        : 'bg-space-deep-blue/30 border-white/10 hover:bg-white/5'
                    }`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">{route.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${getTrafficColor(route.traffic)}`} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {route.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Route className="w-3 h-3" />
                          {route.distance}
                        </div>
                        {route.tollCost && (
                          <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">
                            {route.tollCost}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{route.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="mt-3">
              <div className="space-y-3">
                {trafficData.map((condition) => (
                  <Card key={condition.id} className="bg-space-deep-blue/30 border-white/10">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${getTrafficColor(condition.type)}`} />
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-medium">{condition.description}</h4>
                          <p className="text-xs text-gray-400 mt-1">{condition.location}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs border-red-500 text-red-400">
                              {condition.delay}
                            </Badge>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 h-3 mr-0.5 ${
                                    i < condition.severity ? 'bg-red-500' : 'bg-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hazards" className="mt-3">
              <div className="space-y-3">
                {hazards.map((hazard) => {
                  const IconComponent = getHazardIcon(hazard.type);
                  return (
                    <Card key={hazard.id} className="bg-space-deep-blue/30 border-white/10">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <IconComponent className={`w-4 h-4 mt-0.5 ${
                            hazard.severity === 'high' ? 'text-red-500' :
                            hazard.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium">{hazard.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">{hazard.description}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                              <span>Reported {hazard.timeReported}</span>
                              {hazard.estimatedClearance && (
                                <span>• Clear by {hazard.estimatedClearance}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Weather Conditions */}
          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-3">
              <h4 className="text-white text-sm font-medium mb-2">Route Weather</h4>
              <div className="flex items-center gap-4 text-xs text-blue-200">
                <div className="flex items-center gap-1">
                  <ThermometerSun className="w-3 h-3" />
                  <span>72°F</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-3 h-3" />
                  <span>12 mph</span>
                </div>
                <div className="flex items-center gap-1">
                  <CloudRain className="w-3 h-3" />
                  <span>Clear</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficPanel;
