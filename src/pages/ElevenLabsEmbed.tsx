
import React, { useEffect } from 'react';

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
      document.head.removeChild(script);
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
