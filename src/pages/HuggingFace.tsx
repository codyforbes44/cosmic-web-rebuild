
import React from 'react';
import PageHeader from '@/components/PageHeader';
import StarBackground from '@/components/StarBackground';
import HuggingFacePlayground from '@/components/ai/HuggingFacePlayground';

const HuggingFace = () => {
  return (
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
  );
};

export default HuggingFace;
