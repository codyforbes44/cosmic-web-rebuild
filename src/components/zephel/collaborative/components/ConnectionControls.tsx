import React from 'react';
import { Button } from "@/components/ui/button";
import { SessionMode } from '../types';

interface ConnectionControlsProps {
  sessionMode: SessionMode;
  onModeChange: (mode: SessionMode) => void;
  isConnected: boolean;
}

export const ConnectionControls: React.FC<ConnectionControlsProps> = ({
  sessionMode,
  onModeChange,
  isConnected
}) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onModeChange('collaborative')}
        variant={sessionMode === 'collaborative' ? 'default' : 'outline'}
        className="flex-1 text-xs"
        disabled={isConnected}
      >
        Collective Mode
      </Button>
      <Button
        onClick={() => onModeChange('private')}
        variant={sessionMode === 'private' ? 'default' : 'outline'}
        className="flex-1 text-xs"
      >
        Solo Mode
      </Button>
    </div>
  );
};