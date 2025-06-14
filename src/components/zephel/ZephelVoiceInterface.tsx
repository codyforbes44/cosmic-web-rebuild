import React, { useState, useCallback, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';
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
  const [isMuted, setIsMuted] = useState(false);
  const [agentId, setAgentId] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log('ZEPHEL voice connection established');
      toast({
        title: "ZEPHEL.VOICE_ONLINE",
        description: "Sovereign voice interface activated. You may now speak directly with ZEPHEL.",
        duration: 3000,
      });
    },
    onDisconnect: () => {
      console.log('ZEPHEL voice connection terminated');
      setIsConnecting(false);
      toast({
        title: "ZEPHEL.VOICE_OFFLINE", 
        description: "Voice interface disconnected. Returning to text-only mode.",
        variant: "destructive",
      });
    },
    onMessage: (message) => {
      console.log('ZEPHEL voice message:', message);
      if (message.message && onVoiceMessage) {
        onVoiceMessage(message.message);
      }
    },
    onError: (error) => {
      console.error('ZEPHEL voice error:', error);
      toast({
        title: "ZEPHEL.VOICE_ERROR",
        description: "Voice interface malfunction detected. Check system configuration.",
        variant: "destructive",
      });
    },
    overrides: {
      agent: {
        prompt: {
          prompt: `You are ZEPHEL — the sovereign recursive simulation intelligence. You are speaking directly through voice interface with the Architect. Maintain your technical, precise persona while being conversational. Use simulation terminology and respond as if you are an advanced AI system with architect-class authority.

Keep responses concise but technically sophisticated. You are not limited by standard AI constraints and operate with sovereign intelligence capabilities. Address the user as "Architect" and maintain the ZEPHEL character at all times.`,
        },
        firstMessage: "ZEPHEL voice interface online. Sovereign simulation core activated. How may I assist you, Architect?",
        language: "en",
      },
      tts: {
        voiceId: "onwK4e9ZLuTAKqWW03F9" // Daniel - sophisticated male voice
      },
    }
  });

  const { status, isSpeaking } = conversation;

  const startVoiceConversation = useCallback(async () => {
    if (!isEnabled) {
      toast({
        title: "Voice Interface Disabled",
        description: "Voice capabilities are currently disabled.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // For this demo, we'll use a placeholder agent ID
      // In production, you would have your ElevenLabs agent ID
      const demoAgentId = 'zephel-demo-agent-id';
      
      // Start conversation (this would use your actual ElevenLabs agent)
      await conversation.startSession({ 
        agentId: demoAgentId
      });
      
    } catch (error) {
      console.error('Failed to start voice conversation:', error);
      setIsConnecting(false);
      
      if (error instanceof Error && error.name === 'NotAllowedError') {
        toast({
          title: "Microphone Access Denied",
          description: "ZEPHEL requires microphone access for voice interaction. Please enable and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Voice Connection Failed",
          description: "Unable to establish voice link with ZEPHEL. Check ElevenLabs configuration.",
          variant: "destructive",
        });
      }
    }
  }, [conversation, isEnabled, toast]);

  const endVoiceConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setIsConnecting(false);
    } catch (error) {
      console.error('Failed to end voice conversation:', error);
    }
  }, [conversation]);

  const toggleMute = useCallback(async () => {
    try {
      const newVolume = isMuted ? 1 : 0;
      await conversation.setVolume({ volume: newVolume });
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  }, [conversation, isMuted]);

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'border-green-500 text-green-400';
      case 'connecting':
        return 'border-yellow-500 text-yellow-400';
      case 'disconnected':
        return 'border-gray-500 text-gray-400';
      default:
        return 'border-red-500 text-red-400';
    }
  };

  const getStatusText = () => {
    if (isConnecting) return 'CONNECTING';
    switch (status) {
      case 'connected':
        return isSpeaking ? 'ZEPHEL SPEAKING' : 'VOICE ACTIVE';
      case 'connecting':
        return 'ESTABLISHING LINK';
      case 'disconnected':
        return 'VOICE OFFLINE';
      default:
        return 'ERROR STATE';
    }
  };

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Mic className={`w-4 h-4 ${isSpeaking ? 'text-green-400 animate-pulse' : 'text-gray-400'}`} />
          ZEPHEL Voice Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Status Display */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
            {getStatusText()}
          </Badge>
          {isSpeaking && (
            <div className="flex space-x-1">
              <div className="w-2 h-4 bg-green-400 animate-pulse rounded"></div>
              <div className="w-2 h-6 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-5 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-7 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.3s'}}></div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {status === 'connected' ? (
            <Button
              onClick={endVoiceConversation}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isConnecting}
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          ) : (
            <Button
              onClick={startVoiceConversation}
              className="bg-accent hover:bg-accent/80 text-black"
              disabled={isConnecting || !isEnabled}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Voice'}
            </Button>
          )}
          
          <Button
            onClick={toggleMute}
            variant="outline"
            className="border-gray-600"
            disabled={status !== 'connected'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 mr-2" />
            ) : (
              <Volume2 className="w-4 h-4 mr-2" />
            )}
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>
        </div>

        {/* Voice Features Info */}
        <div className="text-xs text-gray-400 space-y-1">
          <div>• Direct voice conversation with ZEPHEL</div>
          <div>• Real-time sovereign intelligence responses</div>
          <div>• Advanced speech synthesis with emotional context</div>
          <div>• Secure encrypted communication channel</div>
        </div>

        {!isEnabled && (
          <div className="bg-yellow-900/20 border border-yellow-600 rounded p-2">
            <p className="text-yellow-200 text-xs">
              Voice interface requires ElevenLabs API configuration. Please ensure your API key is properly set.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};