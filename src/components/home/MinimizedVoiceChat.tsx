import React, { useState, memo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Volume2, Phone, PhoneOff, Maximize2, Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConversation } from '@11labs/react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

/**
 * MinimizedVoiceChat - Primary voice AI interface for CTA section
 * Redesigned for better visual hierarchy and mobile experience
 */
export const MinimizedVoiceChat: React.FC = memo(() => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [agentId] = useState<string>('agent_01jwede7nve1nsm3ngqn7ks8d9');
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

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
        return 'border-green-500 bg-green-500/10 text-green-400';
      case 'connecting':
        return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      default:
        return 'border-accent bg-accent/10 text-accent';
    }
  };

  const getStatusText = () => {
    if (isConnecting) return 'CONNECTING...';
    switch (status) {
      case 'connected':
        return isSpeaking ? 'ƷBI SPEAKING' : 'LISTENING...';
      case 'connecting':
        return 'ESTABLISHING';
      default:
        return 'READY TO CHAT';
    }
  };

  const isActive = status === 'connected';

  return (
    <Card className="bg-card/90 backdrop-blur-md border-border shadow-2xl relative overflow-hidden h-full">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
      
      <CardContent className="p-5 sm:p-6 lg:p-8">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Animated Mic Icon */}
            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
              isActive 
                ? 'bg-green-500/20 border-2 border-green-500' 
                : 'bg-accent/10 border-2 border-accent/50'
            }`}>
              <Mic className={`w-6 h-6 sm:w-7 sm:h-7 ${
                isSpeaking ? 'text-green-400 animate-pulse' : isActive ? 'text-green-400' : 'text-accent'
              }`} />
              {isActive && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>
            
            <div>
              <h3 className="text-foreground font-bold text-lg sm:text-xl">
                ƷBI Voice Assistant
              </h3>
              <Badge variant="outline" className={`mt-1 text-xs font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </Badge>
            </div>
          </div>
          
          <Link 
            to="/voice" 
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/50 rounded-lg"
            aria-label="Open full voice interface"
          >
            <Maximize2 className="w-5 h-5" />
          </Link>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
          Experience our advanced AI voice assistant. Speak naturally and get intelligent responses in real-time.
        </p>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="flex justify-center mb-6">
            <div className="flex items-end space-x-1 h-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-2 bg-green-400 rounded-full animate-pulse"
                  style={{
                    height: `${12 + Math.random() * 20}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {isActive ? (
            <Button
              onClick={endVoiceChat}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground py-5 sm:py-6 font-medium"
              disabled={isConnecting}
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              End Conversation
            </Button>
          ) : (
            <Button
              onClick={startVoiceChat}
              className="bg-accent hover:bg-accent/90 text-accent-foreground py-5 sm:py-6 font-medium transition-all duration-300"
              disabled={isConnecting}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Start Voice Chat'}
            </Button>
          )}
          
          <Link to="/voice" className="block">
            <Button 
              variant="outline" 
              className="w-full border-border hover:bg-muted/50 py-5 sm:py-6 font-medium"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Full Experience
            </Button>
          </Link>
        </div>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <Zap className="w-4 h-4 text-accent flex-shrink-0" />
            <span>Real-time responses</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
            <span>AI-powered insights</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <Shield className="w-4 h-4 text-accent flex-shrink-0" />
            <span>Secure & encrypted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

MinimizedVoiceChat.displayName = 'MinimizedVoiceChat';
