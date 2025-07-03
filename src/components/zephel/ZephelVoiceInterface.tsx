
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity } from 'lucide-react';
import { useZephelVoice } from '@/hooks/useZephelVoice';
import { useToast } from '@/hooks/use-toast';
import { VoiceStatusPanel } from './voice/VoiceStatusPanel';
import { AudioLevelIndicator } from './voice/AudioLevelIndicator';
import { RetryCounter } from './voice/RetryCounter';
import { TranscriptDisplay } from './voice/TranscriptDisplay';
import { VolumeControls } from './voice/VolumeControls';
import { SessionControls } from './voice/SessionControls';
import { VoiceActivityIndicator } from './voice/VoiceActivityIndicator';
import { VoiceInterfaceInfo } from './voice/VoiceInterfaceInfo';

interface ZephelVoiceInterfaceProps {
  onVoiceMessage?: (message: string) => void;
  isEnabled?: boolean;
}

export const ZephelVoiceInterface: React.FC<ZephelVoiceInterfaceProps> = ({
  onVoiceMessage,
  isEnabled = true
}) => {
  const { toast } = useToast();
  const [volume, setVolume] = useState([0.8]);
  const [sessionActive, setSessionActive] = useState(false);

  const {
    isListening,
    isSpeaking,
    isSupported,
    transcript,
    isProcessing,
    microphonePermission,
    audioLevel,
    retryCount,
    startListening,
    stopListening,
    stopSpeaking
  } = useZephelVoice();

  useEffect(() => {
    setSessionActive(isListening);
  }, [isListening]);

  const handleStartSession = async () => {
    if (!isSupported) {
      toast({
        title: "Voice Not Supported",
        description: "Speech recognition is not available in this browser",
        variant: "destructive",
      });
      return;
    }
    
    await startListening();
  };

  const handleEndSession = () => {
    stopListening();
    stopSpeaking();
    toast({
      title: "Voice Session Ended",
      description: "ƷBI voice interface deactivated.",
    });
  };

  const getStatusColor = () => {
    if (sessionActive && isListening) return 'border-green-500 text-green-400';
    if (isProcessing) return 'border-yellow-500 text-yellow-400';
    if (!isSupported) return 'border-red-500 text-red-400';
    return 'border-gray-500 text-gray-400';
  };

  const getStatusText = () => {
    if (sessionActive && isListening) return 'LISTENING';
    if (isProcessing) return 'PROCESSING';
    if (!isSupported) return 'UNSUPPORTED';
    return 'READY';
  };

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          ƷBI Voice Interface - Enhanced Mode
          <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
            {getStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <VoiceStatusPanel
          isSupported={isSupported}
          microphonePermission={microphonePermission}
          isListening={isListening}
          isSpeaking={isSpeaking}
          isProcessing={isProcessing}
        />

        <AudioLevelIndicator
          audioLevel={audioLevel}
          isListening={isListening}
        />

        <RetryCounter retryCount={retryCount} />

        <TranscriptDisplay transcript={transcript} />

        <Separator className="bg-gray-700" />

        <VolumeControls
          volume={volume}
          onVolumeChange={setVolume}
        />

        <Separator className="bg-gray-700" />

        <SessionControls
          sessionActive={sessionActive}
          isSupported={isSupported}
          microphonePermission={microphonePermission}
          onStartSession={handleStartSession}
          onEndSession={handleEndSession}
        />

        <VoiceActivityIndicator
          sessionActive={sessionActive}
          isSpeaking={isSpeaking}
          isProcessing={isProcessing}
          isListening={isListening}
        />

        <VoiceInterfaceInfo />
      </CardContent>
    </Card>
  );
};
