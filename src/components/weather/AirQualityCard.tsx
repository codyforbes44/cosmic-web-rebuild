
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityData } from '@/components/footer/weather/types';
import { Wind, AlertTriangle, CheckCircle } from 'lucide-react';

interface AirQualityCardProps {
  airQuality: AirQualityData | null;
}

const AirQualityCard = ({ airQuality }: AirQualityCardProps) => {
  if (!airQuality) {
    return (
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Air Quality Index
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4 text-gray-400">
            <p className="text-sm">Air quality data unavailable</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-400';
    if (aqi <= 100) return 'text-yellow-400';
    if (aqi <= 150) return 'text-orange-400';
    if (aqi <= 200) return 'text-red-400';
    if (aqi <= 300) return 'text-purple-400';
    return 'text-red-600';
  };

  const getAQIIcon = (level: string) => {
    if (level === 'Good') return <CheckCircle className="w-5 h-5 text-green-400" />;
    return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wind className="w-5 h-5" />
          Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getAQIIcon(airQuality.level)}
            <div>
              <div className={`text-2xl font-bold ${getAQIColor(airQuality.aqi)}`}>
                {airQuality.aqi}
              </div>
              <div className="text-sm text-gray-400">{airQuality.level}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 p-2 rounded">
            <div className="text-gray-400">PM2.5</div>
            <div className="text-white font-medium">{airQuality.pollutants.pm25} μg/m³</div>
          </div>
          <div className="bg-white/10 p-2 rounded">
            <div className="text-gray-400">PM10</div>
            <div className="text-white font-medium">{airQuality.pollutants.pm10} μg/m³</div>
          </div>
          <div className="bg-white/10 p-2 rounded">
            <div className="text-gray-400">O₃</div>
            <div className="text-white font-medium">{airQuality.pollutants.o3} μg/m³</div>
          </div>
          <div className="bg-white/10 p-2 rounded">
            <div className="text-gray-400">NO₂</div>
            <div className="text-white font-medium">{airQuality.pollutants.no2} μg/m³</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-white">Health Recommendations:</div>
          {airQuality.healthRecommendations.map((rec, index) => (
            <div key={index} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="text-brand-gold">•</span>
              {rec}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
