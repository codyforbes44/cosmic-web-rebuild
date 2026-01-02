import React, { useEffect } from 'react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import { Mic } from 'lucide-react';

const ElevenLabsEmbed = () => {
  useEffect(() => {
    // Ensure the script loads properly
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Safe implementation without dangerouslySetInnerHTML
  useEffect(() => {
    const convaiElement = document.createElement('elevenlabs-convai');
    convaiElement.setAttribute('agent-id', 'agent_01jwedntnjf7tt0qma00a2276r');
    
    const container = document.getElementById('elevenlabs-container');
    if (container) {
      container.appendChild(convaiElement);
    }

    return () => {
      if (container && convaiElement.parentNode) {
        container.removeChild(convaiElement);
      }
    };
  }, []);

  return (
    <StandardPageLayout
      seo={{
        title: "Voice AI Assistant - ElevenLabs Integration | ƷBI",
        description: "Interactive voice AI assistant powered by ElevenLabs. Experience natural conversations with advanced voice technology.",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&h=630&fit=crop&crop=center"
      }}
      breadcrumb={{ label: "ElevenLabs Voice AI" }}
      header={{
        title: "ElevenLabs Voice AI",
        description: "Interactive voice AI assistant powered by ElevenLabs for natural conversations",
        icon: Mic
      }}
    >
      <div 
        id="elevenlabs-container" 
        className="min-h-[400px] w-full rounded-lg"
      />
    </StandardPageLayout>
  );
};

export default ElevenLabsEmbed;
