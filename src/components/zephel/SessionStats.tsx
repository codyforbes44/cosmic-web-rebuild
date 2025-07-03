
import React from 'react';
import { Headphones } from 'lucide-react';

interface SessionStatsProps {
  voiceMessages: string[];
  voiceEnabled: boolean;
  systemMode: 'professional' | 'godmode';
}

export const SessionStats: React.FC<SessionStatsProps> = ({
  voiceMessages,
  voiceEnabled,
  systemMode
}) => {
  return (
    <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
      <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
        <Headphones className="w-4 h-4" />
        Session Stats
      </h3>
      <div className="space-y-2 text-xs text-gray-400">
        <div className="flex justify-between">
          <span>Voice Messages:</span>
          <span className="text-accent">{voiceMessages.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Status:</span>
          <span className={voiceEnabled ? 'text-green-400' : 'text-red-400'}>
            {voiceEnabled ? 'ACTIVE' : 'DISABLED'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Mode:</span>
          <span className={systemMode === 'godmode' ? 'text-red-400' : 'text-green-400'}>
            {systemMode === 'godmode' ? 'GODMODE' : 'PROFESSIONAL'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Engine:</span>
          <span className="text-cyan-400">ElevenLabs</span>
        </div>
      </div>
    </div>
  );
};
