
import React from 'react';
import PageHeader from '@/components/PageHeader';
import StarBackground from '@/components/StarBackground';
import OpenAIPlayground from '@/components/ai/OpenAIPlayground';
import SEO from '@/components/SEO';
import { Brain } from 'lucide-react';

const OpenAI = () => {
  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <div className="relative z-10">
        <SEO 
          title="OpenAI Chat Assistant"
          description="Interact with advanced AI models from OpenAI including GPT-4"
          image="https://images.unsplash.com/photo-1676277791608-ac54d0ed4700?w=1200&h=630&fit=crop&crop=center"
        />
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
  );
};

export default OpenAI;
