
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ZephelVoiceInterface } from '@/components/zephel/ZephelVoiceInterface';
import { Mic, Volume2, Settings } from 'lucide-react';

const VoiceInterface = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark-blue via-space-deep-blue to-black p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-accent/20 rounded-full">
              <Mic className="w-12 h-12 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ZEPHEL Voice Interface
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced voice interaction system powered by ElevenLabs AI. 
            Experience direct conversation with ZEPHEL through sovereign voice synthesis technology.
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
                  <ZephelVoiceInterface 
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
                  <Settings className="w-4 h-4" />
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
                    <span className="text-xs text-green-400">ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Audio Quality</span>
                    <span className="text-xs text-green-400">HIGH</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Voice interface requires microphone access and ElevenLabs API configuration
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
