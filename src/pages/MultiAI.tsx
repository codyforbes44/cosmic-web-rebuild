import { Mic } from 'lucide-react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import { MultiAIInterface } from '@/components/ai/MultiAIInterface';
import { QueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';
import { generateSoftwareApplicationSchema } from '@/utils/seoUtils';

// SoftwareApplication schema for generative AI optimization
const softwareSchema = generateSoftwareApplicationSchema({
  name: "ƷBI Multi-AI Interface",
  description: "Unified AI platform providing access to multiple AI services including chat AI, voice synthesis, speech recognition, and content generation from a single interface.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  featureList: [
    "Multiple AI service integration",
    "Voice synthesis with Edge TTS",
    "Speech recognition with Vosk",
    "AI chat with Janitor.ai",
    "Content generation",
    "Unified interface for all AI tools"
  ],
  aggregateRating: {
    ratingValue: 4.8,
    reviewCount: 127
  }
});

const MultiAI = () => {
  return (
    <QueryErrorBoundary
      fallbackTitle="Multi-AI Services Unavailable"
      fallbackDescription="Unable to load AI services. Please try again."
    >
      <StandardPageLayout
        seo={{
          title: "Multi-AI Interface - Unified AI Platform | ƷBI",
          description: "Access multiple AI services including chat AI, voice synthesis, speech recognition, and content generation from one unified interface. Streamline your AI workflow.",
          keywords: "multi-AI, AI platform, voice synthesis, speech recognition, AI chat, content generation, unified AI, AI tools",
          image: "/og-images/multi-ai.png",
          structuredData: softwareSchema,
          breadcrumbs: [
            { name: 'Home', url: 'https://3bi.io/' },
            { name: 'Products', url: 'https://3bi.io/' },
            { name: 'Multi-AI Interface', url: 'https://3bi.io/multi-ai' }
          ]
        }}
        breadcrumb={{ label: "Multi-AI Interface" }}
        header={{
          title: "Multi-AI Interface",
          description: "Unified access to multiple AI services for chat, voice synthesis, speech recognition, and content generation",
          icon: Mic
        }}
      >
        <MultiAIInterface />
      </StandardPageLayout>
    </QueryErrorBoundary>
  );
};

export default MultiAI;
