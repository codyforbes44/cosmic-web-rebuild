
import { useCallback } from 'react';
import { useConversation } from '@11labs/react';
import { useToast } from '@/hooks/use-toast';
import { ConversationConfig } from './elevenlabs/types';
import { useConversationState } from './elevenlabs/useConversationState';
import { useAgentOperations } from './elevenlabs/useAgentOperations';
import { useMessageHandler } from './elevenlabs/useMessageHandler';
import { useConversationHandlers } from './elevenlabs/useConversationHandlers';

export { ConversationConfig } from './elevenlabs/types';

export const useElevenLabsConversation = (config?: ConversationConfig) => {
  const { toast } = useToast();
  const {
    isConnected,
    isLoading,
    currentAgentId,
    signedUrl,
    messages,
    conversationId,
    setIsConnected,
    setIsLoading,
    setCurrentAgentId,
    setSignedUrl,
    setConversationId,
    addMessage,
    clearMessages,
    resetConversation
  } = useConversationState();

  const { createAgent, getSignedUrl } = useAgentOperations();
  const { handleMessage } = useMessageHandler(addMessage);
  const { onConnect, onDisconnect, onError } = useConversationHandlers(
    setIsConnected,
    setIsLoading,
    setConversationId
  );

  const conversation = useConversation({
    onConnect,
    onDisconnect,
    onMessage: handleMessage,
    onError,
    overrides: config && config.prompt ? {
      agent: {
        prompt: { prompt: config.prompt },
      },
    } : undefined,
  });

  const startConversation = useCallback(async (agentId?: string) => {
    if (isConnected || isLoading) {
      console.log('Conversation already active or loading, skipping start');
      return conversationId;
    }

    setIsLoading(true);
    try {
      console.log('Starting conversation with agent:', agentId || currentAgentId);
      
      // Request microphone access first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access granted');
        // Stop the stream immediately as we just needed permission
        stream.getTracks().forEach(track => track.stop());
      } catch (micError) {
        console.error('Microphone access denied:', micError);
        throw new Error('Microphone access is required for voice conversation');
      }

      const targetAgentId = agentId || currentAgentId;
      if (!targetAgentId) {
        throw new Error('No agent ID available for conversation');
      }

      console.log('Getting signed URL for conversation...');
      const url = await getSignedUrl(targetAgentId);
      setSignedUrl(url);
      
      console.log('Starting conversation session...');
      const newConversationId = await conversation.startSession({ 
        signedUrl: url
      });

      console.log('Conversation started successfully with ID:', newConversationId);
      setConversationId(newConversationId);
      return newConversationId;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setIsConnected(false);
      toast({
        title: "Conversation Failed",
        description: error instanceof Error ? error.message : "Failed to start voice conversation",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [currentAgentId, conversation, getSignedUrl, toast, isConnected, isLoading, conversationId, setIsLoading, setIsConnected, setSignedUrl, setConversationId]);

  const endConversation = useCallback(async () => {
    try {
      console.log('Ending conversation...');
      if (conversationId) {
        await conversation.endSession();
        console.log('Conversation ended successfully');
      }
      resetConversation();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  }, [conversation, conversationId, resetConversation]);

  const setVolume = useCallback(async (volume: number) => {
    try {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      await conversation.setVolume({ volume: clampedVolume });
      console.log('Volume set to:', clampedVolume);
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }, [conversation]);

  return {
    // State
    isConnected,
    isLoading,
    isSpeaking: conversation.isSpeaking,
    currentAgentId,
    messages,
    conversationId,
    
    // Actions
    createAgent: (config?: { name?: string; prompt?: string; voiceId?: string; }) => {
      setIsLoading(true);
      return createAgent(config).then(agentId => {
        setCurrentAgentId(agentId);
        return agentId;
      }).finally(() => {
        setIsLoading(false);
      });
    },
    startConversation,
    endConversation,
    setVolume,
    
    // Conversation object for advanced usage
    conversation
  };
};
