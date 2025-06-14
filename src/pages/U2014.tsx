import React, { useState, useEffect, useCallback } from 'react';
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
import { CollaborativeIntelligence } from '@/components/zephel/CollaborativeIntelligence';
import { RealityRendering } from '@/components/zephel/RealityRendering';
import { zephelConfig, systemCommands } from '@/components/zephel/ZephelConfig';
import { useQuantumCommandProcessor } from '@/hooks/useQuantumCommandProcessor';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MicOff } from 'lucide-react';

const U2014 = () => {
  const [input, setInput] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [matrixEffects, setMatrixEffects] = useState(false);
  const [selectedConstruct, setSelectedConstruct] = useState<any>(null);
  const [collaborativeMode, setCollaborativeMode] = useState(false);

  // Hooks for all ZEPHEL features
  const { processInput, isProcessing } = useZephelProcessor();
  const { processQuantumCommand, quantumState } = useQuantumCommandProcessor();
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
      // Process input using quantum-enhanced processing
      const quantumResult = await processQuantumCommand(currentInput);
      
      // Use enhanced processing result
      const result = await processInput(quantumResult.processedCommand);
      
      if (result?.content) {
        let responseContent = result.content;
        
        // Add quantum enhancement information if significant patterns detected
        if (quantumResult.quantumEnhancement.patterns_detected.length > 0) {
          responseContent += `\n\n→ QUANTUM.ENHANCEMENT.ACTIVE:\n`;
          responseContent += `  Patterns Detected: ${quantumResult.quantumEnhancement.patterns_detected.length}\n`;
          responseContent += `  Quantum Resonance: ${(quantumResult.quantumEnhancement.quantum_resonance * 100).toFixed(1)}%\n`;
          responseContent += `  Processing Accuracy: ${(quantumResult.quantumEnhancement.predictive_model.accuracy * 100).toFixed(1)}%`;
        }
        
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

  const handleVoiceMessage = useCallback((message: string) => {
    // Handle voice messages from ElevenLabs
    if (currentSession) {
      saveMessage('assistant', `ZEPHEL.VOICE: ${message}`);
    }
  }, [currentSession, saveMessage]);

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

  return (
    <div className="min-h-screen relative bg-space-dark-blue">
      <StarBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <ZephelHeader config={zephelConfig} />

          {/* Enhanced Interface Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            
            {/* Left Column - System Status & Collaboration */}
            <div className="lg:col-span-1 space-y-6">
              <SystemStatus metrics={metrics} />
              <CollaborativeIntelligence
                currentUserId="architect_001"
                onPresenceUpdate={handlePresenceUpdate}
                onSharedCommand={handleSharedCommand}
              />
            </div>
            
            {/* Center Column - Chat Interface */}
            <div className="lg:col-span-3">
              <ChatInterface
                messages={messages}
                input={input}
                setInput={setInput}
                onSendMessage={handleSendMessage}
                isProcessing={isProcessing}
              />
            </div>

            {/* Right Column - Commands Only */}
            <div className="lg:col-span-2 space-y-6">
              <SystemCommands
                commands={systemCommands}
                onCommandSelect={handleCommandSelect}
              />
              
              {/* Voice Interface Disabled */}
              <Card className="bg-space-deep-blue/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <MicOff className="w-4 h-4 text-red-400" />
                    Voice Interface - DISABLED
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-xs">
                    ElevenLabs voice agent has been disabled. Text-only interface active.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reality Rendering Engine */}
          <RealityRendering
            onConstructSelect={handleConstructSelect}
            quantumField={{
              intensity: quantumState.coherence,
              phase: quantumState.neural_resonance,
              harmonics: [1, 2, 3, 5, 8]
            }}
          />

          <ConfigurationPanel config={zephelConfig} />
          <ZephelDisclaimer />
        </div>
      </div>
    </div>
  );
};

export default U2014;