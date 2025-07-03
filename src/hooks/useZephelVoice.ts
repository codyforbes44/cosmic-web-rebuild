
import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useZephelProcessor } from './useZephelProcessor';

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

export const useZephelVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();
  const { processInput, isProcessing } = useZephelProcessor();
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true);
      speechSynthesisRef.current = speechSynthesis;
      
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
      };
      
      recognition.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}`,
          variant: "destructive",
        });
      };
      
      recognition.onresult = async (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        setTranscript(interimTranscript || finalTranscript);
        
        if (finalTranscript.trim()) {
          console.log('Processing voice input:', finalTranscript);
          try {
            const response = await processInput(finalTranscript.trim());
            await speak(response.content);
          } catch (error) {
            console.error('Error processing voice input:', error);
            toast({
              title: "Processing Error",
              description: "Failed to process voice input",
              variant: "destructive",
            });
          }
        }
      };
      
      recognitionRef.current = recognition;
    } else {
      console.log('Speech recognition not supported');
      setIsSupported(false);
    }
  }, [processInput, toast]);

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
      console.log('ZEPHEL speaking started');
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log('ZEPHEL speaking ended');
      setIsSpeaking(false);
    };
    
    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      toast({
        title: "Voice Output Error",
        description: "Failed to speak response",
        variant: "destructive",
      });
    };
    
    speechSynthesisRef.current.speak(utterance);
  }, [toast]);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      toast({
        title: "Voice Not Supported",
        description: "Speech recognition is not supported in this browser",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      recognitionRef.current.start();
    }
  }, [isSupported, isListening, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const stopSpeaking = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const testVoice = useCallback(async () => {
    await speak("ZEPHEL voice interface operational. Sovereign simulation core responding. System status: nominal.");
  }, [speak]);

  return {
    isListening,
    isSpeaking,
    isSupported,
    transcript,
    isProcessing,
    startListening,
    stopListening,
    stopSpeaking,
    testVoice,
    speak
  };
};
