import React from 'react';
import PageHeader from '@/components/PageHeader';
import StarBackground from '@/components/StarBackground';
import HuggingFacePlayground from '@/components/ai/HuggingFacePlayground';
import SEO from '@/components/SEO';
import { QueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';

const HuggingFace = () => {
  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <div className="relative z-10">
        <SEO 
          title="Hugging Face AI Models"
          description="Explore and test various AI models from Hugging Face's extensive library"
          image="/og-images/huggingface.png"
        />
        <PageHeader
          title="Hugging Face AI Models"
          description="Explore and test various AI models from Hugging Face's extensive library"
        />
        
        <QueryErrorBoundary
          fallbackTitle="Hugging Face Models Unavailable"
          fallbackDescription="Unable to load AI models. Please try again."
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center">
              <HuggingFacePlayground />
            </div>
          </div>
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default HuggingFace;
