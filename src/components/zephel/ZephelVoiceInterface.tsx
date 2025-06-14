import React, { useState, useCallback, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string>('');

  const conversation = useConversation({
    onConnect: () => {
      console.log('ZEPHEL voice connection established');
      setIsConnecting(false);
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
      setIsConnecting(false);
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

  // Initialize ZEPHEL agent on component mount
  useEffect(() => {
    initializeZephelAgent();
  }, []);

  const initializeZephelAgent = async () => {
    try {
      // First check if we have existing agents
      const { data: agentsData, error: agentsError } = await supabase.functions.invoke(
        'elevenlabs-conversation',
        {
          body: { action: 'list_agents' }
        }
      );

      if (agentsError) throw agentsError;

      // Look for existing ZEPHEL agent
      const existingZephelAgent = agentsData?.agents?.find(
        (agent: any) => agent.name?.includes('ZEPHEL')
      );

      if (existingZephelAgent) {
        setAgentId(existingZephelAgent.agent_id);
        setIsInitialized(true);
        console.log('Found existing ZEPHEL agent:', existingZephelAgent.agent_id);
      } else {
        // Create new ZEPHEL agent
        const { data: agentData, error: agentError } = await supabase.functions.invoke(
          'elevenlabs-conversation',
          {
            body: { 
              action: 'create_agent',
              name: 'ZEPHEL Voice Assistant',
              voice_id: 'onwK4e9ZLuTAKqWW03F9' // Daniel voice
            }
          }
        );

        if (agentError) throw agentError;

        setAgentId(agentData.agent_id);
        setIsInitialized(true);
        console.log('Created new ZEPHEL agent:', agentData.agent_id);
        
        toast({
          title: "ZEPHEL.AGENT_INITIALIZED",
          description: "New ZEPHEL voice agent created and configured.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Failed to initialize ZEPHEL agent:', error);
      toast({
        title: "AGENT.INITIALIZATION_FAILED",
        description: "Could not initialize ZEPHEL voice agent. Check ElevenLabs configuration.",
        variant: "destructive",
      });
    }
  };

  const generateSignedUrl = async () => {
    if (!agentId) {
      throw new Error('No agent ID available');
    }

    const { data, error } = await supabase.functions.invoke(
      'elevenlabs-conversation',
      {
        body: { 
          action: 'get_signed_url',
          agentId 
        }
      }
    );

    if (error) throw error;
    
    return data.signed_url;
  };

  const startVoiceConversation = useCallback(async () => {
    if (!isEnabled || !isInitialized) {
      toast({
        title: "Voice Interface Not Ready",
        description: "Voice capabilities are still initializing or disabled.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Generate signed URL for the agent
      const url = await generateSignedUrl();
      setSignedUrl(url);
      
      // Start conversation with the agent ID
      await conversation.startSession({ 
        agentId: agentId
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
  }, [conversation, isEnabled, isInitialized, agentId, toast]);

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
        return isInitialized ? 'VOICE OFFLINE' : 'INITIALIZING';
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
          {isInitialized && (
            <Badge variant="outline" className="text-xs border-green-500 text-green-400">
              AGENT.READY
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
          {isSpeaking && (
            <div className="flex space-x-1">
              <div className="w-2 h-4 bg-green-400 animate-pulse rounded"></div>
              <div className="w-2 h-6 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-5 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-7 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.3s'}}></div>
            </div>
          )}
        </div>

        {/* Agent Info */}
        {agentId && (
          <div className="text-xs text-gray-400 font-mono">
            Agent ID: {agentId.substring(0, 12)}...
          </div>
        )}

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
              disabled={isConnecting || !isEnabled || !isInitialized}
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

        {/* Advanced Controls */}
        <Button
          onClick={initializeZephelAgent}
          variant="outline"
          size="sm"
          className="w-full border-gray-600 text-xs"
          disabled={isConnecting}
        >
          <Settings className="w-3 h-3 mr-2" />
          Reinitialize Agent
        </Button>

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

        {!isInitialized && isEnabled && (
          <div className="bg-blue-900/20 border border-blue-600 rounded p-2">
            <p className="text-blue-200 text-xs">
              Initializing ZEPHEL voice agent... This may take a moment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};