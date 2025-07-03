
import React from 'react';
import PageHeader from '@/components/PageHeader';
import StarBackground from '@/components/StarBackground';
import OpenAIPlayground from '@/components/ai/OpenAIPlayground';
import { Brain } from 'lucide-react';
import SEO from '@/components/SEO';

const OpenAI = () => {
  return (
    <>
      <SEO 
        title="OpenAI Chat Assistant & GPT Models"
        description="Interact with advanced AI models from OpenAI including GPT-4, explore conversational AI capabilities and advanced language understanding."
        keywords="OpenAI, GPT-4, ChatGPT, conversational AI, language models, AI assistant"
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&crop=center"
      />
      <div className="min-h-screen relative">
        <StarBackground />
        <div className="relative z-10">
          <PageHeader
            title="OpenAI Chat Assistant"
            description="Interact with advanced AI models from OpenAI including GPT-4"
            icon={Brain}
          />
          
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center">
              <OpenAIPlayground />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenAI;
