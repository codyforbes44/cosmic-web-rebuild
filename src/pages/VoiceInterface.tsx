import React from 'react';
import { Mic, Phone } from 'lucide-react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import { VoiceInterfaceContent } from '@/components/zephel/VoiceInterfaceContent';
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
    <StandardPageLayout
      seo={{
        title: "Advanced Voice Interface | ƷBI",
        description: "Experience next-generation voice AI technology with real-time speech recognition and intelligent responses",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&h=630&fit=crop&crop=center"
      }}
      breadcrumb={{ label: "Voice Interface" }}
      header={{
        title: "Advanced Voice Interface",
        description: "Experience next-generation voice AI technology with real-time speech recognition and intelligent responses",
        icon: Mic
      }}
    >
      {/* Direct Dial Option */}
      <div className="mb-8">
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              Direct Connect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              For immediate assistance or technical support, connect directly with our team:
            </p>
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg border border-border">
              <div>
                <p className="text-foreground font-semibold text-lg">(214) 888-4394</p>
                <p className="text-muted-foreground text-sm">Direct dial • Available 24/7</p>
              </div>
              <Button
                onClick={() => window.open('tel:+12148884394', '_self')}
                className="bg-accent hover:bg-accent/80 text-accent-foreground"
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
    </StandardPageLayout>
  );
};

export default VoiceInterface;
