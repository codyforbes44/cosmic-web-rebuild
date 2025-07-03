
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlsProps {
  volume: number[];
  onVolumeChange: (value: number[]) => void;
}

export const VolumeControls: React.FC<VolumeControlsProps> = ({
  volume,
  onVolumeChange
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Output Volume</span>
        <span className="text-xs text-gray-300">{Math.round(volume[0] * 100)}%</span>
      </div>
      
      <div className="flex items-center gap-3">
        <VolumeX className="w-4 h-4 text-gray-400" />
        <Slider
          value={volume}
          onValueChange={onVolumeChange}
          max={1}
          min={0}
          step={0.1}
          className="flex-1"
        />
        <Volume2 className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};
