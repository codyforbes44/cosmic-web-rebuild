
import React, { useEffect } from 'react';
import StarBackground from '@/components/StarBackground';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
      };
    }
  }
}

const ElevenLabs = () => {
  useEffect(() => {
    // Load the ElevenLabs script
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

  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <div className="relative z-10">
        <elevenlabs-convai agent-id="agent_01jwedntnjf7tt0qma00a2276r"></elevenlabs-convai>
      </div>
    </div>
  );
};

export default ElevenLabs;
