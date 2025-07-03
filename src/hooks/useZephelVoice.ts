
import { useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useZephelProcessor } from './useZephelProcessor';
import { useZephelErrorHandler } from './useZephelErrorHandler';
import { useMicrophonePermissions } from './voice/useMicrophonePermissions';
import { useSpeechRecognition } from './voice/useSpeechRecognition';
import { useSpeechSynthesis } from './voice/useSpeechSynthesis';
import { useVoiceErrorHandling } from './voice/useVoiceErrorHandling';

export const useZephelVoice = () => {
  const { toast } = useToast();
  const { processInput, isProcessing } = useZephelProcessor();
  const { handleError } = useZephelErrorHandler({
    showToast: false,
    logError: true
  });

  // Initialize voice hooks
  const {
    microphonePermission,
    audioLevel,
    checkMicrophonePermission,
    cleanup: cleanupMicrophone
  } = useMicrophonePermissions();

  const {
    isSpeaking,
    speak,
    stopSpeaking,
    initializeSynthesis
  } = useSpeechSynthesis();

  const {
    retryCount,
    handleVoiceError,
    resetRetryCount,
    cleanup: cleanupErrorHandling
  } = useVoiceErrorHandling();

  // Speech recognition callbacks
  const handleSpeechResult = useCallback(async (text: string) => {
    console.log('ƷBI: Processing voice input:', text);
    resetRetryCount();
    
    try {
      const response = await processInput(text);
      await speak(response.content);
      
      toast({
        title: "ƷBI Response",
        description: "Voice input processed successfully",
        duration: 2000,
      });
    } catch (error) {
      handleError(error, { context: 'voice_processing', input: text });
    }
  }, [processInput, speak, toast, handleError, resetRetryCount]);

  const handleSpeechError = useCallback((event: any) => {
    handleVoiceError(event, isListening, { current: null });
  }, [handleVoiceError]);

  const handleSpeechStart = useCallback(() => {
    resetRetryCount();
  }, [resetRetryCount]);

  const handleSpeechEnd = useCallback(() => {
    // Audio level will be reset automatically
  }, []);

  const {
    isListening,
    transcript,
    isSupported,
    startRecognition,
    stopRecognition,
    initializeRecognition
  } = useSpeechRecognition({
    onResult: handleSpeechResult,
    onError: handleSpeechError,
    onStart: handleSpeechStart,
    onEnd: handleSpeechEnd
  });

  // Initialize everything
  useEffect(() => {
    initializeSynthesis();
    initializeRecognition();

    return () => {
      cleanupMicrophone();
      cleanupErrorHandling();
    };
  }, [initializeSynthesis, initializeRecognition, cleanupMicrophone, cleanupErrorHandling]);

  const startListening = useCallback(async () => {
    if (!isSupported) {
      toast({
        title: "Voice Not Supported",
        description: "Speech recognition is not supported in this browser",
        variant: "destructive",
      });
      return;
    }
    
    const hasPermission = await checkMicrophonePermission(true);
    if (!hasPermission) {
      toast({
        title: "Microphone Access Required",
        description: "Please grant microphone access to use voice features",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      stopRecognition();
    } else {
      try {
        startRecognition();
        toast({
          title: "ƷBI Voice Active",
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
  }, [isSupported, isListening, checkMicrophonePermission, startRecognition, stopRecognition, toast]);

  const stopListening = useCallback(() => {
    stopRecognition();
    resetRetryCount();
  }, [stopRecognition, resetRetryCount]);

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
    speak
  };
};
