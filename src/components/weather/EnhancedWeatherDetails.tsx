
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Moon, Waves, TreePine, Flame } from 'lucide-react';
import { WeatherResponse } from '@/components/footer/weather/WeatherService';

interface EnhancedWeatherDetailsProps {
  weatherData: WeatherResponse;
  units: 'imperial' | 'metric';
}

const EnhancedWeatherDetails = ({ weatherData, units }: EnhancedWeatherDetailsProps) => {
  const getPressureIcon = (trend: string) => {
    if (trend === 'rising') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'falling') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getPollenLevel = (level: number) => {
    if (level <= 1) return { color: 'text-green-400', text: 'Low' };
    if (level <= 3) return { color: 'text-yellow-400', text: 'Moderate' };
    if (level <= 4) return { color: 'text-orange-400', text: 'High' };
    return { color: 'text-red-400', text: 'Very High' };
  };

  const getFireRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'extreme': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Pressure Trends */}
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-lg">Pressure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {weatherData.current.pressure} {units === 'imperial' ? 'in' : 'hPa'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                {getPressureIcon(weatherData.current.pressureTrend || 'steady')}
                {weatherData.current.pressureTrend || 'Steady'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moon Phase */}
      {weatherData.moonPhase && (
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Moon Phase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-lg font-semibold text-white">{weatherData.moonPhase.phase}</div>
              <div className="text-sm text-gray-300">{weatherData.moonPhase.illumination}% illuminated</div>
              {weatherData.moonPhase.moonrise && weatherData.moonPhase.moonset && (
                <div className="text-xs text-gray-400">
                  Rise: {weatherData.moonPhase.moonrise} | Set: {weatherData.moonPhase.moonset}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tides (if available) */}
      {weatherData.tides && (
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Waves className="w-5 h-5" />
              Tides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-gray-300">High Tide</div>
                {weatherData.tides.high.map((tide, index) => (
                  <div key={index} className="text-white">{tide.time} ({tide.height}ft)</div>
                ))}
              </div>
              <div>
                <div className="text-gray-300">Low Tide</div>
                {weatherData.tides.low.map((tide, index) => (
                  <div key={index} className="text-white">{tide.time} ({tide.height}ft)</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pollen Count */}
      {weatherData.pollen && (
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <TreePine className="w-5 h-5" />
              Pollen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Overall</span>
                <span className={`font-semibold ${getPollenLevel(weatherData.pollen.overall).color}`}>
                  {getPollenLevel(weatherData.pollen.overall).text}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-gray-400">Trees</div>
                  <div className="text-white">{weatherData.pollen.trees}/5</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">Grass</div>
                  <div className="text-white">{weatherData.pollen.grass}/5</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">Weeds</div>
                  <div className="text-white">{weatherData.pollen.weeds}/5</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fire Weather Index */}
      {weatherData.fireWeather && (
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Fire Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Risk Level</span>
                <span className={`font-semibold ${getFireRiskColor(weatherData.fireWeather.risk)}`}>
                  {weatherData.fireWeather.risk}
                </span>
              </div>
              <div className="text-sm text-gray-300">Index: {weatherData.fireWeather.index}</div>
              <div className="space-y-1 text-xs">
                {weatherData.fireWeather.recommendations.map((rec, index) => (
                  <div key={index} className="text-gray-400 flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historical Weather */}
      {weatherData.history && (
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Historical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {weatherData.history.map((hist, index) => (
                <div key={index}>
                  <div className="text-gray-300">{hist.date}</div>
                  <div className="text-white">{hist.temperature}° - {hist.condition}</div>
                  <div className="text-xs text-gray-400">{hist.comparison}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedWeatherDetails;
