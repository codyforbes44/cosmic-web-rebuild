
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { useZephelVoice } from '@/hooks/useZephelVoice';

interface VoiceControlsProps {
  onVoiceToggle?: (enabled: boolean) => void;
  voiceEnabled?: boolean;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  onVoiceToggle,
  voiceEnabled = false
}) => {
  const { isSpeaking, isSupported, stopSpeaking } = useZephelVoice();

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    onVoiceToggle?.(!voiceEnabled);
  };

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          Voice Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        
        {/* Voice Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Text-to-Speech</span>
          <Badge variant="outline" className={`text-xs ${
            isSupported 
              ? 'border-green-500 text-green-400' 
              : 'border-red-500 text-red-400'
          }`}>
            {isSupported ? 'AVAILABLE' : 'UNAVAILABLE'}
          </Badge>
        </div>

        {/* Voice Controls */}
        {isSupported && (
          <>
            <Button
              onClick={handleToggleVoice}
              variant={voiceEnabled ? "default" : "outline"}
              size="sm"
              className={`w-full ${
                voiceEnabled 
                  ? 'bg-accent hover:bg-accent/80 text-black' 
                  : 'border-accent/50 text-accent hover:bg-accent/20'
              }`}
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 mr-2" />
                  Voice Enabled
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 mr-2" />
                  Voice Disabled
                </>
              )}
            </Button>

            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                variant="outline"
                size="sm"
                className="w-full border-red-500 text-red-400 hover:bg-red-500/20"
              >
                <VolumeX className="w-3 h-3 mr-2" />
                Stop Speaking
              </Button>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Status</span>
              <Badge variant="outline" className={`text-xs ${
                isSpeaking 
                  ? 'border-yellow-500 text-yellow-400' 
                  : 'border-gray-500 text-gray-400'
              }`}>
                {isSpeaking ? 'SPEAKING' : 'IDLE'}
              </Badge>
            </div>
          </>
        )}

        {/* Voice Recognition Placeholder */}
        <div className="border-t border-gray-700 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Voice Input</span>
            <Badge variant="outline" className="text-xs border-green-500 text-green-400">
              ZEPHEL ACTIVE
            </Badge>
          </div>
          <Button
            disabled
            variant="outline"
            size="sm"
            className="w-full mt-2 opacity-50"
          >
            <Mic className="w-3 h-3 mr-2" />
            Voice Commands
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
