import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { MessageCircle } from 'lucide-react';

const AIChat: React.FC = () => {
  useEffect(() => {
    // Load ElevenLabs ConvAI widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    // Create the custom element after script loads
    const timer = setTimeout(() => {
      const container = document.getElementById('elevenlabs-container');
      if (container) {
        const convaiElement = document.createElement('elevenlabs-convai');
        convaiElement.setAttribute('agent-id', 'agent_3001k1v7zbqdf80txwzf51e209rm');
        container.appendChild(convaiElement);
      }
    }, 1000);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <SEO 
        title="AI Chat Assistant" 
        description="Interact with our intelligent AI chat assistant for instant support and information."
        keywords="AI chat, artificial intelligence, assistant, support, automation"
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&crop=center"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-6xl">
          <BreadcrumbNav currentPageLabel="AI Chat" />
          
          <PageHeader 
            title="AI Chat Assistant"
            description="Experience the power of AI-driven conversations and get instant support"
            icon={MessageCircle}
          />

          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 shadow-lg">
            <div id="elevenlabs-container" className="min-h-[600px] w-full" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AIChat;