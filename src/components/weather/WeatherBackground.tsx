
import React from 'react';

interface WeatherBackgroundProps {
  condition: string;
  className?: string;
}

const WeatherBackground = ({ condition, className = '' }: WeatherBackgroundProps) => {
  const getBackgroundForCondition = (weatherCondition: string) => {
    const normalizedCondition = weatherCondition.toLowerCase();
    
    if (normalizedCondition.includes('clear') || normalizedCondition.includes('sunny')) {
      return 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600';
    }
    
    if (normalizedCondition.includes('cloud')) {
      return 'bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600';
    }
    
    if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
      return 'bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800';
    }
    
    if (normalizedCondition.includes('snow')) {
      return 'bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400';
    }
    
    if (normalizedCondition.includes('storm') || normalizedCondition.includes('thunder')) {
      return 'bg-gradient-to-b from-gray-800 via-gray-900 to-black';
    }
    
    if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist')) {
      return 'bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500';
    }
    
    // Default background for unknown conditions
    return 'bg-gradient-to-b from-space-dark-blue to-space-deep-blue';
  };

  const backgroundClass = getBackgroundForCondition(condition);

  return (
    <div className={`fixed inset-0 ${backgroundClass} ${className}`}>
      {/* Weather-specific overlay effects */}
      {condition.toLowerCase().includes('rain') && (
        <div className="absolute inset-0 opacity-20">
          <div className="rain-effect"></div>
        </div>
      )}
      
      {condition.toLowerCase().includes('snow') && (
        <div className="absolute inset-0 opacity-30">
          <div className="snow-effect"></div>
        </div>
      )}
      
      {condition.toLowerCase().includes('cloud') && (
        <div className="absolute inset-0 opacity-15">
          <div className="clouds-effect"></div>
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
