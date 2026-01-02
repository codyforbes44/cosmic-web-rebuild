import { Mic } from 'lucide-react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import { MultiAIInterface } from '@/components/ai/MultiAIInterface';
import { QueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';

const MultiAI = () => {
  return (
    <QueryErrorBoundary
      fallbackTitle="Multi-AI Services Unavailable"
      fallbackDescription="Unable to load AI services. Please try again."
    >
      <StandardPageLayout
        seo={{
          title: "Multi-AI Interface | ƷBI",
          description: "Access multiple AI services including Janitor.ai, 15.ai, Edge TTS, Vosk, and FictionLab from one unified interface.",
          image: "/og-images/multi-ai.png"
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
