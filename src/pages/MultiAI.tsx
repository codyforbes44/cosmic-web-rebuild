import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';
import { MultiAIInterface } from '@/components/ai/MultiAIInterface';

const MultiAI = () => {
  return (
    <div className="min-h-screen bg-space-dark">
      <SEO 
        title="Multi-AI Interface | ƷBI" 
        description="Access multiple AI services including Janitor.ai, 15.ai, Edge TTS, Vosk, and FictionLab from one unified interface."
      />
      
      <PageHeader
        title="Multi-AI Interface"
        description="Unified access to multiple AI services for chat, voice synthesis, speech recognition, and content generation"
      />
      
      <div className="container mx-auto px-4 py-8">
        <MultiAIInterface />
      </div>
    </div>
  );
};

export default MultiAI;