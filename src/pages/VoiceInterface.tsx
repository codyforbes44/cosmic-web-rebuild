
import React, { useState } from 'react';
import { ZephelVoiceInterface } from '@/components/zephel/ZephelVoiceInterface';
import { EnhancedVoiceControls } from '@/components/zephel/EnhancedVoiceControls';
import { ZephelInterface } from '@/components/zephel/ZephelInterface';
import { ModeSelector } from '@/components/zephel/ModeSelector';
import { Mic, Settings, Headphones, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeLayout from '@/components/home/HomeLayout';
import PageHeader from '@/components/PageHeader';

const VoiceInterface = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceMessages, setVoiceMessages] = useState<string[]>([]);
  const [systemMode, setSystemMode] = useState<'professional' | 'godmode'>('professional');

  const handleVoiceMessage = (message: string) => {
    setVoiceMessages(prev => [...prev, message]);
  };

  const handleModeChange = (mode: 'professional' | 'godmode') => {
    setSystemMode(mode);
    console.log('System mode changed to:', mode);
  };

  return (
    <HomeLayout>
      <div className="min-h-screen py-16 md:py-24">
        <PageHeader
          title="Advanced Voice Interface"
          description="Experience next-generation voice AI technology with real-time speech recognition and intelligent responses"
          icon={Mic}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Mode Selector */}
            <div className="mb-6">
              <ModeSelector
                currentMode={systemMode}
                onModeChange={handleModeChange}
              />
            </div>

            <Tabs defaultValue="interface" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-space-deep-blue/90 border-gray-700">
                <TabsTrigger 
                  value="interface" 
                  className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-black"
                >
                  <Mic className="w-4 h-4" />
                  Voice Interface
                </TabsTrigger>
                <TabsTrigger 
                  value="text"
                  className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-black"
                >
                  <MessageSquare className="w-4 h-4" />
                  Text Interface
                </TabsTrigger>
                <TabsTrigger 
                  value="controls"
                  className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-black"
                >
                  <Settings className="w-4 h-4" />
                  Voice Controls
                </TabsTrigger>
              </TabsList>

              <TabsContent value="interface" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <ZephelVoiceInterface
                      onVoiceMessage={handleVoiceMessage}
                      isEnabled={voiceEnabled}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    {/* Quick Stats */}
                    <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
                      <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                        <Headphones className="w-4 h-4" />
                        Session Stats
                      </h3>
                      <div className="space-y-2 text-xs text-gray-400">
                        <div className="flex justify-between">
                          <span>Voice Messages:</span>
                          <span className="text-accent">{voiceMessages.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className={voiceEnabled ? 'text-green-400' : 'text-red-400'}>
                            {voiceEnabled ? 'ACTIVE' : 'DISABLED'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mode:</span>
                          <span className={systemMode === 'godmode' ? 'text-red-400' : 'text-green-400'}>
                            {systemMode === 'godmode' ? 'GODMODE' : 'PROFESSIONAL'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Engine:</span>
                          <span className="text-cyan-400">ElevenLabs</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Messages */}
                    {voiceMessages.length > 0 && (
                      <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-white text-sm font-medium mb-3">Recent Responses</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {voiceMessages.slice(-5).map((message, index) => (
                            <div
                              key={index}
                              className="bg-green-900/20 border border-green-600 rounded p-2"
                            >
                              <p className="text-green-200 text-xs">{message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-6">
                <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    <span className="text-white text-sm font-medium">Text Interface Mode</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      systemMode === 'godmode' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
                    }`}>
                      {systemMode === 'godmode' ? 'GODMODE' : 'PROFESSIONAL'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">
                    Interact with ZEPHEL through text-based conversation. All professional services and enhanced mode capabilities are available.
                  </p>
                </div>
                
                <ZephelInterface userId="voice_interface_user" />
              </TabsContent>

              <TabsContent value="controls" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <EnhancedVoiceControls
                    onVoiceToggle={setVoiceEnabled}
                    voiceEnabled={voiceEnabled}
                  />
                  
                  <div className="space-y-4">
                    {/* Configuration Guide */}
                    <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
                      <h3 className="text-white text-sm font-medium mb-3">Setup Guide</h3>
                      <div className="space-y-3 text-xs text-gray-400">
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                          <div>
                            <div className="text-white">ElevenLabs API Key</div>
                            <div>Configure your API key in project settings</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                          <div>
                            <div className="text-white">Create Voice Agent</div>
                            <div>Set up your conversational AI agent</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                          <div>
                            <div className="text-white">Enable Microphone</div>
                            <div>Grant browser permission for voice input</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">4</div>
                          <div>
                            <div className="text-white">Start Conversation</div>
                            <div>Connect and begin voice interaction</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Info */}
                    <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
                      <h3 className="text-white text-sm font-medium mb-3">Technical Details</h3>
                      <div className="space-y-2 text-xs text-gray-400">
                        <div><span className="text-white">Engine:</span> ElevenLabs Conversational AI</div>
                        <div><span className="text-white">Model:</span> Eleven Multilingual v2</div>
                        <div><span className="text-white">Protocol:</span> WebSocket + Signed URLs</div>
                        <div><span className="text-white">Latency:</span> ~200-500ms response time</div>
                        <div><span className="text-white">Security:</span> Encrypted end-to-end</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default VoiceInterface;
