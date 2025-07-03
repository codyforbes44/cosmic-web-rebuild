
import { useCallback } from 'react';
import { useConversation } from '@11labs/react';
import { useToast } from '@/hooks/use-toast';
import { ConversationConfig } from './elevenlabs/types';
import { useConversationState } from './elevenlabs/useConversationState';
import { useAgentOperations } from './elevenlabs/useAgentOperations';
import { useMessageHandler } from './elevenlabs/useMessageHandler';
import { useConversationHandlers } from './elevenlabs/useConversationHandlers';

export type { ConversationConfig } from './elevenlabs/types';

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
      
      // Request microphone access with specific constraints
      let microphoneStream: MediaStream | null = null;
      try {
        console.log('Requesting microphone access with enhanced settings...');
        microphoneStream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 44100,
            channelCount: 1
          } 
        });
        console.log('Microphone access granted, stream details:', {
          active: microphoneStream.active,
          tracks: microphoneStream.getAudioTracks().length,
          trackSettings: microphoneStream.getAudioTracks()[0]?.getSettings()
        });
        
        // Test microphone input level
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(microphoneStream);
        microphone.connect(analyser);
        
        console.log('Audio context setup completed, sample rate:', audioContext.sampleRate);
        
      } catch (micError) {
        console.error('Microphone access denied:', micError);
        throw new Error('Microphone access is required for voice conversation. Please allow microphone access and try again.');
      }

      const targetAgentId = agentId || currentAgentId;
      if (!targetAgentId) {
        if (microphoneStream) {
          microphoneStream.getTracks().forEach(track => track.stop());
        }
        throw new Error('No agent ID available for conversation');
      }

      console.log('Getting signed URL for conversation...');
      const url = await getSignedUrl(targetAgentId);
      setSignedUrl(url);
      
      console.log('Starting ElevenLabs conversation session with microphone stream...');
      const newConversationId = await conversation.startSession({ 
        signedUrl: url
      });

      console.log('Conversation started successfully with ID:', newConversationId);
      setConversationId(newConversationId);
      
      // Set initial volume to ensure audio output works
      try {
        await conversation.setVolume({ volume: 0.8 });
        console.log('Initial volume set to 0.8');
      } catch (volumeError) {
        console.warn('Failed to set initial volume:', volumeError);
      }
      
      return newConversationId;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setIsConnected(false);
      setIsLoading(false);
      toast({
        title: "Conversation Failed",
        description: error instanceof Error ? error.message : "Failed to start voice conversation",
        variant: "destructive",
      });
      throw error;
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
      
      // Test audio output by playing a brief tone
      if (clampedVolume > 0 && isConnected) {
        console.log('Audio output should be working at volume:', clampedVolume);
      }
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }, [conversation, isConnected]);

  const testMicrophone = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      microphone.connect(analyser);
      analyser.fftSize = 256;
      
      // Test for 2 seconds
      let maxLevel = 0;
      const testDuration = 2000;
      const startTime = Date.now();
      
      const checkLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const level = Math.max(...dataArray);
        maxLevel = Math.max(maxLevel, level);
        
        if (Date.now() - startTime < testDuration) {
          requestAnimationFrame(checkLevel);
        } else {
          console.log('Microphone test completed. Max level detected:', maxLevel);
          stream.getTracks().forEach(track => track.stop());
          audioContext.close();
          
          toast({
            title: "Microphone Test",
            description: maxLevel > 10 ? `Microphone working! Max level: ${maxLevel}` : "Microphone may not be detecting input",
            variant: maxLevel > 10 ? "default" : "destructive"
          });
        }
      };
      
      checkLevel();
    } catch (error) {
      console.error('Microphone test failed:', error);
      toast({
        title: "Microphone Test Failed",
        description: error instanceof Error ? error.message : "Could not test microphone",
        variant: "destructive"
      });
    }
  }, [toast]);

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
    testMicrophone,
    
    // Conversation object for advanced usage
    conversation
  };
};
