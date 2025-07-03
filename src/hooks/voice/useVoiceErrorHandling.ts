
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useVoiceErrorHandling = () => {
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNoSpeechRetry = useCallback((isListening: boolean, recognitionRef: React.RefObject<any>) => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      console.log(`No speech detected, retrying... (${retryCount + 1}/3)`);
      
      retryTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          recognitionRef.current.start();
        }
      }, 1000);
    } else {
      setRetryCount(0);
      toast({
        title: "Voice Input Timeout",
        description: "No speech detected after multiple attempts. Please check your microphone and try again.",
        variant: "destructive",
      });
    }
  }, [retryCount, toast]);

  const handleVoiceError = useCallback((event: any, isListening: boolean, recognitionRef: React.RefObject<any>) => {
    if (event.error === 'no-speech') {
      handleNoSpeechRetry(isListening, recognitionRef);
      return;
    }
    
    const errorMessages = {
      'network': 'Network connection required for voice recognition',
      'not-allowed': 'Microphone access denied. Please grant permission and try again.',
      'service-not-allowed': 'Voice recognition service not available',
      'bad-grammar': 'Voice recognition grammar error',
      'language-not-supported': 'Language not supported for voice recognition'
    };
    
    const message = errorMessages[event.error as keyof typeof errorMessages] || 
                   `Voice recognition error: ${event.error}`;
    
    toast({
      title: "ZEPHEL Voice Error",
      description: message,
      variant: "destructive",
      duration: 5000,
    });
  }, [handleNoSpeechRetry, toast]);

  const resetRetryCount = useCallback(() => {
    setRetryCount(0);
  }, []);

  const cleanup = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  }, []);

  return {
    retryCount,
    handleVoiceError,
    resetRetryCount,
    cleanup
  };
};
