
import React from 'react';
import { getBackgroundForCondition } from './utils/WeatherConditions';
import { getWeatherEffects, getEffectOpacity } from './utils/WeatherEffects';
import WeatherOverlays from './components/WeatherOverlays';
import './styles/animations.css';
import './styles/effects.css';
import './styles/mobile.css';

interface WeatherBackgroundProps {
  condition: string;
  className?: string;
  isDay?: boolean;
  animated?: boolean;
}

const WeatherBackground = ({ condition, className = '', isDay = true, animated = false }: WeatherBackgroundProps) => {
  const backgroundClass = getBackgroundForCondition(condition, isDay);
  const weatherEffect = getWeatherEffects(condition, animated);
  const effectOpacity = weatherEffect ? getEffectOpacity(weatherEffect) : '';

  return (
    <div className={`fixed inset-0 ${backgroundClass} ${className} transition-all duration-1000 overflow-hidden`}>
      {/* Atmospheric overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
      
      <WeatherOverlays 
        condition={condition}
        animated={animated}
        isDay={isDay}
        weatherEffect={weatherEffect}
        effectOpacity={effectOpacity}
      />
    </div>
  );
};

export default WeatherBackground;
