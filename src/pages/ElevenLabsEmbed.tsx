
import React, { useEffect } from 'react';

const ElevenLabsEmbed = () => {
  useEffect(() => {
    // Ensure the script loads properly
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    // Set page title and meta for voice interface
    document.title = "Voice AI Assistant - ElevenLabs Integration | ƷBI";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Interactive voice AI assistant powered by ElevenLabs. Experience natural conversations with advanced voice technology.');
    }

    // Add og:image for voice/audio theme
    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=630&fit=crop&crop=center');
    if (!document.querySelector('meta[property="og:image"]')) {
      document.head.appendChild(ogImage);
    }

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
    <div 
      className="min-h-screen w-full"
      dangerouslySetInnerHTML={{ __html: embedHTML }}
    />
  );
};

export default ElevenLabsEmbed;
