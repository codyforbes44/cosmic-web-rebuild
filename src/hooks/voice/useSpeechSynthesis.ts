
import { useState, useRef, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const initializeSynthesis = useCallback(() => {
    const speechSynthesis = window.speechSynthesis;
    if (speechSynthesis) {
      speechSynthesisRef.current = speechSynthesis;
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!speechSynthesisRef.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel();
    setIsSpeaking(false);
    
    // Wait a bit to ensure cancellation is complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtteranceRef.current = utterance;
    
    // Configure voice settings for ZEPHEL-like voice
    utterance.rate = 0.85;
    utterance.pitch = 0.7;
    utterance.volume = 0.8;
    
    // Wait for voices to be loaded
    let voices = speechSynthesisRef.current.getVoices();
    if (voices.length === 0) {
      // Wait for voices to load
      await new Promise<void>((resolve) => {
        const loadVoices = () => {
          voices = speechSynthesisRef.current!.getVoices();
          if (voices.length > 0) {
            resolve();
          } else {
            setTimeout(loadVoices, 100);
          }
        };
        loadVoices();
      });
    }
    
    // Try to use a suitable voice
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('daniel') ||
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('male') ||
      (voice.lang.startsWith('en') && voice.name.toLowerCase().includes('male'))
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
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
      currentUtteranceRef.current = null;
    };
    
    utterance.onerror = (error) => {
      console.error('ZEPHEL: Speech synthesis error:', error);
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
      
      // Try to restart with a simpler approach
      if (error.error === 'network' || error.error === 'synthesis-failed') {
        console.log('ZEPHEL: Retrying speech synthesis...');
        setTimeout(() => {
          const retryUtterance = new SpeechSynthesisUtterance(text);
          retryUtterance.rate = 1;
          retryUtterance.pitch = 1;
          retryUtterance.volume = 1;
          
          retryUtterance.onstart = () => setIsSpeaking(true);
          retryUtterance.onend = () => setIsSpeaking(false);
          retryUtterance.onerror = () => setIsSpeaking(false);
          
          speechSynthesisRef.current?.speak(retryUtterance);
        }, 500);
      }
    };
    
    try {
      speechSynthesisRef.current.speak(utterance);
    } catch (error) {
      console.error('ZEPHEL: Failed to start speech:', error);
      setIsSpeaking(false);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    }
  }, []);

  return {
    isSpeaking,
    speak,
    stopSpeaking,
    initializeSynthesis
  };
};
