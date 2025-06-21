
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChatbotManager } from '@/components/chatbot/ChatbotManager';
import { SubscriptionPackages } from '@/components/chatbot/SubscriptionPackages';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SEO from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ChatbotProducts: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Chatbot Solutions - Create & Embed Intelligent Chatbots"
        description="Build and deploy AI-powered chatbots for your website. Choose from flexible subscription plans and get advanced chatbot features with easy embedding."
        keywords="AI chatbot, chatbot builder, website chatbot, AI customer service, chatbot subscription, embed chatbot"
        image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=630&fit=crop&crop=center"
      />
      <div className="min-h-screen bg-gradient-to-br from-space-dark-blue via-space-deep-blue to-space-dark-blue">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <ProtectedRoute>
              <Tabs defaultValue="packages" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 bg-space-deep-blue border-gray-700">
                  <TabsTrigger value="packages" className="text-white data-[state=active]:bg-accent">
                    Subscription Plans
                  </TabsTrigger>
                  <TabsTrigger value="manager" className="text-white data-[state=active]:bg-accent">
                    My Chatbots
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="packages">
                  <SubscriptionPackages />
                </TabsContent>
                
                <TabsContent value="manager">
                  <ChatbotManager />
                </TabsContent>
              </Tabs>
            </ProtectedRoute>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ChatbotProducts;
