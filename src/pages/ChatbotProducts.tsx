import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChatbotManager } from '@/components/chatbot/ChatbotManager';
import { SubscriptionPackages } from '@/components/chatbot/SubscriptionPackages';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SEO from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateSoftwareApplicationSchema, generateOfferSchema } from '@/utils/seoUtils';

// SoftwareApplication schema for the chatbot product
const softwareSchema = generateSoftwareApplicationSchema({
  name: "ƷBI AI Chatbot Builder",
  description: "Build and deploy AI-powered chatbots for your website with advanced features, easy embedding, and flexible subscription plans. Reduce customer service costs while improving response times.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    price: "49",
    priceCurrency: "USD"
  },
  featureList: [
    "AI-powered conversational chatbot",
    "Easy website embedding",
    "Customizable appearance and behavior",
    "Lead qualification automation",
    "24/7 customer support capability",
    "Analytics and reporting dashboard",
    "Multi-language support"
  ],
  aggregateRating: {
    ratingValue: 4.9,
    reviewCount: 89
  }
});

// Offer schema for subscription pricing
const starterOfferSchema = generateOfferSchema({
  name: "Starter Plan",
  description: "Perfect for small businesses getting started with AI chatbots",
  price: "49",
  priceCurrency: "USD"
});

const professionalOfferSchema = generateOfferSchema({
  name: "Professional Plan",
  description: "Advanced features for growing businesses with higher volume needs",
  price: "149",
  priceCurrency: "USD"
});

const ChatbotProducts: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Chatbot Builder - Create & Embed Intelligent Chatbots"
        description="Build and deploy AI-powered chatbots for your website. Reduce support costs, qualify leads 24/7, and improve customer satisfaction with easy-to-embed chatbot solutions."
        keywords="AI chatbot, chatbot builder, website chatbot, AI customer service, chatbot subscription, embed chatbot, lead qualification, customer support automation"
        image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=630&fit=crop&crop=center"
        structuredData={[softwareSchema, starterOfferSchema, professionalOfferSchema]}
        breadcrumbs={[
          { name: 'Home', url: 'https://3bi.io/' },
          { name: 'Products', url: 'https://3bi.io/' },
          { name: 'AI Chatbot Builder', url: 'https://3bi.io/chatbot-products' }
        ]}
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
