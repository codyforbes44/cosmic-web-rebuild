
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Phone, 
  PhoneOff,
  Activity,
  TestTube,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useZephelVoice } from '@/hooks/useZephelVoice';
import { useToast } from '@/hooks/use-toast';

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
    stopSpeaking,
    testVoice
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
      description: "ZEPHEL voice interface deactivated.",
    });
  };

  const handleTestVoice = () => {
    testVoice();
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

  const getMicrophoneStatus = () => {
    if (!isSupported) return { color: 'border-red-500 text-red-400', text: 'UNSUPPORTED' };
    if (isSpeaking) return { color: 'border-blue-500 text-blue-400', text: 'ZEPHEL SPEAKING' };
    if (isListening) return { color: 'border-green-500 text-green-400', text: 'LISTENING' };
    if (isProcessing) return { color: 'border-yellow-500 text-yellow-400', text: 'PROCESSING' };
    return { color: 'border-gray-500 text-gray-400', text: 'READY' };
  };

  const getMicrophonePermissionStatus = () => {
    switch (microphonePermission) {
      case 'granted':
        return { icon: CheckCircle, color: 'text-green-400', text: 'GRANTED' };
      case 'denied':
        return { icon: AlertTriangle, color: 'text-red-400', text: 'DENIED' };
      case 'prompt':
        return { icon: AlertTriangle, color: 'text-yellow-400', text: 'PENDING' };
      default:
        return { icon: AlertTriangle, color: 'text-gray-400', text: 'UNKNOWN' };
    }
  };

  const micStatus = getMicrophoneStatus();
  const permissionStatus = getMicrophonePermissionStatus();
  const PermissionIcon = permissionStatus.icon;

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          ZEPHEL Voice Interface - Enhanced Mode
          <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
            {getStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* System Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Voice Recognition</span>
            <Badge variant="outline" className={`text-xs ${isSupported ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}`}>
              {isSupported ? 'AVAILABLE' : 'UNAVAILABLE'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Microphone Permission</span>
            <div className="flex items-center gap-1">
              <PermissionIcon className={`w-3 h-3 ${permissionStatus.color}`} />
              <Badge variant="outline" className={`text-xs border-current ${permissionStatus.color}`}>
                {permissionStatus.text}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Microphone Status</span>
            <Badge variant="outline" className={`text-xs ${micStatus.color}`}>
              {micStatus.text}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">ZEPHEL Processor</span>
            <Badge variant="outline" className={`text-xs ${isProcessing ? 'border-yellow-500 text-yellow-400' : 'border-green-500 text-green-400'}`}>
              {isProcessing ? 'PROCESSING' : 'ACTIVE'}
            </Badge>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Audio Level Indicator */}
        {isListening && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Audio Level</span>
              <span className="text-xs text-gray-300">{Math.round(audioLevel)}</span>
            </div>
            <Progress value={Math.min(audioLevel * 2, 100)} className="h-2" />
          </div>
        )}

        {/* Retry Counter */}
        {retryCount > 0 && (
          <div className="flex items-center justify-between p-2 bg-yellow-500/20 rounded border border-yellow-500/50">
            <span className="text-xs text-yellow-400">Auto-retry active</span>
            <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">
              {retryCount}/3
            </Badge>
          </div>
        )}

        {/* Current Transcript */}
        {transcript && (
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
        )}

        {/* Testing Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Voice Testing</span>
          </div>
          
          <Button
            onClick={handleTestVoice}
            variant="outline"
            size="sm"
            className="w-full border-blue-600 text-blue-400 hover:bg-blue-600/10"
            disabled={isSpeaking}
          >
            <TestTube className="w-3 h-3 mr-2" />
            Test ZEPHEL Voice
          </Button>
        </div>

        <Separator className="bg-gray-700" />

        {/* Voice Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Output Volume</span>
            <span className="text-xs text-gray-300">{Math.round(volume[0] * 100)}%</span>
          </div>
          
          <div className="flex items-center gap-3">
            <VolumeX className="w-4 h-4 text-gray-400" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={1}
              min={0}
              step={0.1}
              className="flex-1"
            />
            <Volume2 className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Session Controls */}
        <div className="space-y-2">
          {!sessionActive ? (
            <Button
              onClick={handleStartSession}
              disabled={!isSupported || microphonePermission === 'denied'}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Start Voice Session
            </Button>
          ) : (
            <Button
              onClick={handleEndSession}
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

        {/* Voice Activity Indicator */}
        {sessionActive && (
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
        )}

        {/* Enhanced Information */}
        <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-700">
          <div>• Enhanced error handling with auto-retry</div>
          <div>• Real-time audio level monitoring</div>
          <div>• Microphone permission detection</div>
          <div>• Direct ZEPHEL knowledge base integration</div>
          <div>• Improved speech recognition accuracy</div>
        </div>
      </CardContent>
    </Card>
  );
};
