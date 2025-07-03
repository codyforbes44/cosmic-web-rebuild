
import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MicOff, Volume2, VolumeX, Settings, AlertCircle } from 'lucide-react';
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
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Simple initialization check
    const initializeInterface = async () => {
      try {
        // Basic check for required features
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Microphone access not available in this browser');
        }

        setIsInitialized(true);
        setHasError(false);
        console.log('ZEPHEL voice interface initialized successfully');
        
      } catch (error) {
        console.error('Voice interface initialization failed:', error);
        setHasError(true);
        setErrorMessage(error instanceof Error ? error.message : 'Unknown initialization error');
        
        toast({
          title: "Voice Interface Unavailable",
          description: "ElevenLabs voice service is currently unavailable. Using fallback mode.",
          variant: "destructive",
        });
      }
    };

    initializeInterface();
  }, [toast]);

  const handleTestVoice = useCallback(() => {
    if (!isInitialized) {
      toast({
        title: "Voice Not Ready",
        description: "Voice interface is still initializing.",
        variant: "destructive",
      });
      return;
    }

    // Simple browser TTS fallback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "ZEPHEL voice interface test. System operational in fallback mode."
      );
      utterance.rate = 0.8;
      utterance.pitch = 0.7;
      window.speechSynthesis.speak(utterance);
      
      toast({
        title: "Voice Test",
        description: "Using browser text-to-speech as fallback.",
      });
    } else {
      toast({
        title: "Voice Unavailable",
        description: "No voice synthesis available in this browser.",
        variant: "destructive",
      });
    }
  }, [isInitialized, toast]);

  const getStatusColor = () => {
    if (hasError) return 'border-red-500 text-red-400';
    if (isInitialized) return 'border-yellow-500 text-yellow-400';
    return 'border-gray-500 text-gray-400';
  };

  const getStatusText = () => {
    if (hasError) return 'SERVICE_ERROR';
    if (isInitialized) return 'FALLBACK_MODE';
    return 'INITIALIZING';
  };

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <MicOff className="w-4 h-4 text-red-400" />
          ZEPHEL Voice Interface
          {hasError && (
            <Badge variant="outline" className="text-xs border-red-500 text-red-400">
              ERROR
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Status Display */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
            {getStatusText()}
          </Badge>
          <AlertCircle className="w-4 h-4 text-yellow-400" />
        </div>

        {/* Error Message */}
        {hasError && (
          <div className="bg-red-900/20 border border-red-600 rounded p-3">
            <p className="text-red-200 text-xs font-medium mb-1">
              ElevenLabs Service Unavailable
            </p>
            <p className="text-red-300 text-xs">
              {errorMessage || 'Voice service connection failed. Using fallback mode.'}
            </p>
          </div>
        )}

        {/* Service Status */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">ElevenLabs API</span>
            <span className="text-xs text-red-400">UNAVAILABLE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Browser TTS</span>
            <span className="text-xs text-green-400">AVAILABLE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Voice Interface</span>
            <span className="text-xs text-yellow-400">FALLBACK</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="space-y-2">
          <Button
            onClick={handleTestVoice}
            className="w-full bg-accent hover:bg-accent/80 text-black"
            disabled={!isInitialized}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Test Voice (Browser TTS)
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full border-gray-600 text-xs"
            disabled
          >
            <Settings className="w-3 h-3 mr-2" />
            ElevenLabs Configuration Required
          </Button>
        </div>

        {/* Information */}
        <div className="text-xs text-gray-400 space-y-1">
          <div>• ElevenLabs voice service requires API configuration</div>
          <div>• Browser text-to-speech available as fallback</div>
          <div>• Full voice features require service restoration</div>
        </div>

        {/* Configuration Notice */}
        <div className="bg-blue-900/20 border border-blue-600 rounded p-2">
          <p className="text-blue-200 text-xs">
            To enable full voice capabilities, ensure ElevenLabs API key is configured in the environment settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
