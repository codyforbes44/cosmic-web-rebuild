
import React from 'react';
import { Button } from "@/components/ui/button";
import { TestTube } from 'lucide-react';

interface VoiceTestControlsProps {
  onTestVoice: () => void;
  isSpeaking: boolean;
}

export const VoiceTestControls: React.FC<VoiceTestControlsProps> = ({
  onTestVoice,
  isSpeaking
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Voice Testing</span>
      </div>
      
      <Button
        onClick={onTestVoice}
        variant="outline"
        size="sm"
        className="w-full border-blue-600 text-blue-400 hover:bg-blue-600/10"
        disabled={isSpeaking}
      >
        <TestTube className="w-3 h-3 mr-2" />
        Test ZEPHEL Voice
      </Button>
    </div>
  );
};
