import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { MessageCircle } from 'lucide-react';

const AIChat: React.FC = () => {
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
            <iframe 
              src="https://aiapply.dev/ai-chat" 
              width="100%" 
              height="600" 
              frameBorder="0" 
              title="AIApply AI Chat"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AIChat;