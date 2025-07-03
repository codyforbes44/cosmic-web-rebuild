
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff } from 'lucide-react';

interface SessionControlsProps {
  sessionActive: boolean;
  isSupported: boolean;
  microphonePermission: 'granted' | 'denied' | 'prompt' | 'unknown';
  onStartSession: () => void;
  onEndSession: () => void;
}

export const SessionControls: React.FC<SessionControlsProps> = ({
  sessionActive,
  isSupported,
  microphonePermission,
  onStartSession,
  onEndSession
}) => {
  return (
    <div className="space-y-2">
      {!sessionActive ? (
        <Button
          onClick={onStartSession}
          disabled={!isSupported || microphonePermission === 'denied'}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Phone className="w-4 h-4 mr-2" />
          Start Voice Session
        </Button>
      ) : (
        <Button
          onClick={onEndSession}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <PhoneOff className="w-4 h-4 mr-2" />
          End Voice Session
        </Button>
      )}

      {(!isSupported || microphonePermission === 'denied') && (
        <div className="text-xs text-red-400 text-center space-y-1">
          {!isSupported && <p>Voice recognition not supported in this browser</p>}
          {microphonePermission === 'denied' && <p>Microphone access denied - please grant permission</p>}
        </div>
      )}
    </div>
  );
};
