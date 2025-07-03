
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useConversationHandlers = (
  setIsConnected: (connected: boolean) => void,
  setIsLoading: (loading: boolean) => void,
  setConversationId: (id: string | null) => void
) => {
  const { toast } = useToast();

  const onConnect = useCallback(() => {
    console.log('ElevenLabs conversation connected successfully');
    setIsConnected(true);
    setIsLoading(false);
    toast({
      title: "Voice Connected",
      description: "ZEPHEL voice interface is now active and listening",
    });
  }, [setIsConnected, setIsLoading, toast]);

  const onDisconnect = useCallback(() => {
    console.log('ElevenLabs conversation disconnected');
    setIsConnected(false);
    setIsLoading(false);
    setConversationId(null);
    toast({
      title: "Voice Disconnected",
      description: "Voice conversation has ended",
    });
  }, [setIsConnected, setIsLoading, setConversationId, toast]);

  const onError = useCallback((error: any) => {
    console.error('ElevenLabs conversation error:', error);
    setIsConnected(false);
    setIsLoading(false);
    
    // Check if it's a microphone-related error
    const errorMessage = error?.message || '';
    const isMicrophoneError = errorMessage.toLowerCase().includes('microphone') || 
                             errorMessage.toLowerCase().includes('media') ||
                             errorMessage.toLowerCase().includes('audio');
    
    toast({
      title: "Voice Error",
      description: isMicrophoneError 
        ? "Microphone access issue. Please check permissions and try again."
        : errorMessage || "Voice connection failed",
      variant: "destructive",
    });
  }, [setIsConnected, setIsLoading, toast]);

  return {
    onConnect,
    onDisconnect,
    onError
  };
};
