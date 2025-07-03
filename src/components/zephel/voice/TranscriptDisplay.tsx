
import React from 'react';

interface TranscriptDisplayProps {
  transcript: string;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript }) => {
  if (!transcript) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Voice Input</span>
      </div>
      <div className="bg-black/40 rounded p-2 border border-gray-600">
        <p className="text-xs text-blue-400 font-mono">
          {transcript}
        </p>
      </div>
    </div>
  );
};
