import React, { useState, useEffect } from 'react';
import StarBackground from '@/components/StarBackground';
import { useZephelProcessor } from '@/hooks/useZephelProcessor';
import { useZephelSessions } from '@/hooks/useZephelSessions';
import { useZephelVoice } from '@/hooks/useZephelVoice';
import { useZephelSounds } from '@/hooks/useZephelSounds';
import { useZephelMetrics } from '@/hooks/useZephelMetrics';
import { ZephelHeader } from '@/components/zephel/ZephelHeader';
import { SystemStatus } from '@/components/zephel/SystemStatus';
import { ChatInterface } from '@/components/zephel/ChatInterface';
import { SystemCommands } from '@/components/zephel/SystemCommands';
import { ConfigurationPanel } from '@/components/zephel/ConfigurationPanel';
import { ZephelDisclaimer } from '@/components/zephel/ZephelDisclaimer';
import { zephelConfig, systemCommands } from '@/components/zephel/ZephelConfig';

const U2014 = () => {
  const [input, setInput] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [matrixEffects, setMatrixEffects] = useState(false);

  // Hooks for all ZEPHEL features
  const { processInput, isProcessing } = useZephelProcessor();
  const { currentSession, messages, saveMessage } = useZephelSessions();
  const { speak, isPlaying } = useZephelVoice();
  const { playSystemBoot, playCommandExecute, playSuccess, playError } = useZephelSounds();
  const { metrics } = useZephelMetrics();

  // Initialize system
  useEffect(() => {
    playSystemBoot();
    setMatrixEffects(true);
    setTimeout(() => setMatrixEffects(false), 5000);
  }, [playSystemBoot]);

  // Auto-scroll messages
  useEffect(() => {
    const messagesContainer = document.querySelector('.h-96.overflow-y-auto');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    playCommandExecute();
    const currentInput = input;
    setInput('');

    // Save user message to database if session exists
    if (currentSession) {
      await saveMessage('user', currentInput);
    }

    try {
      // Process input using local ZEPHEL processor
      const result = await processInput(currentInput);
      
      if (result?.content) {
        const responseContent = result.content;
        
        // Save assistant message to database if session exists
        if (currentSession) {
          await saveMessage('assistant', responseContent);
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
      
      // Save error message to database if session exists
      if (currentSession) {
        await saveMessage('assistant', errorMessage);
      }
    }
  };

  const handleCommandSelect = (command: string) => {
    setInput(command);
  };

  return (
    <div className="min-h-screen relative bg-space-dark-blue">
      <StarBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <ZephelHeader config={zephelConfig} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <SystemStatus metrics={metrics} />
            
            <ChatInterface
              messages={messages}
              input={input}
              setInput={setInput}
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
            />

            <SystemCommands
              commands={systemCommands}
              onCommandSelect={handleCommandSelect}
            />
          </div>

          <ConfigurationPanel config={zephelConfig} />
          <ZephelDisclaimer />
        </div>
      </div>
    </div>
  );
};

export default U2014;