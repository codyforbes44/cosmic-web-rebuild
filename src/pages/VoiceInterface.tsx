
import React from 'react';
import PageHeader from '@/components/PageHeader';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';
import { ZephelVoiceInterface } from '@/components/zephel/ZephelVoiceInterface';
import { Mic } from 'lucide-react';

const VoiceInterface = () => {
  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <div className="relative z-10">
        <SEO 
          title="Voice AI Interface - Advanced Speech Recognition"
          description="Experience cutting-edge voice AI technology with real-time speech recognition, natural language processing, and intelligent voice responses."
          keywords="voice AI, speech recognition, voice interface, AI assistant, natural language processing"
          image="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=630&fit=crop&crop=center"
        />
        <PageHeader
          title="Advanced Voice Interface"
          description="Experience next-generation voice AI technology with real-time speech recognition and intelligent responses"
          icon={Mic}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <ZephelVoiceInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
