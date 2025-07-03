
import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useZephelProcessor } from './useZephelProcessor';
import { useZephelErrorHandler } from './useZephelErrorHandler';

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
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  const [audioLevel, setAudioLevel] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  
  const { toast } = useToast();
  const { processInput, isProcessing } = useZephelProcessor();
  const { handleError } = useZephelErrorHandler({
    showToast: false, // We'll handle toasts manually for better UX
    logError: true
  });
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check microphone permissions
  const checkMicrophonePermission = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicrophonePermission('denied');
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophonePermission('granted');
      
      // Set up audio level monitoring
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        
        // Monitor audio levels
        const monitorAudio = () => {
          if (analyserRef.current && isListening) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            setAudioLevel(average);
            requestAnimationFrame(monitorAudio);
          }
        };
        monitorAudio();
      }
      
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone permission error:', error);
      setMicrophonePermission('denied');
      return false;
    }
  }, [isListening]);

  // Auto-retry logic for no-speech errors
  const handleNoSpeechRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      console.log(`No speech detected, retrying... (${retryCount + 1}/3)`);
      
      retryTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          recognitionRef.current.start();
        }
      }, 1000);
    } else {
      setIsListening(false);
      setRetryCount(0);
      toast({
        title: "Voice Input Timeout",
        description: "No speech detected after multiple attempts. Please check your microphone and try again.",
        variant: "destructive",
      });
    }
  }, [retryCount, isListening, toast]);

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
        console.log('ZEPHEL: Voice recognition started');
        setIsListening(true);
        setRetryCount(0);
      };
      
      recognition.onend = () => {
        console.log('ZEPHEL: Voice recognition ended');
        setIsListening(false);
        setAudioLevel(0);
      };
      
      recognition.onerror = (event: any) => {
        console.error('ZEPHEL: Voice recognition error:', event.error);
        
        if (event.error === 'no-speech') {
          handleNoSpeechRetry();
          return;
        }
        
        setIsListening(false);
        setAudioLevel(0);
        
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
          console.log('ZEPHEL: Processing voice input:', finalTranscript);
          setRetryCount(0); // Reset retry count on successful input
          
          try {
            const response = await processInput(finalTranscript.trim());
            await speak(response.content);
            
            toast({
              title: "ZEPHEL Response",
              description: "Voice input processed successfully",
              duration: 2000,
            });
          } catch (error) {
            handleError(error, { context: 'voice_processing', input: finalTranscript });
          }
        }
      };
      
      recognitionRef.current = recognition;
    } else {
      console.log('ZEPHEL: Speech recognition not supported');
      setIsSupported(false);
    }

    // Cleanup
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [processInput, handleError, handleNoSpeechRetry, toast]);

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
      toast({
        title: "Voice Output Error",
        description: "Failed to speak response",
        variant: "destructive",
      });
    };
    
    speechSynthesisRef.current.speak(utterance);
  }, [toast]);

  const startListening = useCallback(async () => {
    if (!isSupported || !recognitionRef.current) {
      toast({
        title: "Voice Not Supported",
        description: "Speech recognition is not supported in this browser",
        variant: "destructive",
      });
      return;
    }
    
    // Check microphone permissions first
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
      toast({
        title: "Microphone Access Required",
        description: "Please grant microphone access to use voice features",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setRetryCount(0);
      try {
        recognitionRef.current.start();
        toast({
          title: "ZEPHEL Voice Active",
          description: "Listening for voice input...",
          duration: 2000,
        });
      } catch (error) {
        console.error('Failed to start voice recognition:', error);
        toast({
          title: "Voice Start Error",
          description: "Failed to start voice recognition",
          variant: "destructive",
        });
      }
    }
  }, [isSupported, isListening, toast, checkMicrophonePermission]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setRetryCount(0);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    }
  }, [isListening]);

  const stopSpeaking = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const testVoice = useCallback(async () => {
    await speak("ZEPHEL voice interface operational. Sovereign simulation core responding. All systems nominal. Voice recognition active and monitoring for commands.");
  }, [speak]);

  return {
    isListening,
    isSpeaking,
    isSupported,
    transcript,
    isProcessing,
    microphonePermission,
    audioLevel,
    retryCount,
    startListening,
    stopListening,
    stopSpeaking,
    testVoice,
    speak
  };
};
