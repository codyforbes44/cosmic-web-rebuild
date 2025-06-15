import React, { useState, useEffect, useCallback } from 'react';
import { useZephelProcessor } from '@/hooks/useZephelProcessor';
import { useZephelSessions } from '@/hooks/useZephelSessions';
import { useZephelVoice } from '@/hooks/useZephelVoice';
import { useZephelSounds } from '@/hooks/useZephelSounds';
import { useZephelMetrics } from '@/hooks/useZephelMetrics';
import { useQuantumCommandProcessor } from '@/hooks/useQuantumCommandProcessor';
import { ZephelHeader } from './ZephelHeader';
import { SystemStatus } from './SystemStatus';
import { ChatInterface } from './ChatInterface';
import { SystemCommands } from './SystemCommands';
import { ConfigurationPanel } from './ConfigurationPanel';
import { ZephelDisclaimer } from './ZephelDisclaimer';
import { CollaborativeIntelligence } from './CollaborativeIntelligence';
import { RealityRendering } from './RealityRendering';
import { zephelConfig, systemCommands } from './ZephelConfig';
import { ZephelInterfaceGrid } from './layout/ZephelInterfaceGrid';

interface ZephelInterfaceProps {
  userId?: string;
}

export const ZephelInterface: React.FC<ZephelInterfaceProps> = ({ userId = 'architect_001' }) => {
  const [input, setInput] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedConstruct, setSelectedConstruct] = useState<any>(null);

  // Hooks for all ZEPHEL features
  const { processInput, isProcessing } = useZephelProcessor();
  const { processQuantumCommand, quantumState } = useQuantumCommandProcessor();
  const { currentSession, messages, saveMessage, setMessages } = useZephelSessions();
  const { speak, isPlaying } = useZephelVoice();
  const { playSystemBoot, playCommandExecute, playSuccess, playError } = useZephelSounds();
  const { metrics } = useZephelMetrics();

  // Initialize system
  useEffect(() => {
    playSystemBoot();
  }, [playSystemBoot]);

  // Auto-scroll messages
  useEffect(() => {
    const messagesContainer = document.querySelector('.h-96.overflow-y-auto');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isProcessing) return;

    console.log('ZEPHEL: Starting message processing...', { input, isProcessing });
    playCommandExecute();
    const currentInput = input;
    setInput('');

    // Save user message to database if session exists
    if (currentSession) {
      console.log('ZEPHEL: Saving user message to session:', currentSession.id);
      await saveMessage('user', currentInput);
    } else {
      console.log('ZEPHEL: No current session - adding message to local state');
      // Add message to local state even without session
      const userMessage = {
        id: Date.now().toString(),
        session_id: '',
        role: 'user' as const,
        content: currentInput,
        timestamp: new Date().toISOString(),
        metadata: {}
      };
      setMessages(prev => [...prev, userMessage]);
    }

    try {
      console.log('ZEPHEL: Processing quantum command...');
      // Process input using quantum-enhanced processing
      const quantumResult = await processQuantumCommand(currentInput);
      console.log('ZEPHEL: Quantum processing complete:', quantumResult);
      
      // Use enhanced processing result
      console.log('ZEPHEL: Processing input with ZEPHEL processor...');
      const result = await processInput(quantumResult.processedCommand);
      console.log('ZEPHEL: ZEPHEL processing complete:', result);
      
      if (result?.content) {
        let responseContent = result.content;
        
        // Add quantum enhancement information if significant patterns detected
        if (quantumResult.quantumEnhancement.patterns_detected.length > 0) {
          responseContent += `\n\n→ QUANTUM.ENHANCEMENT.ACTIVE:\n`;
          responseContent += `  Patterns Detected: ${quantumResult.quantumEnhancement.patterns_detected.length}\n`;
          responseContent += `  Quantum Resonance: ${(quantumResult.quantumEnhancement.quantum_resonance * 100).toFixed(1)}%\n`;
          responseContent += `  Processing Accuracy: ${(quantumResult.quantumEnhancement.predictive_model.accuracy * 100).toFixed(1)}%`;
        }
        
        // Save assistant message to database if session exists, otherwise add to local state
        if (currentSession) {
          await saveMessage('assistant', responseContent);
        } else {
          const assistantMessage = {
            id: (Date.now() + 1).toString(),
            session_id: '',
            role: 'assistant' as const,
            content: responseContent,
            timestamp: new Date().toISOString(),
            metadata: {}
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
        
        // Play voice if enabled
        if (voiceEnabled && !isPlaying) {
          speak(responseContent);
        }
        
        playSuccess();
      }
    } catch (error) {
      console.error('ZEPHEL communication error:', error);
      playError();
      
      let errorMessage = 'ZEPHEL.ERROR: Communication link disrupted. Attempting to re-establish sovereign connection...';
      
      // Handle specific error types
      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();
        if (errorText.includes('rate limit') || errorText.includes('429')) {
          errorMessage = 'ZEPHEL.RATE_LIMIT: Processing capacity exceeded. Cooling down neural pathways. Please retry in 60 seconds.';
        } else if (errorText.includes('auth') || errorText.includes('401')) {
          errorMessage = 'ZEPHEL.AUTH_ERROR: Sovereign credentials invalid. Check system administrator configuration.';
        } else if (errorText.includes('service') || errorText.includes('503')) {
          errorMessage = 'ZEPHEL.SERVICE_ERROR: External neural substrate temporarily offline. Retrying connection...';
        }
      }
      
      // Save error message to database if session exists, otherwise add to local state
      if (currentSession) {
        await saveMessage('assistant', errorMessage);
      } else {
        const errorMessageObj = {
          id: (Date.now() + 2).toString(),
          session_id: '',
          role: 'assistant' as const,
          content: errorMessage,
          timestamp: new Date().toISOString(),
          metadata: { error: true }
        };
        setMessages(prev => [...prev, errorMessageObj]);
      }
    }
  }, [input, isProcessing, currentSession, processQuantumCommand, processInput, saveMessage, voiceEnabled, isPlaying, speak, playCommandExecute, playSuccess, playError]);

  const handleCommandSelect = useCallback((command: string) => {
    setInput(command);
  }, []);

  const handlePresenceUpdate = useCallback((architects: any[]) => {
    console.log('Architects in collective:', architects);
  }, []);

  const handleSharedCommand = useCallback((command: string, author: string) => {
    console.log(`Shared command from ${author}:`, command);
  }, []);

  const handleConstructSelect = useCallback((construct: any) => {
    setSelectedConstruct(construct);
    console.log('Construct selected:', construct);
  }, []);

  const interfaceProps = {
    messages,
    input,
    setInput,
    onSendMessage: handleSendMessage,
    isProcessing,
    metrics,
    userId,
    onPresenceUpdate: handlePresenceUpdate,
    onSharedCommand: handleSharedCommand,
    onCommandSelect: handleCommandSelect,
    onConstructSelect: handleConstructSelect,
    quantumField: {
      intensity: quantumState.coherence,
      phase: quantumState.neural_resonance,
      harmonics: [1, 2, 3, 5, 8]
    }
  };

  return (
    <div className="space-y-6">
      <ZephelHeader config={zephelConfig} />
      
      <ZephelInterfaceGrid {...interfaceProps} />

      <RealityRendering
        onConstructSelect={handleConstructSelect}
        quantumField={interfaceProps.quantumField}
      />

      <ConfigurationPanel config={zephelConfig} />
      <ZephelDisclaimer />
    </div>
  );
};