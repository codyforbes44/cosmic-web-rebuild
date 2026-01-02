import React from 'react';
import PageHeader from '@/components/PageHeader';
import StarBackground from '@/components/StarBackground';
import OpenAIPlayground from '@/components/ai/OpenAIPlayground';
import SEO from '@/components/SEO';
import { Brain } from 'lucide-react';
import { QueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';

const OpenAI = () => {
  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <div className="relative z-10">
        <SEO 
          title="OpenAI Chat Assistant"
          description="Interact with advanced AI models from OpenAI including GPT-4"
          image="/og-images/openai.png"
        />
        <PageHeader
          title="OpenAI Chat Assistant"
          description="Interact with advanced AI models from OpenAI including GPT-4"
          icon={Brain}
        />
        
        <QueryErrorBoundary
          fallbackTitle="AI Chat Unavailable"
          fallbackDescription="Unable to load the AI chat interface. Please try again."
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center">
              <OpenAIPlayground />
            </div>
          </div>
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default OpenAI;
