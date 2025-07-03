import React, { useState } from 'react';
import { ZephelVoiceInterface } from '@/components/zephel/ZephelVoiceInterface';
import { EnhancedVoiceControls } from '@/components/zephel/EnhancedVoiceControls';
import { ZephelInterface } from '@/components/zephel/ZephelInterface';
import { ModeSelector } from '@/components/zephel/ModeSelector';
import { Mic, Settings, Headphones, MessageSquare, Lock, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import HomeLayout from '@/components/home/HomeLayout';
import PageHeader from '@/components/PageHeader';

const VoiceInterface = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceMessages, setVoiceMessages] = useState<string[]>([]);
  const [systemMode, setSystemMode] = useState<'professional' | 'godmode'>('professional');
  const [professionalInput, setProfessionalInput] = useState('');
  const [professionalMessages, setProfessionalMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isProfessionalProcessing, setIsProfessionalProcessing] = useState(false);

  const handleVoiceMessage = (message: string) => {
    setVoiceMessages(prev => [...prev, message]);
  };

  const handleModeChange = (mode: 'professional' | 'godmode') => {
    setSystemMode(mode);
    console.log('System mode changed to:', mode);
  };

  const handleProfessionalChat = async () => {
    if (!professionalInput.trim() || isProfessionalProcessing) return;

    const userMessage = professionalInput.trim();
    setProfessionalInput('');
    setIsProfessionalProcessing(true);

    // Add user message
    setProfessionalMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Simulate professional assistant response
    setTimeout(() => {
      const responses = [
        "Thank you for your inquiry. ƷBI offers comprehensive technology solutions tailored to your business needs. Our team specializes in delivering proven results with measurable ROI. Would you like to schedule a FREE consultation to discuss your specific requirements?",
        "I'd be happy to help you explore our services. Based on your message, I recommend starting with our professional consultation to assess your needs and provide customized recommendations. Our solutions range from web development to AI integration, all designed to drive business growth.",
        "Excellent question! ƷBI's approach focuses on delivering reliable, enterprise-grade solutions. We work with businesses of all sizes, from startups to Fortune 500 companies. Our free initial consultation will help determine the best solution path for your specific situation.",
        "That's a great use case for our technology services. We've helped similar companies achieve significant results - including 300% sales increases and 70% support ticket reductions. I'd recommend scheduling a consultation to discuss how we can replicate similar success for your business."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setProfessionalMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsProfessionalProcessing(false);
    }, 1500);
  };

  // Simple professional chat component for anonymous users
  const ProfessionalChatInterface = () => (
    <div className="space-y-4">
      <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-accent" />
          <h3 className="text-white text-lg font-medium">ƷBI Professional Assistant</h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Welcome to ƷBI's professional business technology consultant. I can help you with:
          </p>
          <ul className="text-gray-400 text-sm space-y-2 ml-4">
            <li>• Web Development Services ($2,500-$25,000+)</li>
            <li>• AI Solutions & Integration ($5,000-$50,000+)</li>
            <li>• Digital Marketing Services ($1,500-$7,500/month)</li>
            <li>• Strategy Consulting ($10,000-$100,000+)</li>
            <li>• Social Media Management ($1,200-$5,000/month)</li>
          </ul>
          <div className="bg-green-900/20 border border-green-600 rounded p-3 mt-4">
            <p className="text-green-200 text-sm font-medium">Ready to get started?</p>
            <p className="text-green-300 text-xs mt-1">
              Schedule your FREE consultation to discuss your specific needs and receive customized project recommendations.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
            <Lock className="w-3 h-3" />
            <span>Enhanced architect features require authentication</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
        <div className="h-64 overflow-y-auto space-y-3 mb-4">
          {professionalMessages.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8">
              Ask me about our business technology solutions...
            </div>
          ) : (
            professionalMessages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded ${
                  message.role === 'user'
                    ? 'bg-accent/20 ml-6 border border-accent/30'
                    : 'bg-gray-800/50 mr-6 border border-gray-700'
                }`}
              >
                <div className="text-xs font-medium text-accent mb-1">
                  {message.role === 'user' ? 'YOU' : 'ƷBI ASSISTANT'}
                </div>
                <div className="text-sm text-gray-200">{message.content}</div>
              </div>
            ))
          )}
          {isProfessionalProcessing && (
            <div className="bg-gray-800/50 mr-6 border border-gray-700 p-3 rounded">
              <div className="text-xs font-medium text-accent mb-1">ƷBI ASSISTANT</div>
              <div className="text-sm text-gray-200">Thinking...</div>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="space-y-2">
          <Textarea
            value={professionalInput}
            onChange={(e) => setProfessionalInput(e.target.value)}
            placeholder="Ask about our services, pricing, or schedule a consultation..."
            className="bg-black/30 border-gray-700 text-white resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleProfessionalChat();
              }
            }}
          />
          <Button 
            onClick={handleProfessionalChat}
            disabled={!professionalInput.trim() || isProfessionalProcessing}
            className="w-full bg-accent hover:bg-accent/80 text-black"
          >
            {isProfessionalProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );

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
                    {systemMode === 'professional' 
                      ? 'Professional business technology consultant mode. Enhanced architect features require passcode authentication.'
                      : 'Full ZEPHEL architect interface with advanced simulation capabilities and collaborative intelligence features.'
                    }
                  </p>
                </div>
                
                {systemMode === 'professional' ? (
                  <ProfessionalChatInterface />
                ) : (
                  <ZephelInterface userId="voice_interface_user" />
                )}
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
