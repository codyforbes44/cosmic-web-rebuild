
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Satellite, Zap, Cloud } from 'lucide-react';

interface WeatherMapsProps {
  location: string;
}

const WeatherMaps = ({ location }: WeatherMapsProps) => {
  const [activeMap, setActiveMap] = useState('radar');

  const mapTypes = [
    { id: 'radar', label: 'Radar', icon: Cloud },
    { id: 'satellite', label: 'Satellite', icon: Satellite },
    { id: 'temperature', label: 'Temperature', icon: Map },
    { id: 'precipitation', label: 'Precipitation', icon: Zap },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Weather Maps</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeMap} onValueChange={setActiveMap}>
            <TabsList className="grid w-full grid-cols-4 bg-space-deep-blue/50 border border-white/10">
              {mapTypes.map((type) => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="data-[state=active]:bg-brand-gold data-[state=active]:text-black"
                >
                  <type.icon className="w-4 h-4 mr-2" />
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {mapTypes.map((type) => (
              <TabsContent key={type.id} value={type.id} className="mt-6">
                <div className="relative bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-lg border border-gray-700 h-96 flex items-center justify-center">
                  <div className="text-center text-gray-300">
                    <type.icon className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">{type.label} Map</h3>
                    <p className="text-sm">Interactive {type.label.toLowerCase()} map for {location}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Live weather map integration would be displayed here
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Map Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent border-white/20 text-white hover:bg-white/10">
              <Map className="w-4 h-4 mr-2" />
              View Full Screen
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent border-white/20 text-white hover:bg-white/10">
              <Zap className="w-4 h-4 mr-2" />
              Animation Controls
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Map Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-300">Light Rain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-300">Moderate Rain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-300">Heavy Rain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-gray-300">Severe Weather</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherMaps;
