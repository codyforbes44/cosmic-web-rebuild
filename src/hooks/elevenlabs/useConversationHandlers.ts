
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
    toast({
      title: "Voice Connected",
      description: "ZEPHEL voice interface is now active",
    });
  }, [setIsConnected, toast]);

  const onDisconnect = useCallback(() => {
    console.log('ElevenLabs conversation disconnected');
    setIsConnected(false);
    setConversationId(null);
  }, [setIsConnected, setConversationId]);

  const onError = useCallback((error: any) => {
    console.error('ElevenLabs conversation error:', error);
    setIsConnected(false);
    setIsLoading(false);
    toast({
      title: "Voice Error",
      description: error?.message || "Voice connection failed",
      variant: "destructive",
    });
  }, [setIsConnected, setIsLoading, toast]);

  return {
    onConnect,
    onDisconnect,
    onError
  };
};
