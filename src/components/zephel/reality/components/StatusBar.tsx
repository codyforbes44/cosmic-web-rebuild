import React from 'react';

interface RenderingMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface StatusBarProps {
  activeMode: string;
  renderQuality: number[];
  fieldIntensity: number[];
  isAnimating: boolean;
  renderingModes: RenderingMode[];
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeMode,
  renderQuality,
  fieldIntensity,
  isAnimating,
  renderingModes
}) => {
  return (
    <div className="absolute bottom-2 left-2 right-2 z-10 bg-black/70 p-2 rounded border border-gray-700">
      <div className="flex justify-between items-center text-xs text-gray-300">
        <div className="flex gap-4">
          <span>Mode: {renderingModes.find(m => m.id === activeMode)?.name}</span>
          <span>Quality: {renderQuality[0]}%</span>
          <span>Field Intensity: {fieldIntensity[0]}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
          <span>Reality Engine: {isAnimating ? 'ACTIVE' : 'PAUSED'}</span>
        </div>
      </div>
    </div>
  );
};