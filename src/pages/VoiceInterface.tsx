
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedVoiceInterface } from '@/components/zephel/EnhancedVoiceInterface';
import { Mic, Volume2, Settings, Zap, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const VoiceInterface = () => {
  return (
    <>
      <SEO 
        title="ƷBI Voice Interface | AI Voice Communication"
        description="Experience advanced voice interaction with ƷBI through sovereign voice synthesis technology powered by ElevenLabs AI."
        keywords="voice AI, voice interface, AI communication, ElevenLabs, voice synthesis"
        image="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=630&fit=crop&crop=center"
      />
      <div className="min-h-screen bg-gradient-to-br from-space-dark-blue via-space-deep-blue to-black">
        <Navbar />
        
        <main className="pt-20 pb-8 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-accent/20 rounded-full">
                  <Activity className="w-12 h-12 text-accent animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ƷBI Voice Interface
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Advanced voice interaction system powered by ElevenLabs AI. 
                Experience direct conversation with ƷBI through sovereign voice synthesis technology.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Voice Interface */}
              <div className="lg:col-span-2">
                <Card className="bg-space-deep-blue/90 border-gray-700 h-fit">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-accent" />
                      Voice Communication Portal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black/40 rounded-lg p-6 border border-gray-600">
                      <EnhancedVoiceInterface 
                        onVoiceMessage={(message) => console.log('Voice message:', message)}
                        isEnabled={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                <Card className="bg-space-deep-blue/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Voice Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-300 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Real-time voice synthesis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Sovereign AI responses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Advanced speech recognition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Encrypted communication</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Conversational AI agents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Voice volume control</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-space-deep-blue/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">System Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">ElevenLabs API</span>
                        <span className="text-xs text-green-400">CONNECTED</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Voice Engine</span>
                        <span className="text-xs text-green-400">ENHANCED</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Audio Quality</span>
                        <span className="text-xs text-green-400">HIGH-DEF</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Conversation AI</span>
                        <span className="text-xs text-green-400">ACTIVE</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-space-deep-blue/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Voice Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-xs text-gray-300 space-y-2">
                      <div className="flex justify-between">
                        <span>Voice Model:</span>
                        <span className="text-accent">Daniel (Premium)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Language:</span>
                        <span className="text-accent">English</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quality:</span>
                        <span className="text-accent">Multilingual v2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Latency:</span>
                        <span className="text-accent">Ultra-Low</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Full ElevenLabs integration with real-time voice conversation capabilities
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VoiceInterface;
