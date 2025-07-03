
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface AudioLevelIndicatorProps {
  audioLevel: number;
  isListening: boolean;
}

export const AudioLevelIndicator: React.FC<AudioLevelIndicatorProps> = ({
  audioLevel,
  isListening
}) => {
  if (!isListening) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Audio Level</span>
        <span className="text-xs text-gray-300">{Math.round(audioLevel)}</span>
      </div>
      <Progress value={Math.min(audioLevel * 2, 100)} className="h-2" />
    </div>
  );
};
