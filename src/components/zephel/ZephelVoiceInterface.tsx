
import React, { useState, useCallback, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, Settings, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ZephelVoiceInterfaceProps {
  onVoiceMessage?: (message: string) => void;
  isEnabled?: boolean;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ZephelVoiceInterface: React.FC<ZephelVoiceInterfaceProps> = ({
  onVoiceMessage,
  isEnabled = true
}) => {
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [agentId, setAgentId] = useState<string>('agent_01jwede7nve1nsm3ngqn7ks8d9');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [userTranscript, setUserTranscript] = useState('');
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null); // null = not checked yet

  const conversation = useConversation({
    onConnect: () => {
      console.log('ƷBI voice connection established');
      setIsConnecting(false);
      toast({
        title: "ƷBI.VOICE_ONLINE",
        description: "Sovereign voice interface activated. You may now speak directly with ƷBI.",
        duration: 3000,
      });
    },
    onDisconnect: () => {
      console.log('ƷBI voice connection terminated');
      setIsConnecting(false);
      toast({
        title: "ƷBI.VOICE_OFFLINE", 
        description: "Voice interface disconnected. Returning to text-only mode.",
        variant: "destructive",
      });
    },
    onMessage: (message) => {
      console.log('ƷBI voice message:', message);
      
      // Handle the message based on its structure
      if (typeof message === 'string') {
        setConversationHistory(prev => [...prev, {
          role: 'assistant',
          content: message,
          timestamp: new Date()
        }]);
        
        if (onVoiceMessage) {
          onVoiceMessage(message);
        }
      } else if (message && typeof message === 'object') {
        const messageObj = message as any;
        const messageText = messageObj.message || messageObj.content || messageObj.text || '';
        const messageSource = messageObj.source || messageObj.role || 'assistant';
        
        if (messageText) {
          const role = messageSource === 'user' ? 'user' : 'assistant';
          
          if (role === 'user') {
            setUserTranscript(messageText);
          }
          
          setConversationHistory(prev => [...prev, {
            role,
            content: messageText,
            timestamp: new Date()
          }]);
          
          if (role === 'assistant' && onVoiceMessage) {
            onVoiceMessage(messageText);
          }
        }
      }
    },
    onError: (error) => {
      console.error('ƷBI voice error:', error);
      setIsConnecting(false);
      
      // Handle error properly - it could be a string, Error object, or other type
      let errorMessage = 'Unknown error';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        const errorObj = error as any;
        errorMessage = errorObj.message || errorObj.error || JSON.stringify(error);
      }
      
      toast({
        title: "ƷBI.VOICE_ERROR",
        description: `Voice interface malfunction: ${errorMessage}`,
        variant: "destructive",
      });
    }
  });

  const { status, isSpeaking } = conversation;

  // Don't check permissions on mount - only when user tries to use voice
  
  const checkMicrophonePermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately after checking
      setHasPermissions(true);
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermissions(false);
      return false;
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
        description: isInitialized ? "Voice capabilities are disabled." : "Voice agent is still initializing.",
        variant: "destructive",
      });
      return;
    }

    // Check permissions only when user tries to start conversation
    if (hasPermissions === null || hasPermissions === false) {
      const granted = await checkMicrophonePermissions();
      if (!granted) {
        toast({
          title: "Microphone Access Required",
          description: "Please allow microphone access to use voice features.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      setIsConnecting(true);
      
      // Generate signed URL for the agent
      const url = await generateSignedUrl();
      
      // Start conversation with the signed URL - no overrides
      await conversation.startSession({ 
        signedUrl: url
      });
      
    } catch (error) {
      console.error('Failed to start voice conversation:', error);
      setIsConnecting(false);
      
      toast({
        title: "Voice Connection Failed",
        description: "Unable to establish voice link with ƷBI. Check configuration.",
        variant: "destructive",
      });
    }
  }, [conversation, isEnabled, isInitialized, agentId, hasPermissions, toast]);

  const endVoiceConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setIsConnecting(false);
      setUserTranscript('');
    } catch (error) {
      console.error('Failed to end voice conversation:', error);
    }
  }, [conversation]);

  const toggleMute = useCallback(async () => {
    try {
      const newVolume = isMuted ? volume : 0;
      await conversation.setVolume({ volume: newVolume });
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  }, [conversation, isMuted, volume]);

  const handleVolumeChange = useCallback(async (newVolume: number) => {
    try {
      setVolume(newVolume);
      if (!isMuted) {
        await conversation.setVolume({ volume: newVolume });
      }
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }, [conversation, isMuted]);

  const requestMicrophonePermission = useCallback(async () => {
    const granted = await checkMicrophonePermissions();
    if (granted) {
      toast({
        title: "Microphone Access Granted",
        description: "Voice interface is now ready for use.",
      });
    } else {
      toast({
        title: "Microphone Access Denied",
        description: "Please enable microphone access in your browser settings.",
        variant: "destructive",
      });
    }
  }, [toast]);

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
        return isSpeaking ? 'ƷBI SPEAKING' : 'VOICE ACTIVE';
      case 'connecting':
        return 'ESTABLISHING LINK';
      case 'disconnected':
        return isInitialized ? 'VOICE OFFLINE' : 'INITIALIZING';
      default:
        return 'ERROR STATE';
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Voice Interface Card */}
      <Card className="bg-space-deep-blue/90 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Mic className={`w-4 h-4 ${isSpeaking ? 'text-green-400 animate-pulse' : 'text-gray-400'}`} />
            ƷBI Voice Interface
            {isInitialized && (
              <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                READY
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Permission Check - only show if permissions were denied */}
          {hasPermissions === false && (
            <div className="bg-yellow-900/20 border border-yellow-600 rounded p-3">
              <p className="text-yellow-200 text-sm mb-2">
                Microphone access required for voice interaction
              </p>
              <Button
                onClick={requestMicrophonePermission}
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700 text-black"
              >
                <Mic className="w-3 h-3 mr-2" />
                Grant Access
              </Button>
            </div>
          )}

          {/* Status Display */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
              {getStatusText()}
            </Badge>
            
            {/* Speaking Indicator */}
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
          <div className="text-xs text-gray-400 font-mono">
            Agent: {agentId}
          </div>

          {/* User Transcript Display */}
          {userTranscript && (
            <div className="bg-blue-900/20 border border-blue-600 rounded p-2">
              <p className="text-blue-200 text-xs">You: {userTranscript}</p>
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

          {/* Volume Control */}
          {status === 'connected' && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Volume: {Math.round(volume * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          {/* Voice Features Info */}
          <div className="text-xs text-gray-400 space-y-1">
            <div>• Real-time voice conversation with ƷBI</div>
            <div>• Live speech transcription and AI responses</div>
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

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <Card className="bg-space-deep-blue/90 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Conversation History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-60 overflow-y-auto">
            {conversationHistory.slice(-10).map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded text-xs ${
                  msg.role === 'user'
                    ? 'bg-blue-900/20 border border-blue-600 text-blue-200'
                    : 'bg-green-900/20 border border-green-600 text-green-200'
                }`}
              >
                <div className="font-medium text-gray-400 mb-1">
                  {msg.role === 'user' ? 'Architect' : 'ƷBI'} - {msg.timestamp.toLocaleTimeString()}
                </div>
                <div>{msg.content}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
