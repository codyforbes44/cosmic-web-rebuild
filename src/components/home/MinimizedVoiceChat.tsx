
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, Phone, PhoneOff, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConversation } from '@11labs/react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const MinimizedVoiceChat: React.FC = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [agentId] = useState<string>('agent_01jwede7nve1nsm3ngqn7ks8d9');
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null); // null = not checked yet

  const conversation = useConversation({
    onConnect: () => {
      setIsConnecting(false);
      toast({
        title: "ƷBI Voice Connected",
        description: "Voice interface is now active. You can speak naturally.",
        duration: 3000,
      });
    },
    onDisconnect: () => {
      setIsConnecting(false);
    },
    onError: (error) => {
      console.error('Voice error:', error);
      setIsConnecting(false);
      toast({
        title: "Voice Connection Failed",
        description: "Unable to establish voice connection.",
        variant: "destructive",
      });
    }
  });

  const { status, isSpeaking } = conversation;

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

  const checkMicrophonePermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermissions(true);
      return true;
    } catch (error) {
      setHasPermissions(false);
      return false;
    }
  };

  const startVoiceChat = async () => {
    // Check permissions only when user tries to start conversation
    if (hasPermissions === null || hasPermissions === false) {
      const granted = await checkMicrophonePermissions();
      if (!granted) {
        toast({
          title: "Microphone Required",
          description: "Please allow microphone access for voice chat.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      setIsConnecting(true);
      const url = await generateSignedUrl();
      await conversation.startSession({ signedUrl: url });
    } catch (error) {
      console.error('Failed to start voice chat:', error);
      setIsConnecting(false);
      toast({
        title: "Connection Failed",
        description: "Unable to start voice chat. Please try again.",
        variant: "destructive",
      });
    }
  };

  const endVoiceChat = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end voice chat:', error);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'border-green-500 text-green-400';
      case 'connecting':
        return 'border-yellow-500 text-yellow-400';
      default:
        return 'border-gray-500 text-gray-400';
    }
  };

  const getStatusText = () => {
    if (isConnecting) return 'CONNECTING';
    switch (status) {
      case 'connected':
        return isSpeaking ? 'ƷBI SPEAKING' : 'LISTENING';
      case 'connecting':
        return 'ESTABLISHING';
      default:
        return 'READY';
    }
  };

  return (
    <Card className="bg-space-deep-blue/90 backdrop-blur-md border-gray-700 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Mic className={`w-6 h-6 ${isSpeaking ? 'text-green-400 animate-pulse' : 'text-accent'}`} />
              {status === 'connected' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">ƷBI Voice Assistant</h3>
              <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
                {getStatusText()}
              </Badge>
            </div>
          </div>
          <Link to="/voice" className="text-gray-400 hover:text-white transition-colors">
            <Maximize2 className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-gray-300 text-sm mb-4">
          Experience our advanced AI voice assistant. Speak naturally and get intelligent responses in real-time.
        </p>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="flex justify-center mb-4">
            <div className="flex space-x-1">
              <div className="w-2 h-4 bg-green-400 animate-pulse rounded"></div>
              <div className="w-2 h-6 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-5 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-7 bg-green-400 animate-pulse rounded" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {status === 'connected' ? (
            <Button
              onClick={endVoiceChat}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isConnecting}
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              End Chat
            </Button>
          ) : (
            <Button
              onClick={startVoiceChat}
              className="bg-accent hover:bg-accent/80 text-black"
              disabled={isConnecting}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Start Voice'}
            </Button>
          )}
          
          <Link to="/voice">
            <Button variant="outline" className="w-full border-accent/50 text-accent hover:bg-accent/20">
              <Volume2 className="w-4 h-4 mr-2" />
              Full Interface
            </Button>
          </Link>
        </div>

        <div className="mt-4 text-xs text-gray-400 space-y-1">
          <div>• Real-time voice conversation</div>
          <div>• Professional business consulting</div>
          <div>• Secure encrypted communication</div>
        </div>
      </CardContent>
    </Card>
  );
};
