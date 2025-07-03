
import React from 'react';
import PageHeader from '@/components/PageHeader';
import StarBackground from '@/components/StarBackground';
import HuggingFacePlayground from '@/components/ai/HuggingFacePlayground';
import SEO from '@/components/SEO';

const HuggingFace = () => {
  return (
    <>
      <SEO 
        title="Hugging Face AI Models Playground"
        description="Explore and test various AI models from Hugging Face's extensive library including language models, image generation, and more."
        keywords="Hugging Face, AI models, machine learning, natural language processing, AI playground"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=center"
      />
      <div className="min-h-screen relative">
        <StarBackground />
        <div className="relative z-10">
          <PageHeader
            title="Hugging Face AI Models"
            description="Explore and test various AI models from Hugging Face's extensive library"
          />
          
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center">
              <HuggingFacePlayground />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HuggingFace;
