
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Thermometer, MapPin, Bell, RefreshCw } from 'lucide-react';

interface WeatherSettingsProps {
  currentUnits: 'imperial' | 'metric';
  onUnitsChange: (units: 'imperial' | 'metric') => void;
  location: string;
}

const WeatherSettings = ({ currentUnits, onUnitsChange, location }: WeatherSettingsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            Temperature Units
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={currentUnits === 'imperial' ? 'default' : 'outline'}
              onClick={() => onUnitsChange('imperial')}
              className={currentUnits === 'imperial' 
                ? 'bg-brand-gold text-black hover:bg-brand-gold/90' 
                : 'bg-transparent border-white/20 text-white hover:bg-white/10'
              }
            >
              Fahrenheit (°F)
            </Button>
            <Button
              variant={currentUnits === 'metric' ? 'default' : 'outline'}
              onClick={() => onUnitsChange('metric')}
              className={currentUnits === 'metric' 
                ? 'bg-brand-gold text-black hover:bg-brand-gold/90' 
                : 'bg-transparent border-white/20 text-white hover:bg-white/10'
              }
            >
              Celsius (°C)
            </Button>
          </div>
          <p className="text-sm text-gray-400">
            Choose your preferred temperature scale for all weather displays.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-location" className="text-gray-300">
              Auto-detect location
            </Label>
            <Switch id="auto-location" defaultChecked />
          </div>
          <div className="text-sm text-gray-400">
            Current location: <span className="text-white">{location}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Update Location
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="weather-alerts" className="text-gray-300">
              Weather alerts
            </Label>
            <Switch id="weather-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="daily-forecast" className="text-gray-300">
              Daily forecast
            </Label>
            <Switch id="daily-forecast" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="severe-weather" className="text-gray-300">
              Severe weather warnings
            </Label>
            <Switch id="severe-weather" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">About Weather Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-300">
          <p>Weather data is provided by OpenWeatherMap API and updated every 30 minutes.</p>
          <p>Location detection uses IP geolocation services for accuracy.</p>
          <p className="text-gray-400">
            Data may show as demo information if geolocation fails.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherSettings;
