
import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceActivityIndicatorProps {
  sessionActive: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  isListening: boolean;
}

export const VoiceActivityIndicator: React.FC<VoiceActivityIndicatorProps> = ({
  sessionActive,
  isSpeaking,
  isProcessing,
  isListening
}) => {
  if (!sessionActive) return null;

  return (
    <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-gray-600">
      <span className="text-xs text-gray-400">Voice Status</span>
      <div className="flex items-center gap-2">
        {isSpeaking ? (
          <>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-400">ZEPHEL RESPONDING</span>
          </>
        ) : isProcessing ? (
          <>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-yellow-400">PROCESSING INPUT</span>
          </>
        ) : isListening ? (
          <>
            <Mic className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">LISTENING</span>
          </>
        ) : (
          <>
            <MicOff className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">STANDBY</span>
          </>
        )}
      </div>
    </div>
  );
};
