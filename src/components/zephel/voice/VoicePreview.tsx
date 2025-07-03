
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Square } from 'lucide-react';

interface VoicePreviewProps {
  onPreviewVoice: () => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export const VoicePreview: React.FC<VoicePreviewProps> = ({
  onPreviewVoice,
  isSpeaking,
  onStopSpeaking
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Voice Preview</span>
      </div>
      
      <div className="flex gap-2">
        {!isSpeaking ? (
          <Button
            onClick={onPreviewVoice}
            variant="outline"
            size="sm"
            className="flex-1 border-accent/50 text-accent hover:bg-accent/20"
          >
            <Play className="w-3 h-3 mr-2" />
            Preview ZEPHEL Voice
          </Button>
        ) : (
          <Button
            onClick={onStopSpeaking}
            variant="outline"
            size="sm"
            className="flex-1 border-red-500 text-red-400 hover:bg-red-500/20"
          >
            <Square className="w-3 h-3 mr-2" />
            Stop Preview
          </Button>
        )}
      </div>
    </div>
  );
};
