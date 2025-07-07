
import React from 'react';
import { VoiceInterfaceContent } from '@/components/zephel/VoiceInterfaceContent';
import { Mic, Phone } from 'lucide-react';
import HomeLayout from '@/components/home/HomeLayout';
import PageHeader from '@/components/PageHeader';
import { useVoiceInterface } from '@/hooks/useVoiceInterface';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VoiceInterface = () => {
  const {
    voiceEnabled,
    setVoiceEnabled,
    voiceMessages,
    systemMode,
    professionalInput,
    setProfessionalInput,
    professionalMessages,
    isProfessionalProcessing,
    handleVoiceMessage,
    handleModeChange,
    handleProfessionalChat
  } = useVoiceInterface();

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
            
            {/* Direct Dial Option */}
            <div className="mb-8">
              <Card className="bg-space-deep-blue/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Phone className="w-5 h-5 text-accent" />
                    Direct Connect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    For immediate assistance or technical support, connect directly with our team:
                  </p>
                  <div className="flex items-center justify-between bg-space-dark-blue/50 p-4 rounded-lg border border-gray-700">
                    <div>
                      <p className="text-white font-semibold text-lg">(214) 888-4394</p>
                      <p className="text-gray-400 text-sm">Direct dial • Available during business hours</p>
                    </div>
                    <Button
                      onClick={() => window.open('tel:+12148884394', '_self')}
                      className="bg-accent hover:bg-accent/80 text-black"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <VoiceInterfaceContent
              voiceEnabled={voiceEnabled}
              setVoiceEnabled={setVoiceEnabled}
              voiceMessages={voiceMessages}
              onVoiceMessage={handleVoiceMessage}
              systemMode={systemMode}
              professionalInput={professionalInput}
              setProfessionalInput={setProfessionalInput}
              professionalMessages={professionalMessages}
              isProfessionalProcessing={isProfessionalProcessing}
              handleProfessionalChat={handleProfessionalChat}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default VoiceInterface;
