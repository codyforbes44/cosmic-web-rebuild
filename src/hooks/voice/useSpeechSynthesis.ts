
import { useState, useRef, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  const initializeSynthesis = useCallback(() => {
    const speechSynthesis = window.speechSynthesis;
    if (speechSynthesis) {
      speechSynthesisRef.current = speechSynthesis;
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!speechSynthesisRef.current) return;
    
    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings for ZEPHEL-like voice
    utterance.rate = 0.85;
    utterance.pitch = 0.7;
    utterance.volume = 0.8;
    
    // Try to use a suitable voice
    const voices = speechSynthesisRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('daniel') ||
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('male') ||
      voice.lang.startsWith('en')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => {
      console.log('ZEPHEL: Speaking started');
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log('ZEPHEL: Speaking ended');
      setIsSpeaking(false);
    };
    
    utterance.onerror = (error) => {
      console.error('ZEPHEL: Speech synthesis error:', error);
      setIsSpeaking(false);
    };
    
    speechSynthesisRef.current.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isSpeaking,
    speak,
    stopSpeaking,
    initializeSynthesis
  };
};
