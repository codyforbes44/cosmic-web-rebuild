import React from 'react';
import { FullScreenControls } from '@/components/zephel/reality/features/FullScreenControls';

interface RealityPageHeaderProps {
  onFullScreenToggle?: (isFullScreen: boolean) => void;
}

export const RealityPageHeader: React.FC<RealityPageHeaderProps> = ({
  onFullScreenToggle
}) => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">
          Advanced Reality Rendering Engine
        </h1>
        <FullScreenControls 
          onFullScreenToggle={onFullScreenToggle || ((isFullScreen) => console.log('Full screen:', isFullScreen))} 
        />
      </div>
      <p className="text-gray-300 text-lg max-w-3xl mx-auto">
        Interactive 3D visualization system with quantum field dynamics, neural network patterns, 
        and real-time data flow rendering. Experience the full power of ZEPHEL's reality synthesis capabilities.
      </p>
    </div>
  );
};