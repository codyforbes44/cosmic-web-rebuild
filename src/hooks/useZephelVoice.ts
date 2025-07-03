import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useZephelVoice = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  const checkSupport = useCallback(() => {
    const supported = 'speechSynthesis' in window;
    setIsSupported(supported);
    return supported;
  }, []);

  const speak = useCallback(async (text: string, options?: {
    voice?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
  }) => {
    if (!checkSupport()) {
      toast({
        title: "Voice Not Supported",
        description: "Text-to-speech is not supported in this browser",
        variant: "destructive",
      });
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice settings for ZEPHEL
      utterance.rate = options?.rate || 0.9;
      utterance.pitch = options?.pitch || 0.8;
      utterance.volume = options?.volume || 0.7;

      // Try to use a robotic/synthetic voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = voices.filter(voice => 
        voice.name.toLowerCase().includes('robot') ||
        voice.name.toLowerCase().includes('synthetic') ||
        voice.name.toLowerCase().includes('computer') ||
        voice.lang.startsWith('en')
      );

      if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0];
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        toast({
          title: "Voice Error",
          description: "Failed to play voice message",
          variant: "destructive",
        });
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsPlaying(false);
      toast({
        title: "Voice Error",
        description: "Failed to initialize text-to-speech",
        variant: "destructive",
      });
    }
  }, [checkSupport, toast]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [isSupported]);

  const getVoices = useCallback(() => {
    if (!isSupported) return [];
    return window.speechSynthesis.getVoices();
  }, [isSupported]);

  return {
    speak,
    stop,
    isPlaying,
    isSupported,
    getVoices,
    checkSupport
  };
};