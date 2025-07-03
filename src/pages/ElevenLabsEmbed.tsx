
import React, { useEffect } from 'react';
import SEO from '@/components/SEO';

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

  const embedHTML = `
    <elevenlabs-convai agent-id="agent_01jwedntnjf7tt0qma00a2276r"></elevenlabs-convai>
  `;

  return (
    <>
      <SEO 
        title="ElevenLabs Voice AI Assistant"
        description="Interactive voice AI assistant powered by ElevenLabs. Experience natural conversations with advanced voice technology and real-time speech synthesis."
        keywords="ElevenLabs, voice AI, conversational AI, speech synthesis, voice assistant, AI chat"
        image="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=630&fit=crop&crop=center"
      />
      <div 
        className="min-h-screen w-full"
        dangerouslySetInnerHTML={{ __html: embedHTML }}
      />
    </>
  );
};

export default ElevenLabsEmbed;
