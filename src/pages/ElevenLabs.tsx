
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
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
      <Navbar />
      
      {/* Page Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-space-dark-blue via-space-deep-blue to-space-purple"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              AI Assistant
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Interact with our advanced AI assistant powered by ElevenLabs
            </p>
          </div>
        </div>
      </section>
      
      <main className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <elevenlabs-convai agent-id="agent_01jwedntnjf7tt0qma00a2276r"></elevenlabs-convai>
        </div>
      </main>
    </div>
  );
};

export default ElevenLabs;
