
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface VoiceAgent {
  agent_id: string;
  name: string;
  voice_id: string;
  language: string;
  prompt: string;
}

export interface VoiceSession {
  conversationId: string;
  agentId: string;
  signedUrl: string;
  isActive: boolean;
}

export const useElevenLabsVoice = () => {
  const [agents, setAgents] = useState<VoiceAgent[]>([]);
  const [currentSession, setCurrentSession] = useState<VoiceSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load available agents
  const loadAgents = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke(
        'elevenlabs-conversation',
        { body: { action: 'list_agents' } }
      );

      if (error) throw error;
      
      setAgents(data?.agents || []);
      return data?.agents || [];
    } catch (error) {
      console.error('Failed to load agents:', error);
      toast({
        title: "Failed to Load Agents",
        description: "Could not retrieve ElevenLabs voice agents.",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Create a new voice agent
  const createAgent = useCallback(async (config: {
    name: string;
    prompt?: string;
    voice_id?: string;
    language?: string;
  }) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke(
        'elevenlabs-conversation',
        {
          body: {
            action: 'create_agent',
            ...config
          }
        }
      );

      if (error) throw error;

      toast({
        title: "Agent Created",
        description: `Successfully created voice agent: ${config.name}`,
      });

      // Reload agents list
      await loadAgents();
      
      return data;
    } catch (error) {
      console.error('Failed to create agent:', error);
      toast({
        title: "Agent Creation Failed",
        description: "Could not create voice agent. Check your configuration.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast, loadAgents]);

  // Generate signed URL for secure connection
  const generateSignedUrl = useCallback(async (agentId: string) => {
    try {
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
    } catch (error) {
      console.error('Failed to generate signed URL:', error);
      toast({
        title: "Connection Failed",
        description: "Could not generate secure connection URL.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Text-to-speech conversion
  const textToSpeech = useCallback(async (text: string, voiceId?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke(
        'elevenlabs-conversation',
        {
          body: {
            action: 'text_to_speech',
            text,
            voice_id: voiceId
          }
        }
      );

      if (error) throw error;

      // Play the audio
      if (data.audioContent) {
        const audioBlob = new Blob([
          new Uint8Array(atob(data.audioContent).split('').map(c => c.charCodeAt(0)))
        ], { type: data.mimeType });
        
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        return new Promise<void>((resolve, reject) => {
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          audio.onerror = reject;
          audio.play();
        });
      }
    } catch (error) {
      console.error('Text-to-speech failed:', error);
      toast({
        title: "TTS Failed",
        description: "Could not convert text to speech.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Initialize on mount
  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  return {
    agents,
    currentSession,
    isLoading,
    loadAgents,
    createAgent,
    generateSignedUrl,
    textToSpeech,
    setCurrentSession
  };
};
