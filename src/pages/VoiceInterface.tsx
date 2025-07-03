
import React from 'react';
import { ModeSelector } from '@/components/zephel/ModeSelector';
import { VoiceInterfaceContent } from '@/components/zephel/VoiceInterfaceContent';
import { Mic } from 'lucide-react';
import HomeLayout from '@/components/home/HomeLayout';
import PageHeader from '@/components/PageHeader';
import { useVoiceInterface } from '@/hooks/useVoiceInterface';

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
            <div className="mb-6">
              <ModeSelector
                currentMode={systemMode}
                onModeChange={handleModeChange}
              />
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
